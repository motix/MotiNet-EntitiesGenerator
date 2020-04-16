import './types';

export default class ContentHelper {
    // MotiNet versions

    static get MotiNetCoreVersion() { return '1.1.0-beta-0009' };
    static get MotiNetEntitiesVersion() { return '1.1.0-beta-0018' };

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
        const names = _.map(ContentHelper.featureSettingTypes, value => `${_.lowerFirst(value)}FeatureSetting`);
        return names;
    }

    // String Generations

    static newGuid() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        ).toUpperCase();
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
        return `#region IDisposable Support
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
}

export class IdentifierHelper {
    /**
     * @param {Module} module
     */
    static getModuleCommonName(module) {
        return module.hasOwnNamespace ? module.name :
            (module.project.namespace === null ? module.project.name :
                module.project.namespace.substr(module.project.namespace.lastIndexOf('.') + 1));
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

export class StringHelper {
    static get emptyLinePlaceholder() {
        return '// [empty line]';
    }

    /**
     * @param {string} text
     * @param {number} indent
     */
    static indent(text, indent) {
        var lines = text.split('\n');
        lines = _.map(lines, value => _.repeat(' ', 4 * indent) + value);

        text = lines.join('\n');
        text = StringHelper.clearEmptyLines(text);

        return text;
    }

    /**
     * @param {string} text
     */
    static clearEmptyLines(text) {
        var lines = text.split('\n');
        lines = _.map(lines, line => _.every(line, char => char === ' ') ? '' : line);

        text = lines.join('\n');

        return text;
    }

    /**
     * @param {string} text
     * @param {NewLineIfNotEmptyConfig} config
     */
    static newLineIfNotEmpty(text, config) {
        if (!config) {
            return text;
        }

        if (text === '') {
            if (config.spaceIfEmpty === true) {
                text = ' ';
            }
        } else {
            if (_.isNumber(config.start)) {
                text = _.repeat('\n', config.start) + text;
            }
            if (config.startComma === true) {
                text = `,${config.start > 0 ? '' : ' '}${text}`;
            }
            if (config.endComma === true) {
                text = `${text},${config.end > 0 ? '' : ' '}`;
            }
            if (_.isNumber(config.end)) {
                text += _.repeat('\n', config.end);
            }
            if (_.isNumber(config.endIndent)) {
                text += _.repeat(' ', config.endIndent * 4);
            }
        }

        return text;
    }

    /**
     * @param {string[]} codeLines
     * @param {number} [indent]
     * @param {string} [extraSeparator]
     * @param {NewLineIfNotEmptyConfig} [newLineIfNotEmpty]
     */
    static joinLines(codeLines, indent, extraSeparator, newLineIfNotEmpty) {
        if (codeLines.length === 0) {
            if (!_.isUndefined(newLineIfNotEmpty)) {
                return StringHelper.newLineIfNotEmpty('', newLineIfNotEmpty);
            }

            return '';
        }

        codeLines = _.map(codeLines, value => value.startsWith(StringHelper.emptyLinePlaceholder) ? '' : value);

        var str = codeLines.join(!_.isUndefined(extraSeparator) ? extraSeparator + '\n' : '\n');

        if (!_.isUndefined(indent)) {
            str = StringHelper.indent(str, indent);
        }

        if (!_.isUndefined(newLineIfNotEmpty)) {
            str = StringHelper.newLineIfNotEmpty(str, newLineIfNotEmpty);
        }

        return str;
    }

    /**
     * @param {ParameterListItem[]} parameters
     * @param {number} [indent]
     * @param {NewLineIfNotEmptyConfig} [newLineIfNotEmpty]
     */
    static joinParameters(parameters, indent, newLineIfNotEmpty) {
        var paramStrs = _.map(parameters, (value, index) => (index > 0 && value.lineBreak === true ? '\n' : '') + value.text);
        var str = paramStrs.join(', ');

        paramStrs = str.split('\n');
        paramStrs = _.map(paramStrs, value => value.trim());
        str = paramStrs.join('\n');

        if (_.isNumber(indent)) {
            str = StringHelper.indent(str, indent);
        }

        if (!_.isUndefined(newLineIfNotEmpty)) {
            str = StringHelper.newLineIfNotEmpty(str, newLineIfNotEmpty);
        }

        return str;
    }

    /**
     * @param {string} text
     * @param {number} [indent]
     */
    static addBaseBlockColon(text, indent) {
        if (!_.isUndefined(indent)) {
            text = StringHelper.indent(text, indent);
        }

        const spaceLength = _.findIndex(text, value => {
            return value !== ' ';
        });

        if (spaceLength === -1) {
            throw 'No text found to add colon.';
        }

        var lines = text.split('\n');
        lines = _.map(lines,
            (value, index) => index === 0 ?
                _.repeat(' ', spaceLength) + ': ' + value.substr(spaceLength) :
                (index === 0 ? ': ' : '  ') + value);

        text = lines.join('\n');
        text = StringHelper.clearEmptyLines(text);

        return text;
    }

    /**
     * @param {string[]} baseTypes
     * @param {number} [indent]
     * @param {NewLineIfNotEmptyConfig} [newLineIfNotEmpty]
     */
    static generateBaseBlock(baseTypes, indent, newLineIfNotEmpty) {
        if (baseTypes.length === 0) {
            if (!_.isUndefined(newLineIfNotEmpty)) {
                return StringHelper.newLineIfNotEmpty('', newLineIfNotEmpty);
            }

            return '';
        }

        var str = baseTypes.join(',\n');
        str = StringHelper.addBaseBlockColon(str, indent);

        if (!_.isUndefined(newLineIfNotEmpty)) {
            str = StringHelper.newLineIfNotEmpty(str, newLineIfNotEmpty);
        }

        return str;
    }
}
