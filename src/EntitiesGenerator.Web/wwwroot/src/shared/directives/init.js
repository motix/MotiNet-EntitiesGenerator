import Vue from 'vue';

// v-init directive, similar to ng-init. Only used for setting constants retrieved from server side.
Vue.directive('init', {
    bind: (el, binding, vnode) => {
        // convert kebab-case to camelCase
        let arg = binding.arg.split('-').map((arg, index) => index > 0 ? arg[0].toUpperCase() + arg.substring(1) : arg).join('');
        vnode.context[arg] = binding.value;
    }
});
