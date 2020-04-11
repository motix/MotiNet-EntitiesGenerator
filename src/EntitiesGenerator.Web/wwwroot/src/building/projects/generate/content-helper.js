export default class ContentHelper {
    static get MotiNetCoreVersion() { return '1.1.0-beta-0009' };
    static get MotiNetEntitiesVersion() { return '1.1.0-beta-0018' };

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

    static getLowerCaseEntityName(name) {
        return name.substr(0, 1).toLowerCase() + name.substr(1);
    }

    static generateWhiteSpace(length) {
        var whiteSpace = '';

        for (var i = 0; i < length; i++) {
            whiteSpace += ' ';
        }

        return whiteSpace;
    }

    static trimParameterList(str) {
        for (var i = 0; i < str.length; i++) {
            if (str[i] !== ' ' && str[i] !== '\n' && str[i] !== ',') {
                str = str.substr(i);
                break;
            }
        }

        for (var length = str.length; length > 0; length--) {
            const index = length - 1;
            if (str[index] !== ' ' && str[index] !== '\n' && str[index] !== ',') {
                str = str.substr(0, length);
                break;
            }
        }

        return str;
    }

    static generateResourceFileContent(items) {
        var content = `<?xml version="1.0" encoding="utf-8"?>
<root>
  <resheader name="resmimetype">
    <value>text/microsoft-resx</value>
  </resheader>
  <resheader name="version">
    <value>2.0</value>
  </resheader>
  <resheader name="reader">
    <value>System.Resources.ResXResourceReader, System.Windows.Forms, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089</value>
  </resheader>
  <resheader name="writer">
    <value>System.Resources.ResXResourceWriter, System.Windows.Forms, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089</value>
  </resheader>
{items}
</root>
`;

        content = content.replace('{items}', items);

        return content;
    }
}
