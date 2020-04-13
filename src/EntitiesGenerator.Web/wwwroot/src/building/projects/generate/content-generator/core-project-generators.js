import 'prismjs/components/prism-csharp';
import ContentHelper from '../content-helper';

import { ContentGenerator, CSharpContentGenerator, ProjectFileGenerator } from './content-generator';

export class CoreProject_ProjectFileGenerator extends ProjectFileGenerator {
    generate() {
        const moduleNamespace = ContentHelper.getModuleNamespace(this.module);

        var content = `<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>netstandard2.1</TargetFramework>
    <RootNamespace>${moduleNamespace}</RootNamespace>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Extensions.Localization.Abstractions" Version="3.1.3" />
    <PackageReference Include="MotiNet.Extensions.Entities.Core" Version="${ContentHelper.MotiNetEntitiesVersion}" />
  </ItemGroup>

</Project>
`;

        return content;
    }
}

export class CoreProject_EntityManagerInterfaceGenerator extends CSharpContentGenerator {
    constructor(item) {
        super();

        this.item = item;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.item.module);
        const entityName = this.item.name;
        const entityGenericParameters = ContentHelper.getEntityGenericParameters(this.item);

        // Features comment

        var featuresComment = '';

        for (var i = 0; i < ContentHelper.featureSettingTypes.length; i++) {
            const settingType = ContentHelper.featureSettingTypes[i];
            const settingName = ContentHelper.featureSettingPropertyNames[i];

            if (this.item[settingName] !== null) {
                featuresComment += `
    // - ${settingType}`;
            }
        }

        if (featuresComment === '') {
            featuresComment = ' None';
        }

        // Interfaces

        var interfaces = '';

        if (this.item.entityFeatureSetting !== null) {
            interfaces += `
          IEntityManager<T${entityName}>,`;
        }
        if (this.item.timeTrackedEntityFeatureSetting !== null) {
            interfaces += `
          ITimeTrackedEntityManager<T${entityName}>,`;
        }
        if (this.item.codeBasedEntityFeatureSetting !== null) {
            interfaces += `
          ICodeBasedEntityManager<T${entityName}>,`;
        }
        if (this.item.nameBasedEntityFeatureSetting !== null) {
            interfaces += `
          INameBasedEntityManager<T${entityName}>,`;
        }
        if (this.item.scopedNameBasedEntityFeatureSetting !== null) {
            interfaces += `
          IScopedNameBasedEntityManager${entityGenericParameters},`;
        }
        if (this.item.readableIdEntityFeatureSetting !== null) {
            interfaces += `
          IReadableIdEntityManager<T${entityName}>,`;
        }
        if (this.item.onOffEntityFeatureSetting !== null) {
            interfaces += `
          IOnOffEntityManager<T${entityName}>,`;
        }
        if (this.item.preprocessedEntityFeatureSetting !== null) {
            interfaces += `
          IPreprocessedEntityManager<T${entityName}>,`;
        }

        if (interfaces !== '') {
            interfaces = interfaces.substr(0, '        '.length + 1) + ':' + interfaces.substr('        '.length + 2);
            interfaces = interfaces.substr(0, interfaces.length - 1);
        }

        // Generic parameter specifications

        var entityGenericParameterSpecifications = `
        where T${entityName} : class`;

        if (this.item.scopedNameBasedEntityFeatureSetting !== null) {
            entityGenericParameterSpecifications += `
        where T${this.item.scopedNameBasedEntityFeatureSetting.scopeName} : class`;
        }

        // Content

        var content = `using MotiNet.Entities;

namespace ${namespace}
{
    // Entity Features:${featuresComment}

    public interface I${entityName}Manager${entityGenericParameters}${interfaces}${entityGenericParameterSpecifications}
    { }
}
`;

        return content;
    }
}

export class CoreProject_EntityStoreInterfaceGenerator extends CSharpContentGenerator {
    constructor(item) {
        super();

        this.item = item;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.item.module);
        const entityName = this.item.name;
        const entityGenericParameters = ContentHelper.getEntityGenericParameters(this.item);

