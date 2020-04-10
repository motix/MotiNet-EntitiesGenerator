export default class ContentHelper {
    static get MotiNetCoreVersion() { return '1.1.0-beta-0009' };
    static get MotiNetEntitiesVersion() { return '1.1.0-beta-0018' };

    static newGuid() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        ).toUpperCase();
    }

    static getModuleNamespace(module) {
        return (module.project.namespace === null ? module.project.name : module.project.namespace) +
            (module.hasOwnNamespace ? '.' + module.name : '');
    }

    static getModuleName(module) {
        return module.hasOwnNamespace ? module.name : module.project.namespace.substr(module.project.namespace.lastIndexOf('.') + 1);
    }

    // Project name

    static get_CoreProject_Name(module) {
        return ContentHelper.getModuleNamespace(module) + '.Core';
    }

    static get_SealedModelsProject_Name(module) {
        return ContentHelper.getModuleNamespace(module) + '.SealedModels';
    }

    static get_EntityFrameworkCoreProject_Name(module) {
        return ContentHelper.getModuleNamespace(module) + '.EntityFrameworkCore';
    }

    static get_EntityFrameworkCoreSealedModelsProject_Name(module) {
        return ContentHelper.getModuleNamespace(module) + '.EntityFrameworkCore.SealedModels';
    }

    static get_AspNetCoreProject_Name(module) {
        return ContentHelper.getModuleNamespace(module) + '.AspNetCore';
    }

    static get_AspNetCoreMvcDefaultViewModelsProject_Name(module) {
        return ContentHelper.getModuleNamespace(module) + '.AspNetCore.Mvc.DefaultViewModels';
    }

    static get_WebProject_Name(project) {
        return project.namespace === null ? project.name : project.namespace + '.Web';
    }

    // Project namespace

    static get_CoreProject_Namespace(module) {
        return ContentHelper.getModuleNamespace(module);
    }

    static get_SealedModelsProject_Namespace(module) {
        return ContentHelper.getModuleNamespace(module);
    }

    static get_EntityFrameworkCoreProject_Namespace(module) {
        return null;
    }

    static get_EntityFrameworkCoreSealedModelsProject_Namespace(module) {
        return ContentHelper.getModuleNamespace(module) + '.EntityFrameworkCore';
    }

    static get_AspNetCoreProject_Namespace(module) {
        return ContentHelper.getModuleNamespace(module);
    }

    static get_AspNetCoreMvcDefaultViewModelsProject_Namespace(module) {
        return ContentHelper.getModuleNamespace(module) + '.Mvc';
    }

    // Utilities

    static cleanContent(content) {
        while (content.indexOf('\n\n') > -1) {
            content = content.replace(/\n\n/g, '\n');
        }

        return content;
    }
}
