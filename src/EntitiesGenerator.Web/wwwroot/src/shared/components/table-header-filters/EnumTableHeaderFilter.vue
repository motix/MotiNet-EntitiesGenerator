<template extends="./TableHeaderFilter.vue">
    <extensions>
        <extension>
            <div v-for="(status, index) in filter.values"
                 class="custom-control custom-switch">
                <input type="checkbox"
                       class="custom-control-input"
                       :id="'filterSwitch_' + filter.name + '_' + index"
                       v-model="filter.values[index]">
                <label class="custom-control-label" :for="'filterSwitch_' + filter.name + '_' + index">
                    <span v-if="labels" :class="labelColors ? ('text-' + labelColors[index]) : null">{{labels[index]}}</span>
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
            labelColors: {
                type: Array,
                required: false
            }
        },

        data: () => ({
            filterType: 'enum'
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
                var fieldValue = this.getFieldValue(entity, this.filter.fieldPath);

                for (var i = 0; i < this.filter.values.length; i++) {
                    if (fieldValue === i && this.filter.values[i] === true) {
                        return true;
                    }
                }

                return false;
            }
        },

        beforeMount() {
            var values = [];
            for (var i = 0; i < this.filter.enumLength; i++) {
                values[i] = false;
            }

            Vue.set(this.filter, 'values', values);
        }
    };
</script>