        // Interfaces

        var interfaces = '';

        if (this.item.entityFeatureSetting !== null) {
            interfaces += `
          IEntityStore<T${entityName}>,`;
        }
        if (this.item.timeTrackedEntityFeatureSetting !== null) {
            interfaces += `
          ITimeTrackedEntityStore<T${entityName}>,`;
        }
        if (this.item.codeBasedEntityFeatureSetting !== null) {
            interfaces += `
          ICodeBasedEntityStore<T${entityName}>,`;
        }
        if (this.item.nameBasedEntityFeatureSetting !== null) {
            interfaces += `
          INameBasedEntityStore<T${entityName}>,`;
        }
        if (this.item.scopedNameBasedEntityFeatureSetting !== null) {
            interfaces += `
          IScopedNameBasedEntityStore${entityGenericParameters},`;
        }
        if (this.item.onOffEntityFeatureSetting !== null) {
            interfaces += `
          IOnOffEntityStore<T${entityName}>,`;
        }

        if (interfaces === '') {
            interfaces = ' : IDisposable';
        } else {
            interfaces = interfaces.substr(0, '        '.length + 1) + ':' + interfaces.substr('        '.length + 2);
            interfaces = interfaces.substr(0, interfaces.length - 1);
        }

        // Generic parameter specifications

        var entityGenericParameterSpecifications = `
        where T${entityName} : class`;

        if (this.item.scopedNameBasedEntityFeatureSetting !== null) {
            entityGenericParameterSpecifications += `
        where T${this.item.scopedNameBasedEntityFeatureSetting.scopeName} : class`;
        }

        // Content

        var content = `using MotiNet.Entities;
using System;

namespace ${namespace}
{
    public interface I${entityName}Store${entityGenericParameters}${interfaces}${entityGenericParameterSpecifications}
    { }
}
`;

        return content;
    }
}

export class CoreProject_EntityAccessorInterfaceGenerator extends CSharpContentGenerator {
    constructor(item) {
        super();

        this.item = item;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.item.module);
        const entityName = this.item.name;
        const entityGenericParameters = ContentHelper.getEntityGenericParameters(this.item);

        // Interfaces

        var interfaces = '';

        if (this.item.entityFeatureSetting !== null) {
            interfaces += `
          IEntityAccessor<T${entityName}>,`;
        }
        if (this.item.timeTrackedEntityFeatureSetting !== null) {
            interfaces += `
          ITimeTrackedEntityAccessor<T${entityName}>,`;
        }
        if (this.item.codeBasedEntityFeatureSetting !== null) {
            interfaces += `
          ICodeBasedEntityAccessor<T${entityName}>,`;
        }
        if (this.item.nameBasedEntityFeatureSetting !== null) {
            interfaces += `
          INameBasedEntityAccessor<T${entityName}>,`;
        }
        if (this.item.scopedNameBasedEntityFeatureSetting !== null) {
            interfaces += `
          IScopedNameBasedEntityAccessor${entityGenericParameters},`;
        }
        if (this.item.readableIdEntityFeatureSetting !== null) {
            interfaces += `
          IReadableIdEntityAccessor<T${entityName}>,`;
        }

        if (interfaces !== '') {
            interfaces = interfaces.substr(0, '        '.length + 1) + ':' + interfaces.substr('        '.length + 2);
            interfaces = interfaces.substr(0, interfaces.length - 1);
        }

        // Generic parameter specifications

        var entityGenericParameterSpecifications = `
        where T${entityName} : class`;

        if (this.item.scopedNameBasedEntityFeatureSetting !== null) {
            entityGenericParameterSpecifications += `
        where T${this.item.scopedNameBasedEntityFeatureSetting.scopeName} : class`;
        }

        // Content

        var content = `using MotiNet.Entities;

namespace ${namespace}
{
    public interface I${entityName}Accessor${entityGenericParameters}${interfaces}${entityGenericParameterSpecifications}
    { }
}
`;

        return content;
    }
}

