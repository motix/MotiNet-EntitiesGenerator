<template extends="./TableHeaderFilter.vue">
    <extensions>
        <extension>
            <single-line-input :placeholder="placeholder"
                               placeholder-css-class="text-muted"
                               v-model="filter.value"
                               class="d-inline-block w-100"></single-line-input>
            <div class="custom-control custom-switch mt-2"
                 v-if="hasValueCheckbox">
                <input type="checkbox"
                       class="custom-control-input"
                       :id="'hasValueFilterSwitch_' + filter.name"
                       v-bind:disabled="filter.noValue === true"
                       v-model="filter.hasValue">
                <label class="custom-control-label" :for="'hasValueFilterSwitch_' + filter.name">
                    Has Value
                </label>
            </div>
            <div class="custom-control custom-switch mt-2"
                 v-if="noValueCheckbox">
                <input type="checkbox"
                       class="custom-control-input"
                       :id="'noValueFilterSwitch_' + filter.name"
                       v-bind:disabled="filter.hasValue === true"
                       v-model="filter.noValue">
                <label class="custom-control-label" :for="'noValueFilterSwitch_' + filter.name">
                    Blank
                </label>
            </div>
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
            placeholder: {
                type: String,
                required: false
            },
            hasValueCheckbox: {
                type: Boolean,
                require: false
            },
            noValueCheckbox: {
                type: Boolean,
                require: false
            }
        },

        data: () => ({
            filterType: 'unifiedstring'
        }),

        computed: {
            activated() {
                return this.filter.value !== '' || this.filter.hasValue === true || this.filter.noValue === true;
            }
        },

        methods: {
            clear() {
                Vue.set(this.filter, 'value', '');
                Vue.set(this.filter, 'hasValue', false);
                Vue.set(this.filter, 'noValue', false);

                this.hide();
            },

            matched(entity) {
                if (this.filter.hasValue === true) {
                    for (var i = 0; i < this.filter.fieldPaths.length; i++) {
                        var fieldValue = this.getFieldValue(entity, this.filter.fieldPaths[i]);
                        if (fieldValue !== null) {
                            return true;
                        }
                    }

                    return false;
                }

                if (this.filter.noValue === true) {
                    for (var i = 0; i < this.filter.fieldPaths.length; i++) {
                        var fieldValue = this.getFieldValue(entity, this.filter.fieldPaths[i]);
                        if (fieldValue !== null) {
                            return false;
                        }
                    }

                    return true;
                }

                for (var i = 0; i < this.filter.fieldPaths.length; i++) {
                    var fieldValue = this.getFieldValue(entity, this.filter.fieldPaths[i]);
                    if (fieldValue !== null &&
                        fieldValue.toLowerCase().indexOf(this.filter.value.trim().toLowerCase()) > -1) {
                        return true;
                    }
                }

                return false;
            }
        },

        beforeMount() {
            Vue.set(this.filter, 'value', '');
            Vue.set(this.filter, 'hasValue', false);
            Vue.set(this.filter, 'noValue', false);
        }
    };
</script>