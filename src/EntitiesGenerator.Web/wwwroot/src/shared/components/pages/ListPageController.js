import Vue from 'vue';
import moment from 'moment';
import VueConfigHelper from '../../utilities/VueConfigHelper';

import PageController from './PageController';

/**
 * @typedef {import("./PageController").PageInstance} PageInstance
 *
 * @typedef {Object} ListPageInstanceProps
 * @property {ListPageController} controller
 * @property {boolean} readOnly
 * @property {boolean} shortList
 * @property {boolean} small
 * @property {string} otherListUrl
 * @property {string} apiUrl
 * @property {{}} displayNames
 * @property {string} title
 * @property {string} otherListTitle
 * @property {string} newEntityTitle
 * @property {string} newEntityUrl
 * @property {string} viewEntityUrl
 * @property {boolean} alternateView
 * @property {any[]} filters
 * @property {any[]} entities
 * @property {any[]} filteredEntities
 *
 * @typedef {PageInstance & ListPageInstanceProps} ListPageInstance
 */

export default class ListPageController extends PageController {

    // Static

    static get props() {
        return {
            ...super.props,
            readOnly: {
                type: Boolean,
                default: false
            },
            shortList: {
                type: Boolean,
                default: false
            },
            small: {
                type: Boolean,
                default: false
            },
            otherListUrl: {
                type: String,
                required: false
            },
            apiUrl: {
                type: String,
                required: true
            },
            displayNames: {
                type: Object,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            otherListTitle: {
                type: String,
                required: false
            },
            newEntityTitle: {
                type: String
                // required: !readOnly
            },
            newEntityUrl: {
                type: String
                // required: !readOnly
            },
            viewEntityUrl: {
                type: String,
                required: true
            }
        };
    }

    static get data() {
        return {
            ...super.data,
            alternateView: false,
            filters: {},
            entities: null
        };
    }

    static get computed() {
        return {
            ...super.computed,
            ...VueConfigHelper.getComputed(ListPageController)
        };
    }

    static getConfig(controllerClass = ListPageController) {
        return super.getConfig(controllerClass);
    }

    static adjustPropsSpec(vm) {
        super.adjustPropsSpec(vm);

        const readOnly = vm.$options.propsData.readOnly === '' || vm.$options.propsData.readOnly === true;
        vm.$options.props.newEntityTitle.required = !readOnly;
        vm.$options.props.newEntityUrl.required = !readOnly;
    }

    // Constructor

    /**
     * @param {ListPageInstance} vm Vue instance
     */
    constructor(vm) {
        super(vm);

        // Just an extra step to help IntelliSense
        this.vm = vm;
    }

    // Computed

    get $ready() {
        return super.$ready && this.vm.entities !== null;
    }

    get $filteredEntities() {
        var that = this;

        return this.vm.entities.filter(function (entity) {
            var result = true;

            for (const name in that.vm.filters) {
                var filter = that.vm.filters[name];
                if (filter.initialized && filter.activated()) {
                    result = result && filter.matched(entity);
                }
            }

            return result;
        });
    }

    // Lifecycle Hooks

    mounted() {
        super.mounted();

        this.setupFilters();
    }

    // Internal

    get initialDataLoadMappings() {
        return [
            ...super.initialDataLoadMappings,
            { key: 'entities', url: this.enitiesGetUrl }
        ];
    }

    get enitiesGetUrl() {
        return this.vm.apiUrl;
    }

    setupFilters() {
    }

    addFilters(filters) {
        for (const filter of filters) {
            Vue.set(this.vm.filters, filter.name, filter);
        }
    }

    /**
     * @param {any[]} responses Responses returned from data loading
     */
    doneInitialDataLoading(responses) {
        super.doneInitialDataLoading(responses);

        this.vm.entities = this.initialDataLoader.store.get('entities').data;
    }
}