export class CoreProject_EntityManagerClassGenerator extends CSharpContentGenerator {
    constructor(item) {
        super();

        this.item = item;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.item.module);
        const entityName = this.item.name;
        const entityGenericParameters = ContentHelper.getEntityGenericParameters(this.item);

        // Generic parameter specifications

        var entityGenericParameterSpecifications = `
        where T${entityName} : class`;

        if (this.item.scopedNameBasedEntityFeatureSetting !== null) {
            entityGenericParameterSpecifications += `
        where T${this.item.scopedNameBasedEntityFeatureSetting.scopeName} : class`;
        }

        // Constructor parameters, properties assignments

        var constructorParameters = `
            I${entityName}Store${entityGenericParameters} store,
            I${entityName}Accessor${entityGenericParameters} accessor`;
        var propertiesAssignments = '';

        if (ContentHelper.entityValidationRequired(this.item)) {
            constructorParameters += `,
            IEnumerable<IValidator${entityGenericParameters}> validators`;
        }

        constructorParameters += `,
            ILogger<${entityName}Manager${entityGenericParameters}> logger`;

        if (this.item.codeBasedEntityFeatureSetting !== null) {
            constructorParameters += `,
            ILookupNormalizer<T${entityName}> codeNormalizer`;
            propertiesAssignments += `
            CodeNormalizer = codeNormalizer ?? throw new ArgumentNullException(nameof(codeNormalizer));
`;
            if (this.item.codeBasedEntityFeatureSetting.hasCodeGenerator === true) {
                constructorParameters += `,
            IEntityCodeGenerator<T${entityName}> codeGenerator`;
                propertiesAssignments += `
            CodeGenerator = codeGenerator ?? throw new ArgumentNullException(nameof(codeGenerator));
`;
            }
        }

        if (this.item.nameBasedEntityFeatureSetting !== null ||
            this.item.scopedNameBasedEntityFeatureSetting !== null) {
            constructorParameters += `,
            ILookupNormalizer<T${entityName}> nameNormalizer`;
            propertiesAssignments += `
            NameNormalizer = nameNormalizer ?? throw new ArgumentNullException(nameof(nameNormalizer));
`;
        }

        if (this.item.preprocessedEntityFeatureSetting !== null) {
            constructorParameters += `,
            IEntityPreprocessor<T${entityName}> preprocessor`;
            propertiesAssignments += `
            EntityPreprocessor = preprocessor ?? throw new ArgumentNullException(nameof(preprocessor));
`;
        }

        if (propertiesAssignments === '') {
            propertiesAssignments = ' ';
        } else {
            propertiesAssignments += '        ';
        }

        // Base constructor parameters

        const baseConstructorParameters = `store, accessor, ${ContentHelper.entityValidationRequired(this.item) ? 'validators' : 'null'}, logger`;

        // Properties

        var properties = '';

        if (this.item.entityFeatureSetting !== null) {
            properties += `

        public IEntityStore<T${entityName}> EntityStore => Store as IEntityStore<T${entityName}>;

        public IEntityAccessor<T${entityName}> EntityAccessor => Accessor as IEntityAccessor<T${entityName}>;`;
        }

        if (this.item.timeTrackedEntityFeatureSetting !== null) {
            properties += `

        public ITimeTrackedEntityStore<T${entityName}> TimeTrackedEntityStore => Store as ITimeTrackedEntityStore<T${entityName}>;

        public ITimeTrackedEntityAccessor<T${entityName}> TimeTrackedEntityAccessor => Accessor as ITimeTrackedEntityAccessor<T${entityName}>;`;
        }

        if (this.item.codeBasedEntityFeatureSetting !== null) {
            properties += `

        public ICodeBasedEntityStore<T${entityName}> CodeBasedEntityStore => Store as ICodeBasedEntityStore<T${entityName}>;

        public ICodeBasedEntityAccessor<T${entityName}> CodeBasedEntityAccessor => Accessor as ICodeBasedEntityAccessor<T${entityName}>;`;
        }

