import axios from "axios";

const done = Symbol('done');

/**
 * @typedef DataSaverMapping
 * @property {string} key
 * @property {string} url
 * @property {string} method
 * @property {object} [data]
 */

export default class DataSaver {
    /**
     * Create a DataSaver
     * @param { ...DataSaverMapping } dataMappings List of URLs and data to save
     */
    constructor(...dataMappings) {
        this.reset(...dataMappings);
    }

    /**
     * Add more URLs to data saveer
     * @param { ...DataSaverMapping } dataMappings List of URLs and data to save
     */
    add(...dataMappings) {
        if (this.locked) {
            throw new Error('Cannot add URLs once started. Please reset first.');
        }

        for (const mapping of dataMappings) {
            if (!mapping.url) {
                throw 'URL passing to DataSaver must have a value.';
            }

            this.store.set(mapping.key, {
                key: mapping.key,
                url: mapping.url,
                method: mapping.method,
                data: mapping.data,
                error: null,
                done: false
            });
        }
    }

    /**
     * Start saving data from all URLs
     * @returns {Promise} A Promise that resolved when all data saved or rejected when there's an error
     */
    start() {
        if (this.locked) {
            throw new Error('DataSaver can only save data once. Please reset first.');
        }

        this.locked = true;

        if (this.store.size === 0) {
            return Promise.all([]);
        }

        this.saving = true;

        /** @type Promise[] */
        const promisses = [];

        for (const entry of this.store.values()) {
            let promise;

            switch (entry.method) {
                case 'post':
                    promise = axios.post(entry.url, entry.data);
                    break;
                case 'put':
                    promise = axios.put(entry.url, entry.data);
                    break;
                case 'delete':
                    promise = axios.delete(entry.url);
                    break;
                default:
                    throw `Method '${entry.method}' not supported.`;
            }

            promise = promise
                .then((response) => {
                    entry.done = true;
                    this.saving = !this[done];

                    response.key = entry.key;
                    return response;
                })
                .catch(error => {
                    entry.done = true;
                    entry.error = error;
                    this.saving = !this[done];
                    this.error = true;

                    throw error;
                });

            promisses.push(promise);
        }

        return Promise.all(promisses);
    }

    /**
     * Reset all data and replace with new URLs
     * @param { ...DataSaverMapping } dataMappings List of URLs and data to save
     */
    reset(...dataMappings) {
        this.locked = false;
        this.saving = false;
        this.error = false;

        /** @type Map<string, DataSaverMapping & {error: any, done: boolean}> */
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
