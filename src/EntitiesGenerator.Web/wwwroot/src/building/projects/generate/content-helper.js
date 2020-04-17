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

    static generateResourceFileContent(items) {
        const content = `<?xml version="1.0" encoding="utf-8"?>
<root>
  <!-- 
    Microsoft ResX Schema 
    
    Version 2.0
    
    The primary goals of this format is to allow a simple XML format 
    that is mostly human readable. The generation and parsing of the 
    various data types are done through the TypeConverter classes 
    associated with the data types.
    
    Example:
    
    ... ado.net/XML headers & schema ...
    <resheader name="resmimetype">text/microsoft-resx</resheader>
    <resheader name="version">2.0</resheader>
    <resheader name="reader">System.Resources.ResXResourceReader, System.Windows.Forms, ...</resheader>
    <resheader name="writer">System.Resources.ResXResourceWriter, System.Windows.Forms, ...</resheader>
    <data name="Name1"><value>this is my long string</value><comment>this is a comment</comment></data>
    <data name="Color1" type="System.Drawing.Color, System.Drawing">Blue</data>
    <data name="Bitmap1" mimetype="application/x-microsoft.net.object.binary.base64">
        <value>[base64 mime encoded serialized .NET Framework object]</value>
    </data>
    <data name="Icon1" type="System.Drawing.Icon, System.Drawing" mimetype="application/x-microsoft.net.object.bytearray.base64">
        <value>[base64 mime encoded string representing a byte array form of the .NET Framework object]</value>
        <comment>This is a comment</comment>
    </data>
                
    There are any number of "resheader" rows that contain simple 
    name/value pairs.
    
    Each data row contains a name, and value. The row also contains a 
    type or mimetype. Type corresponds to a .NET class that support 
    text/value conversion through the TypeConverter architecture. 
    Classes that don't support this are serialized and stored with the 
    mimetype set.
    
    The mimetype is used for serialized objects, and tells the 
    ResXResourceReader how to depersist the object. This is currently not 
    extensible. For a given mimetype the value must be set accordingly:
    
    Note - application/x-microsoft.net.object.binary.base64 is the format 
    that the ResXResourceWriter will generate, however the reader can 
    read any of the formats listed below.
    
    mimetype: application/x-microsoft.net.object.binary.base64
    value   : The object must be serialized with 
            : System.Runtime.Serialization.Formatters.Binary.BinaryFormatter
            : and then encoded with base64 encoding.
    
    mimetype: application/x-microsoft.net.object.soap.base64
    value   : The object must be serialized with 
            : System.Runtime.Serialization.Formatters.Soap.SoapFormatter
            : and then encoded with base64 encoding.

    mimetype: application/x-microsoft.net.object.bytearray.base64
    value   : The object must be serialized into a byte array 
            : using a System.ComponentModel.TypeConverter
            : and then encoded with base64 encoding.
    -->
  <xsd:schema id="root" xmlns="" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:msdata="urn:schemas-microsoft-com:xml-msdata">
    <xsd:import namespace="http://www.w3.org/XML/1998/namespace" />
    <xsd:element name="root" msdata:IsDataSet="true">
      <xsd:complexType>
        <xsd:choice maxOccurs="unbounded">
          <xsd:element name="metadata">
            <xsd:complexType>
              <xsd:sequence>
                <xsd:element name="value" type="xsd:string" minOccurs="0" />
              </xsd:sequence>
              <xsd:attribute name="name" use="required" type="xsd:string" />
              <xsd:attribute name="type" type="xsd:string" />
              <xsd:attribute name="mimetype" type="xsd:string" />
              <xsd:attribute ref="xml:space" />
            </xsd:complexType>
          </xsd:element>
          <xsd:element name="assembly">
            <xsd:complexType>
              <xsd:attribute name="alias" type="xsd:string" />
              <xsd:attribute name="name" type="xsd:string" />
            </xsd:complexType>
          </xsd:element>
          <xsd:element name="data">
            <xsd:complexType>
              <xsd:sequence>
                <xsd:element name="value" type="xsd:string" minOccurs="0" msdata:Ordinal="1" />
                <xsd:element name="comment" type="xsd:string" minOccurs="0" msdata:Ordinal="2" />
              </xsd:sequence>
              <xsd:attribute name="name" type="xsd:string" use="required" msdata:Ordinal="1" />
              <xsd:attribute name="type" type="xsd:string" msdata:Ordinal="3" />
              <xsd:attribute name="mimetype" type="xsd:string" msdata:Ordinal="4" />
              <xsd:attribute ref="xml:space" />
            </xsd:complexType>
          </xsd:element>
          <xsd:element name="resheader">
            <xsd:complexType>
              <xsd:sequence>
                <xsd:element name="value" type="xsd:string" minOccurs="0" msdata:Ordinal="1" />
              </xsd:sequence>
              <xsd:attribute name="name" type="xsd:string" use="required" />
            </xsd:complexType>
          </xsd:element>
        </xsd:choice>
      </xsd:complexType>
    </xsd:element>
  </xsd:schema>
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
</root>`;

        return content;
    }

    static generateResourceFileDesignerClassContent(items) {
        const content = `//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EntitiesGenerator.Mvc {
    using System;
    
    
    /// <summary>
    ///   A strongly-typed resource class, for looking up localized strings, etc.
    /// </summary>
    // This class was auto-generated by the StronglyTypedResourceBuilder
    // class via a tool like ResGen or Visual Studio.
    // To add or remove a member, edit your .ResX file then rerun ResGen
    // with the /str option, or rebuild your VS project.
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Resources.Tools.StronglyTypedResourceBuilder", "16.0.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    public class DisplayNames {
        
        private static global::System.Resources.ResourceManager resourceMan;
        
        private static global::System.Globalization.CultureInfo resourceCulture;
        
        [global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        internal DisplayNames() {
        }
        
        /// <summary>
        ///   Returns the cached ResourceManager instance used by this class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        public static global::System.Resources.ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("EntitiesGenerator.Mvc.DisplayNames", typeof(DisplayNames).Assembly);
                    resourceMan = temp;
                }
                return resourceMan;
            }
        }
        
        /// <summary>
        ///   Overrides the current thread's CurrentUICulture property for all
        ///   resource lookups using this strongly typed resource class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        public static global::System.Globalization.CultureInfo Culture {
            get {
                return resourceCulture;
            }
            set {
                resourceCulture = value;
            }
        }${items}
    }
}
`;

        return content;
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