        if (this.item.nameBasedEntityFeatureSetting !== null) {
            properties += `

        public INameBasedEntityStore<T${entityName}> NameBasedEntityStore => Store as INameBasedEntityStore<T${entityName}>;

        public INameBasedEntityAccessor<T${entityName}> NameBasedEntityAccessor => Accessor as INameBasedEntityAccessor<T${entityName}>;`;
        }

        if (this.item.scopedNameBasedEntityFeatureSetting !== null) {
            properties += `

        public IScopedNameBasedEntityStore${entityGenericParameters} ScopedNameBasedEntityStore => Store as IScopedNameBasedEntityStore${entityGenericParameters};

        public IScopedNameBasedEntityAccessor${entityGenericParameters} ScopedNameBasedEntityAccessor => Accessor as IScopedNameBasedEntityAccessor${entityGenericParameters};`;
        }

        if (this.item.readableIdEntityFeatureSetting !== null) {
            properties += `

        public IReadableIdEntityAccessor<T${entityName}> ReadableIdEntityAccessor => Accessor as IReadableIdEntityAccessor<T${entityName}>;`;
        }

        if (this.item.onOffEntityFeatureSetting !== null) {
            properties += `

        public IOnOffEntityStore<T${entityName}> OnOffEntityStore => Store as IOnOffEntityStore<T${entityName}>;`;
        }

        properties += `

        public I${entityName}Store${entityGenericParameters} ${entityName}Store => Store as I${entityName}Store${entityGenericParameters};

        public I${entityName}Accessor${entityGenericParameters} ${entityName}Accessor => Accessor as I${entityName}Accessor${entityGenericParameters};`;

        if (this.item.codeBasedEntityFeatureSetting !== null) {
            properties += `

        public ILookupNormalizer CodeNormalizer { get; }`;
            if (this.item.codeBasedEntityFeatureSetting.hasCodeGenerator === true) {
                properties += `

        public IEntityCodeGenerator<T${entityName}> CodeGenerator { get; }`;
            } else {
                properties += `

        public IEntityCodeGenerator<T${entityName}> CodeGenerator => null;`;
            }
        }

        if (this.item.nameBasedEntityFeatureSetting !== null ||
            this.item.scopedNameBasedEntityFeatureSetting !== null) {
            properties += `

        public ILookupNormalizer NameNormalizer { get; }`;
        }

        if (this.item.preprocessedEntityFeatureSetting !== null) {
            properties += `

        public IEntityPreprocessor<T${entityName}> EntityPreprocessor { get; }`;
        }

        // Content

        var content = `using Microsoft.Extensions.Logging;
using MotiNet.Entities;
using System;
using System.Collections.Generic;

namespace ${namespace}
{
    public class ${entityName}Manager${entityGenericParameters} : ManagerBase${entityGenericParameters}, I${entityName}Manager${entityGenericParameters}${entityGenericParameterSpecifications}
    {
        public ${entityName}Manager(${constructorParameters})
            : base(${baseConstructorParameters})
        {${propertiesAssignments}}${properties}
    }
}
`;

        return content;
    }
}

export class CoreProject_EntityValidatorClassGenerator extends CSharpContentGenerator {
    constructor(item) {
        super();

        this.item = item;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.item.module);
        const moduleName = ContentHelper.getModuleName(this.item.module);
        const entityName = this.item.name;
        const lowerCaseEntityName = ContentHelper.getLowerCaseEntityName(entityName);
        const entityGenericParameters = ContentHelper.getEntityGenericParameters(this.item);

        // Generic parameter specifications

        var entityGenericParameterSpecifications = `
        where T${entityName} : class`;

        if (this.item.scopedNameBasedEntityFeatureSetting !== null) {
            entityGenericParameterSpecifications += `
        where T${this.item.scopedNameBasedEntityFeatureSetting.scopeName} : class`;
        }

        // Validations

        var validations = '';

