<template extends="./TableHeaderFilter.vue">
    <extensions>
        <extension>
            <single-line-input v-for="(item, index) in filter.fieldPaths"
                               :placeholder="placeholders[index]"
                               placeholder-css-class="text-muted"
                               v-model="filter.values[index]"
                               class="d-inline-block w-100 mt-2"></single-line-input>
        </extension>
    </extensions>
</template>

<script>
    import Vue from 'vue';
    import { SingleLineInput } from 'mn-anytext-vue';

    import TableHeaderFilter from './TableHeaderFilter.vue';

    export default {
        extends: TableHeaderFilter,

        components: {
            SingleLineInput
        },

        props: {
            placeholders: {
                type: Array,
                required: false
            }
        },

        data: () => ({
            filterType: 'stringlist'
        }),

        computed: {
            activated() {
                for (const value of this.filter.values) {
                    if (value.trim() !== '') {
                        return true;
                    }
                }

                return false;
            }
        },

        methods: {
            clear() {
                for (var i = 0; i < this.filter.values.length; i++) {
                    Vue.set(this.filter.values, i, '');
                }

                this.hide();
            },

            matched(entity) {
                var result = true;

                for (var i = 0; i < this.filter.fieldPaths.length; i++) {
                    if (this.filter.values[i] !== '') {
                        var fieldValue = this.getFieldValue(entity, this.filter.fieldPaths[i]);
                        result = result &&
                            fieldValue !== null &&
                            fieldValue.toLowerCase().indexOf(this.filter.values[i].trim().toLowerCase()) > -1;
                    }
                }

                return result;
            }
        },

        beforeMount() {
            var values = [];
            for (var i = 0; i < this.filter.fieldPaths.length; i++) {
                values[i] = '';
            }

            Vue.set(this.filter, 'values', values);
        }
    };
</script>