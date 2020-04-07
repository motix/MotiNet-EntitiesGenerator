export default class VueConfigHelper {
    static getComputed(controllerClass) {
        const computed = {};

        const descriptors = Object.getOwnPropertyDescriptors(controllerClass.prototype);
        for (const memberName in descriptors) {
            if (memberName.startsWith('$')) {
                const descriptor = descriptors[memberName];
                if (typeof descriptor.get === 'function') {
                    const propertyName = memberName.substr(1);
                    computed[propertyName] = function () {
                        return this.controller[memberName];
                    };
                }
            }
        }

        return computed;
    }

    static getWatch(controllerClass) {
        const watches = {};

        const descriptors = Object.getOwnPropertyDescriptors(controllerClass.prototype);
        for (const memberName in descriptors) {
            if (memberName.startsWith('$$')) {
                const descriptor = descriptors[memberName];
                if (typeof descriptor.value === 'function') {
                    const methodName = memberName.substr(2);
                    watches[methodName] = function () {
                        return this.controller[memberName].apply(this.controller, arguments);
                    };
                }
            }
        }

        return watches;
    }

    static getMethods(controllerClass) {
        const methods = {};

        const descriptors = Object.getOwnPropertyDescriptors(controllerClass.prototype);
        for (const memberName in descriptors) {
            if (memberName.startsWith('$') && !memberName.startsWith('$$')) {
                const descriptor = descriptors[memberName];
                if (typeof descriptor.value === 'function') {
                    const methodName = memberName.substr(1);
                    methods[methodName] = function () {
                        return this.controller[memberName].apply(this.controller, arguments);
                    };
                }
            }
        }

        return methods;
    }
}