        if (this.item.codeBasedEntityFeatureSetting !== null) {
            validations += `

            await this.ValidateCodeAsync(theManager, Accessor, ${lowerCaseEntityName}, errors,
                code => ErrorDescriber.Invalid${entityName}Code(code), code => ErrorDescriber.Duplicate${entityName}Code(code));`;
        }

        if (this.item.nameBasedEntityFeatureSetting !== null ||
            this.item.scopedNameBasedEntityFeatureSetting !== null) {
            validations += `

            await this.ValidateNameAsync(theManager, Accessor, ${lowerCaseEntityName}, errors,
                name => ErrorDescriber.Invalid${entityName}Name(name), name => ErrorDescriber.Duplicate${entityName}Name(name));`;
        }

        // Sub-entity validations

        var subEntityValidations = '';

        if (this.item.scopedNameBasedEntityFeatureSetting !== null) {
            const subEntityName = this.item.scopedNameBasedEntityFeatureSetting.scopeName;
            const lowerCaseSubEntityName = ContentHelper.getLowerCaseEntityName(subEntityName);

            subEntityValidations = `

        public Task<GenericResult> ValidateAsync(object manager, T${subEntityName} ${lowerCaseSubEntityName})
        {
            throw new NeverValidateSubEntityException<T${subEntityName}, I${entityName}Manager${entityGenericParameters}>();
        }`;
        }

        var content = `using MotiNet;
using MotiNet.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ${namespace}
{
    public class ${entityName}Validator${entityGenericParameters} : IValidator${entityGenericParameters}${entityGenericParameterSpecifications}
    {
        public ${entityName}Validator(I${entityName}Accessor${entityGenericParameters} accessor, ${moduleName}ErrorDescriber errorDescriber)
        {
            Accessor = accessor;
            ErrorDescriber = errorDescriber;
        }

        protected I${entityName}Accessor${entityGenericParameters} Accessor { get; }

        private ${moduleName}ErrorDescriber ErrorDescriber { get; }

        public async Task<GenericResult> ValidateAsync(object manager, T${entityName} ${lowerCaseEntityName})
        {
            var theManager = this.GetManager<T${entityName}, I${entityName}Manager${entityGenericParameters}>(manager);
            var errors = new List<GenericError>();${validations}

            return GenericResult.GetResult(errors);
        }${subEntityValidations}
    }
}
`;

        return content;
    }
}

export class CoreProject_ErrorDescriberClassGenerator extends CSharpContentGenerator {
    constructor(module) {
        super();

        this.module = module;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.module);
        const moduleName = ContentHelper.getModuleName(this.module);

        var describers = '';

        for (const item of this.module.items) {
            if (!ContentHelper.entityValidationRequired(item)) {
                continue;
            }

            const entityName = item.name;
            const lowerCaseEntityName = ContentHelper.getLowerCaseEntityName(entityName);

            describers += `

        #region ${entityName}`;

            if (item.codeBasedEntityFeatureSetting !== null) {
                describers += `

        public virtual GenericError Invalid${entityName}Code(string ${lowerCaseEntityName}Code)
            => new GenericError
            {
                Code = nameof(Invalid${entityName}Code),
                Description = _localizer[nameof(Invalid${entityName}Code), ${lowerCaseEntityName}Code]
            };

        public virtual GenericError Duplicate${entityName}Code(string ${lowerCaseEntityName}Code)
            => new GenericError
            {
                Code = nameof(Duplicate${entityName}Code),
                Description = _localizer[nameof(Duplicate${entityName}Code), ${lowerCaseEntityName}Code]
            };`;
            }

            if (item.nameBasedEntityFeatureSetting !== null ||
                item.scopedNameBasedEntityFeatureSetting !== null) {
                describers += `

        public virtual GenericError Invalid${entityName}Name(string ${lowerCaseEntityName}Name)
            => new GenericError
            {
                Code = nameof(Invalid${entityName}Name),
                Description = _localizer[nameof(Invalid${entityName}Name), ${lowerCaseEntityName}Name]
            };

        public virtual GenericError Duplicate${entityName}Name(string ${lowerCaseEntityName}Name)
            => new GenericError
            {
                Code = nameof(Duplicate${entityName}Name),
                Description = _localizer[nameof(Duplicate${entityName}Name), ${lowerCaseEntityName}Name]
            };`;
            }

            describers += `

        #endregion`;
        }

