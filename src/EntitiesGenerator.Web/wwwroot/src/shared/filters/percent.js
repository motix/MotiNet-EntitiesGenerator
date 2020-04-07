import Vue from 'vue';

Vue.filter('percent', function (value, decimal) {
    if (value === null || value === undefined) {
        return value;
    }

    return (value * 100).toFixed(decimal || 0) + '%';
});
