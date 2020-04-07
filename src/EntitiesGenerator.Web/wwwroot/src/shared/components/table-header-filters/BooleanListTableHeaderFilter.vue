<template extends="./TableHeaderFilter.vue">
    <extensions>
        <extension>
            <div v-for="(condition, index) in filter.conditions"
                 class="custom-control custom-switch">
                <input type="checkbox"
                       class="custom-control-input"
                       :id="'filterSwitch_' + filter.name + '_' + index"
                       v-model="filter.values[index]">
                <label class="custom-control-label" :for="'filterSwitch_' + filter.name + '_' + index">
                    <font-awesome-icon v-if="icons" :icon="['fal', icons[index]]" fixed-width></font-awesome-icon>
                    <template v-if="labels">
                        {{labels[index]}}
                    </template>
                </label>
            </div>
        </extension>
    </extensions>
</template>

<script>
    import Vue from 'vue';

    import TableHeaderFilter from './TableHeaderFilter.vue';

    export default {
        extends: TableHeaderFilter,

        props: {
            labels: {
                type: Array,
                required: false
            },
            icons: {
                type: Array,
                required: false
            }
        },

        data: () => ({
            filterType: 'booleanlist'
        }),

        computed: {
            activated() {
                for (const value of this.filter.values) {
                    if (value === true) {
                        return true;
                    }
                }

                return false;
            }
        },

        methods: {
            clear() {
                for (var i = 0; i < this.filter.values.length; i++) {
                    Vue.set(this.filter.values, i, false);
                }

                this.hide();
            },

            matched(entity) {
                var result = false;

                for (var i = 0; i < this.filter.conditions.length; i++) {
                    if (this.filter.values[i] === true) {
                        result = result || this.filter.conditions[i](entity);
                    }
                }

                return result;
            }
        },

        beforeMount() {
            var values = [];
            for (var i = 0; i < this.filter.conditions.length; i++) {
                values[i] = false;
            }

            Vue.set(this.filter, 'values', values);
        }
    };
</script>