        var content = `using Microsoft.Extensions.Localization;
using ${namespace}.Resources;
using MotiNet;

namespace ${namespace}
{
    public class ${moduleName}ErrorDescriber
    {
        #region Fields

        private readonly IStringLocalizer _localizer;

        #endregion

        #region Constructors

        public ${moduleName}ErrorDescriber(IStringLocalizer<${moduleName}ErrorDescriberResources> localizer) => _localizer = localizer;

        protected ${moduleName}ErrorDescriber(IStringLocalizer localizer) => _localizer = localizer;

        #endregion${describers}
    }
}
`;

        return content;
    }
}

export class CoreProject_ErrorDescriberResourcesClassGenerator extends CSharpContentGenerator {
    constructor(module) {
        super();

        this.module = module;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.module);
        const moduleName = ContentHelper.getModuleName(this.module);

        var content = `namespace ${namespace}.Resources
{
    public class ${moduleName}ErrorDescriberResources { }
}
`;

        return content;
    }
}

export class CoreProject_ErrorDescriberResourcesResxGenerator extends ContentGenerator {
    constructor(module) {
        super();

        this.module = module;
    }

    get language() { return 'markup'; }

    generate() {
        var items = '';

        for (const item of this.module.items) {
            const entityName = item.name;
            const displayName = item.displayName;

            if (item.codeBasedEntityFeatureSetting !== null) {
                items += `
  <data name="Duplicate${entityName}Code" xml:space="preserve">
    <value>${displayName} code '{0}' has already been used.</value>
  </data>
  <data name="Invalid${entityName}Code" xml:space="preserve">
    <value>${displayName} code '{0}' is invalid.</value>
  </data>`;
            }

            if (item.nameBasedEntityFeatureSetting !== null ||
                item.scopedNameBasedEntityFeatureSetting !== null) {
                items += `
  <data name="Duplicate${entityName}Name" xml:space="preserve">
    <value>${displayName} name '{0}' has already been used.</value>
  </data>
  <data name="Invalid${entityName}Name" xml:space="preserve">
    <value>${displayName} name '{0}' is invalid.</value>
  </data>`;
            }
        }

        var content = ContentHelper.generateResourceFileContent(items);

        return content;
    }
}

export class CoreProject_BuilderClassGenerator extends CSharpContentGenerator {
    constructor(module) {
        super();

        this.module = module;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.module);
        const moduleName = ContentHelper.getModuleName(this.module);

        var constructorParameters = '';
        var constructBuilderParameters = '';
        var properties = '';
        for (const item of this.module.items) {
            const entityName = item.name;
            const lowerCaseEntityName = ContentHelper.getLowerCaseEntityName(entityName);
            const constructorParametersLineBreak = ContentHelper.entityParametersLineBreakApplied(item, true) ? `
            ` : ' ';
            const constructBuilderParametersLineBreak = ContentHelper.entityParametersLineBreakApplied(item, true) ? `
                ` : ' ';

            constructorParameters += `,${constructorParametersLineBreak}Type ${lowerCaseEntityName}Type`;

            constructBuilderParameters += `,${constructBuilderParametersLineBreak}${lowerCaseEntityName}Type`;

            properties += `
        public Type ${entityName}Type { get; private set; }
`;

            if (item.scopedNameBasedEntityFeatureSetting !== null) {
                const subEntityName = item.scopedNameBasedEntityFeatureSetting.scopeName;

                if (!ContentHelper.subEntityManaged(item, subEntityName)) {
                    const lowerCaseSubEntityName = ContentHelper.getLowerCaseEntityName(subEntityName);

                    constructorParameters += `, Type ${lowerCaseSubEntityName}Type`;

                    constructBuilderParameters += `, ${lowerCaseSubEntityName}Type`;

                    properties += `
        public Type ${subEntityName}Type { get; private set; }
`;
                }
            }
        }

