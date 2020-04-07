import axios from "axios";

const done = Symbol('done');

/**
 * @typedef DataLoaderMapping
 * @property {string} key
 * @property {string} url
 */

export default class DataLoader {
    /**
     * Create a DataLoader
     * @param { ...DataLoaderMapping } dataMappings List of URLs to load data
     */
    constructor(...dataMappings) {
        this.reset(...dataMappings);
    }

    /**
     * Add more URLs to data loader
     * @param { ...DataLoaderMapping } dataMappings List of URLs to load data
     */
    add(...dataMappings) {
        if (this.locked) {
            throw new Error('Cannot add URLs once started. Please reset first.');
        }

        for (const mapping of dataMappings) {
            if (!mapping.url) {
                throw 'URL passing to DataLoader must have a value.';
            }

            this.store.set(mapping.key, {
                key: mapping.key,
                url: mapping.url,
                error: null,
                data: null,
                get done() { return this.data !== null || this.error !== null; }
            });
        }
    }

    /**
     * Start loading data from all URLs
     * @returns {Promise} A Promise that resolved when all data loaded or rejected when there's an error
     */
    start() {
        if (this.locked) {
            throw new Error('DataLoader can only load data once. Please reset first.');
        }

        this.locked = true;

        if (this.store.size === 0) {
            return Promise.all([]);
        }

        this.loading = true;

        /** @type Promise[] */
        const promisses = [];

        for (const entry of this.store.values()) {
            const promise = axios
                .get(entry.url)
                .then(response => {
                    entry.data = response.data;
                    this.loading = !this[done];

                    response.key = entry.key;
                    return response;
                })
                .catch(error => {
                    entry.error = error;
                    this.loading = !this[done];
                    this.error = true;

                    throw error;
                });

            promisses.push(promise);
        }

        return Promise.all(promisses);
    }

    /**
     * Reset all data and replace with new URLs
     * @param { ...DataLoaderMapping } dataMappings List of URLs to load data
     */
    reset(...dataMappings) {
        this.locked = false;
        this.loading = false;
        this.error = false;

        /** @type Map<string, DataLoaderMapping & {error: any, data: any, readonly done: boolean}> */
        this.store = new Map();
        this.add(...dataMappings);
    }

    get [done]() {
        for (const entry of this.store.values()) {
            if (!entry.done) {
                return false;
            }
        }

        return true;
    }
}
