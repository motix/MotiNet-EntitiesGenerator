<template extends="./TableHeaderFilter.vue">
    <extensions>
        <extension>
            <date-picker class="input-group"
                         :auto-close="true"
                         :only-date="true"
                         formatted="DD/MM/YYYY"
                         output-format="YYYY-MM-DD"
                         :label="startDatePlaceholder"
                         v-model="filter.startValue">
            </date-picker>
            <date-picker class="input-group mt-2"
                         :auto-close="true"
                         :only-date="true"
                         formatted="DD/MM/YYYY"
                         output-format="YYYY-MM-DD"
                         :label="endDatePlaceholder"
                         v-model="filter.endValue">
            </date-picker>
        </extension>
    </extensions>
</template>

<script>
    import Vue from 'vue';
    import moment from 'moment';
    import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
    import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
    import { SingleLineInput } from 'mn-anytext-vue';

    import TableHeaderFilter from './TableHeaderFilter.vue';

    export default {
        extends: TableHeaderFilter,

        components: {
            DatePicker: VueCtkDateTimePicker,
            SingleLineInput
        },

        props: {
            startDatePlaceholder: {
                type: String,
                required: false
            },
            endDatePlaceholder: {
                type: String,
                required: false
            }
        },

        data: () => ({
            filterType: 'date'
        }),

        computed: {
            activated() {
                return this.filter.startValue !== null || this.filter.endValue !== null;
            }
        },

        methods: {
            clear() {
                Vue.set(this.filter, 'startValue', null);
                Vue.set(this.filter, 'endValue', null);

                this.hide();
            },

            matched(entity) {
                var fieldValue = this.getFieldValue(entity, this.filter.fieldPath);
                fieldValue = moment(fieldValue).format('YYYY-MM-DD');
                var result = true;

                if (this.filter.startValue !== null) {
                    result = result && fieldValue >= this.filter.startValue;
                }

                if (this.filter.endValue !== null) {
                    result = result && fieldValue <= this.filter.endValue;
                }

                return result;
            }
        },

        beforeMount() {
            Vue.set(this.filter, 'startValue', null);
            Vue.set(this.filter, 'endValue', null);
        }
    };
</script>