        var content = `using Microsoft.Extensions.DependencyInjection;
using MotiNet.Entities;
using System;

namespace ${namespace}
{
    public class ${moduleName}Builder : BuilderBase
    {
        public ${moduleName}Builder(
            IServiceCollection services${constructorParameters})
            : base(services)
            => BuilderHelper.ConstructBuilder(
                this, typeof(${moduleName}Builder).GetConstructors()[0],
                services${constructBuilderParameters});

        #region Properties
${properties}
        #endregion
    }
}
`;

        return content;
    }
}

export class CoreProject_DependencyInjectionClassGenerator extends CSharpContentGenerator {
    constructor(module) {
        super();

        this.module = module;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.module);
        const moduleName = ContentHelper.getModuleName(this.module);

        var moduleGenericParameters = '';
        var moduleGenericParameterSpecifications = '';
        var registrations = '';
        var builderConstructorParameters = '';
        var features = '';

        if (ContentHelper.moduleValidationRequired(this.module)) {
            features += `
            services.TryAddScoped<${moduleName}ErrorDescriber, ${moduleName}ErrorDescriber>();`;
        }

        for (const item of this.module.items) {
            const entityName = item.name;
            const entityGenericParameters = ContentHelper.getEntityGenericParameters(item);
            const moduleGenericParametersLineBreak = ContentHelper.entityParametersLineBreakApplied(item, false) ? (`
                                  ` + ContentHelper.generateWhiteSpace(moduleName.length * 2)) : (item === this.module.items[0] ? '' : ' ');
            const builderConstructorParametersLineBreak = ContentHelper.entityParametersLineBreakApplied(item, true) ? `
                ` : ' ';

            moduleGenericParameters += `${moduleGenericParametersLineBreak}T${entityName},`;

            moduleGenericParameterSpecifications += `
            where T${entityName} : class`;

            builderConstructorParameters += `,${builderConstructorParametersLineBreak}typeof(T${entityName})`;

            if (item.scopedNameBasedEntityFeatureSetting !== null) {
                const subEntityName = item.scopedNameBasedEntityFeatureSetting.scopeName;

                if (!ContentHelper.subEntityManaged(item, subEntityName)) {
                    moduleGenericParameters += ` T${subEntityName},`;

                    moduleGenericParameterSpecifications += `
            where T${subEntityName} : class`;

                    builderConstructorParameters += `, typeof(T${subEntityName})`;
                }
            }

            registrations += `
            services.TryAddScoped<I${entityName}Manager${entityGenericParameters}, ${entityName}Manager${entityGenericParameters}>();`;

            if (ContentHelper.entityValidationRequired(item)) {
                registrations += `
            services.TryAddScoped<IValidator<T${entityName}>, ${entityName}Validator${entityGenericParameters}>();`;
            }

            if (item.codeBasedEntityFeatureSetting !== null ||
                item.nameBasedEntityFeatureSetting !== null ||
                item.scopedNameBasedEntityFeatureSetting !== null) {
                registrations += `
            services.TryAddScoped<ILookupNormalizer<T${entityName}>, LowerInvariantLookupNormalizer<T${entityName}>>();`;
            }

            registrations += '\n';
        }

        if (this.module.items.length > 0) {
            moduleGenericParameters = '<' + moduleGenericParameters.substr(0, moduleGenericParameters.length - 1) + '>';
        }

        if (features !== '') {
            features = `
            // Features
` + features + '\n';
        }

        var content = `using Microsoft.Extensions.DependencyInjection.Extensions;
using MotiNet.Entities;
using ${namespace};

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ${moduleName}ServiceCollectionExtensions
    {
        public static ${moduleName}Builder Add${moduleName}${moduleGenericParameters}(
            this IServiceCollection services)${moduleGenericParameterSpecifications}
        {${registrations}${features}
            return new ${moduleName}Builder(
                services${builderConstructorParameters});
        }
    }
}
`;

        return content;
    }
}
