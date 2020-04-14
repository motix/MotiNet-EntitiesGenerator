import './types';

export class IdentifierHelper {
    /**
     * @param {Module} module
     */
    static getModuleCommonName(module) {
        return module.hasOwnNamespace ? module.name : module.project.namespace.substr(module.project.namespace.lastIndexOf('.') + 1);
    }

    /**
     * @param {Module} module
     */
    static getModuleRootNamespace(module) {
        const projectRootNamespace = module.project.namespace === null ? module.project.name : module.project.namespace;
        const moduleNamespace = module.hasOwnNamespace ? `.${module.name}` : '';
        return projectRootNamespace + moduleNamespace;
    }
}

export default class ContentHelper {
    static get MotiNetCoreVersion() { return '1.1.0-beta-0009' };
    static get MotiNetEntitiesVersion() { return '1.1.0-beta-0018' };

    // String Generations

    static newGuid() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        ).toUpperCase();
    }


    // Todo::

    // Project namespace

    static get_CoreProject_Namespace(module) {
        return IdentifierHelper.getModuleRootNamespace(module);
    }

    static get_SmProject_Namespace(module) {
        return IdentifierHelper.getModuleRootNamespace(module);
    }

    static get_EfProject_Namespace(module) {
        return null;
    }

    static get_EfSmProject_Namespace(module) {
        return IdentifierHelper.getModuleRootNamespace(module) + '.EntityFrameworkCore';
    }

    static get_AspProject_Namespace(module) {
        return IdentifierHelper.getModuleRootNamespace(module);
    }

    static get_AspDvProject_Namespace(module) {
        return IdentifierHelper.getModuleRootNamespace(module) + '.Mvc';
    }

    // Utilities

    static get featureSettingTypes() {
        return [
            'Entity',
            'TimeTrackedEntity',
            'CodeBasedEntity',
            'NameBasedEntity',
            'ScopedNameBasedEntity',
            'ReadableIdEntity',
            'OnOffEntity',
            'PreprocessedEntity'
        ];
    }

    static get featureSettingPropertyNames() {
        const names = [];

        for (const type of ContentHelper.featureSettingTypes) {
            const name = type.substr(0, 1).toLowerCase() + type.substr(1, type.length - 1) + 'FeatureSetting';
            names.push(name);
        }

        return names;
    }

    static getModuleNamespace(module) {
        return (module.project.namespace === null ? module.project.name : module.project.namespace) +
            (module.hasOwnNamespace ? '.' + module.name : '');
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
        const content = `<?xml version="1.0" encoding="utf-8"?>
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
  </resheader>${items}
</root>
`;

        return content;
    }

    static generateDisposePattern() {
        return `
        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: dispose managed state (managed objects).
                }

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.

                disposedValue = true;
            }
        }

        // TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~CheckNoneStore()
        // {
        //   // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
        //   Dispose(false);
        // }

        // This code added to correctly implement the disposable pattern.
        public void Dispose()
        {
            // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
            Dispose(true);
            // TODO: uncomment the following line if the finalizer is overridden above.
            // GC.SuppressFinalize(this);
        }
        #endregion`;
    }

    static moduleValidationRequired(module) {
        for (const item of module.items) {
            if (ContentHelper.entityValidationRequired(item)) {
                return true;
            }
        }

        return false;
    }

    static entityValidationRequired(item) {
        return null !==
            (item.codeBasedEntityFeatureSetting ||
                item.nameBasedEntityFeatureSetting ||
                item.scopedNameBasedEntityFeatureSetting);
    }

    static getEmptyEntityGenericParameters(item) {
        if (item.scopedNameBasedEntityFeatureSetting !== null) {
            return '<,>';
        }

        return '<>';
    }

    static getEntityGenericParameters(item) {
        if (item.scopedNameBasedEntityFeatureSetting !== null) {
            return `<T${item.name}, T${item.scopedNameBasedEntityFeatureSetting.scopeName}>`;
        }

        return `<T${item.name}>`;
    }

    static getEntitySpecificGenericParameters(item) {
        if (item.scopedNameBasedEntityFeatureSetting !== null) {
            return `<${item.name}, ${item.scopedNameBasedEntityFeatureSetting.scopeName}>`;
        }

        return `<${item.name}>`;
    }

    static getMakeGenericTypeParameterList(item) {
        if (item.scopedNameBasedEntityFeatureSetting !== null) {
            return `builder.${item.name}Type, builder.${item.scopedNameBasedEntityFeatureSetting.scopeName}Type`;
        }

        return `builder.${item.name}Type`;
    }

    static subEntityManaged(item, subEntityName) {
        for (const otherItem of item.module.items) {
            if (otherItem !== item && otherItem.name === subEntityName) {
                return true;
            }
        }

        return false;
    }

    static entityParametersLineBreakApplied(item, breakFirstEntity) {
        if (item === item.module.items[0]) {
            return breakFirstEntity;
        }

        return item.parameterListLineBreak;
    }

    static entityIdWiseRequired(item) {
        for (const otherItem of item.module.items) {
            if (otherItem !== item) {
                if (otherItem.scopedNameBasedEntityFeatureSetting !== null &&
                    otherItem.scopedNameBasedEntityFeatureSetting.scopeName === item.name) {
                    return true;
                }
            }
        }

        return false;
    }
}
