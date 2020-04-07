<template extendable>
    <div>
        <b-button :id="'filterButton_' + filter.name"
                  class="w-100"
                  :variant="activated ? 'primary' : 'outline-dark'"
                  size="xs">
            <slot name="button-content">
                {{buttonText}}
            </slot>
        </b-button>
        <b-popover :target="'filterButton_' + filter.name"
                   triggers="click blur"
                   :show.sync="filter.filterShow">
            <div>
                <slot name="popover-content">
                    <extension-point>
                    </extension-point>
                </slot>
            </div>
            <div class="mt-2">
                <button type="button"
                        class="btn btn-xs btn-outline-secondary w-100"
                        @click="clear">
                    <font-awesome-icon :icon="['fal', 'times']" fixed-width></font-awesome-icon>
                </button>
            </div>
        </b-popover>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { BootstrapVue } from 'bootstrap-vue';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

    Vue.use(BootstrapVue);

    export default {
        components: {
            FontAwesomeIcon
        },

        props: {
            buttonText: {
                type: String,
                required: false
            },
            filter: {
                type: Object,
                required: true
            }
        },

        methods: {
            hide() {
                Vue.set(this.filter, 'filterShow', false);
            },

            getFieldValue(entity, fieldPath) {
                var fieldNames = fieldPath.split('.');
                var fieldValue = entity;

                for (const fieldName of fieldNames) {
                    fieldValue = fieldValue[fieldName];
                    if (fieldValue === null) {
                        return null;
                    }
                }

                return fieldValue;
            }
        },

        beforeMount() {
            if (this.filter.type !== this.filterType) {
                throw 'Filter type expected ' + this.filterType + ', found ' + this.filter.type;
            }

            Vue.set(this.filter, 'filterShow', false);

            var that = this;

            Vue.set(this.filter, 'activated', () => {
                return that.activated;
            });

            if (!this.filter.matched) {
                Vue.set(this.filter, 'matched', (entity) => {
                    return that.matched(entity);
                });
            }

            Vue.set(this.filter, 'initialized', true);
        }
    };
</script>