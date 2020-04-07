import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome';
import Swal from 'sweetalert2';
import _ from 'lodash';
import VueConfigHelper from '../../utilities/VueConfigHelper';
import KeepAlive from '../../utilities/KeepAlive';
import DataLoader from '../../utilities/DataLoader';

/** @typedef {import("../../utilities/DataLoader").DataLoaderMapping} DataLoaderMapping */

/**
 * @typedef {Object} PageInstance
 * @property {PageController} controller
 * @property {boolean} initialDataLoading
 * @property {boolean} initialDataLoadingError
 * @property {boolean} ready
 */

export default class PageController {

    // Static

    static get components() {
        return {
            FontAwesomeIcon,
            FontAwesomeLayers,
            FontAwesomeLayersText
        };
    }

    static get props() { return {}; }

    static get data() { return {}; }

    static get computed() {
        return {
            ...VueConfigHelper.getComputed(PageController)
        };
    }

    static get watch() { return {}; }

    static get methods() { return {}; }

    static getConfig(controllerClass = PageController) {
        return {
            components: controllerClass.components,
            props: controllerClass.props,
            data() {
                return {
                    // Place an extra reference to controller in data for debuging purose with Vue Devtools
                    _controller: this.controller,
                    ...controllerClass.data
                };
            },
            computed: controllerClass.computed,
            watch: controllerClass.watch,
            beforeCreate() {
                this.controller = new controllerClass(this);
                this.controller.beforeCreate();
                controllerClass.adjustPropsSpec(this);
            },
            mounted() { this.controller.mounted(); },
            methods: controllerClass.methods
        };
    }

    static adjustPropsSpec(vm) { }

    // Constructor

    /**
     * @param {PageInstance} vm Vue instance
     */
    constructor(vm) {
        this.vm = vm;

        this.initialDataLoader = new DataLoader();
        this.keepAlive = new KeepAlive();
        this.keepAlive.start();
    }

    // Computed

    get $initialDataLoading() {
        return this.initialDataLoader.loading;
    }

    get $initialDataLoadingError() {
        return this.initialDataLoader.error;
    }

    get $ready() {
        return !this.$initialDataLoading && !this.$initialDataLoadingError;
    }

    // Lifecycle Hooks

    beforeCreate() { }

    mounted() {
        this.initialDataLoader.add(...this.initialDataLoadMappings);
        this.initialDataLoader
            .start()
            .then(responses => {
                this.doneInitialDataLoading(responses);
            })
            .catch(error => {
                this.errorInitialDataLoading(error);
            });
    }

    // Internal

    /**
     * @returns {DataLoaderMapping[]} Initial data loader mapping
     */
    get initialDataLoadMappings() {
        return [];
    }

    /**
     * @param {any[]} responses Responses returned from data loading
     */
    doneInitialDataLoading(responses) { }

    /**
     * @param {any} error First error returned from data loading
     */
    errorInitialDataLoading(error) {
        this.showError('There is error loading data.', error);
    }

    async getRef(ref) {
        const that = this;

        const promise = new Promise((resolve) => {
            function check() {
                window.setTimeout(() => that.vm.$refs[ref] ? resolve(that.vm.$refs[ref]) : check(), 10);
            }
            check();
        });

        return await promise;
    }

    /**
     * @param {string} message Error message
     * @param {any} errorData Error extra informaiton
     */
    showError(message, errorData) {
        message = message || 'There is error processing your request!';
        if (errorData) {
            message += ' Please send error informaiton bellow to support.';
        }

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
            footer: errorData && errorData.toString()
        });
    }

    /**
     * @param {string} message Error message
     * @param {any} errorData Error extra informaiton
     */
    showErrorAndReload(message, errorData) {
        message = message || 'There is error processing your request!';
        message += ' Page reload is required.';
        if (errorData) {
            message += ' Please send error informaiton bellow to support.';
        }

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
            footer: errorData && errorData.toString()
        })
            .then(() => {
                window.location = window.location;
            });
    }

    /**
     * @param {any} id Value to find in id property
     * @param {{id: any}[]} list List of items to inspect
     * @returns {{id: any}} Returns the matched item, else an error thrown
     */
    findById(id, list) {
        if (id === null) {
            throw 'Argument \'id\' cannot be null.';
        }

        var result = _.find(list, function (item) {
            return item.id === id;
        });

        if (typeof result === 'undefined') {
            throw `ID '${id}' not found.`;
        }

        return result;
    }
}