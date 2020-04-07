import Vue from 'vue';

Vue.filter('currency', function (value) {
    if (value === null || value === undefined) {
        return value;
    }

    const negative = value < 0;
    value = Math.abs(value);
    let result = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    result = result.replace(/,/g, '_');
    result = result.replace(/\./g, ',');
    result = result.replace(/_/g, '.');

    return (negative ? '(' : '') + result + (negative ? ')' : '');
});
