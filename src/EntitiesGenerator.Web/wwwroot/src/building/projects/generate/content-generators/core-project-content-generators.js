// Core

import 'prismjs/components/prism-csharp';
import ContentHelper, { IdentifierHelper, StringHelper } from '../content-helper';

import { CoreProjectSG } from '../structure-generators/structure-generators';
import {
    ModuleSpecificContentGenerator,
    CSharpModuleSpecificContentGenerator,
    CSharpEntitySpecificContentGenerator,
    ProjectFileGenerator
} from './content-generator';

export class CoreProject_ProjectFileGenerator extends ProjectFileGenerator {
    generate() {
        const defaultNamespace = this.getProjectDefaultNamespaceIfRequired(CoreProjectSG);

        const content = `<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>netstandard2.1</TargetFramework>${defaultNamespace}
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

export class CoreProject_EntityManagerInterfaceGenerator extends CSharpEntitySpecificContentGenerator {
    generate() {
        const namespace = CoreProjectSG.getDefaultNamespace(this.item.module);
        const entityName = this.item.name;
        const featuresCommentData = [];
        const entityGenericTypeParameters = this.features.itemGenericTypeParameters(this.item);
        const entityGenericTypeConstraints = this.features.itemGenericTypeConstraints(this.item, 2);
        const managerInterfacesData = [];

        for (const feature of this.features.allFeatures) {
            if (feature.itemHasFeature(this.item)) {
                feature.core_EntityManagerInterface_FeaturesCommentData(this.item, featuresCommentData);
                feature.core_EntityManagerInterface_ManagerInterfacesData(this.item, managerInterfacesData);
            }
        }

        const featuresComment = this.generateFeatureComments(_.uniq(featuresCommentData));
        const managerInterfaces = StringHelper.generateBaseBlock(_.uniq(managerInterfacesData), 2, { start: 1 });

        const content = `using MotiNet.Entities;

namespace ${namespace}
{
${featuresComment}

    public interface I${entityName}Manager${entityGenericTypeParameters}${managerInterfaces}
${entityGenericTypeConstraints}
    { }
}
`;

        return content;
    }

    /**
     * @param {string[]} data
     */
    generateFeatureComments(data) {
        var comments = '// Entity Features:'

        if (data.length === 0) {
            comments += ' None'
        } else {
            for (const comment of data) {
                comments += '\n' + `// - ${comment}`;
            }
        }

        comments = StringHelper.indent(comments, 1);

        return comments;
    }

    /**
     * @param {string[]} data
     */
    generateManagerInterfaces(data) {
        if (data.length === 0) {
            return '';
        }

        var interfaces = data.join('\n');

        interfaces = StringHelper.addBaseBlockColon(interfaces, 2);
        interfaces = '\n' + interfaces;

        return interfaces;
    }
}

export class CoreProject_EntityStoreInterfaceGenerator extends CSharpEntitySpecificContentGenerator {
    generate() {
        const namespace = CoreProjectSG.getDefaultNamespace(this.item.module);
        const entityName = this.item.name;
        const entityGenericTypeParameters = this.features.itemGenericTypeParameters(this.item);
        const entityGenericTypeConstraints = this.features.itemGenericTypeConstraints(this.item, 2);
        const storeInterfacesData = [];

        for (const feature of this.features.allFeatures) {
            if (feature.itemHasFeature(this.item)) {
                feature.core_EntityStoreInterface_StoreInterfacesData(this.item, storeInterfacesData);
            }
        }

        const storeInterfaces = storeInterfacesData.length === 0 ? ' : IDisposable' :
            StringHelper.generateBaseBlock(_.uniq(storeInterfacesData), 2, { start: 1 });

        const content = `using MotiNet.Entities;
using System;

namespace ${namespace}
{
    public interface I${entityName}Store${entityGenericTypeParameters}${storeInterfaces}
${entityGenericTypeConstraints}
    { }
}
`;

        return content;
    }
}

export class CoreProject_EntityAccessorInterfaceGenerator extends CSharpEntitySpecificContentGenerator {
    generate() {
        const namespace = CoreProjectSG.getDefaultNamespace(this.item.module);
        const entityName = this.item.name;
        const entityGenericTypeParameters = this.features.itemGenericTypeParameters(this.item);
        const entityGenericTypeConstraints = this.features.itemGenericTypeConstraints(this.item, 2);
        const accessorInterfacesData = [];

        for (const feature of this.features.allFeatures) {
            if (feature.itemHasFeature(this.item)) {
                feature.core_EntityAccessorInterface_AccessorInterfacesData(this.item, accessorInterfacesData);
            }
        }

        const accessorInterfaces = StringHelper.generateBaseBlock(_.uniq(accessorInterfacesData), 2, { start: 1 });

        const content = `using MotiNet.Entities;

namespace ${namespace}
{
    public interface I${entityName}Accessor${entityGenericTypeParameters}${accessorInterfaces}
${entityGenericTypeConstraints}
    { }
}
`;

        return content;
    }
}

export class CoreProject_EntityManagerClassGenerator extends CSharpEntitySpecificContentGenerator {
    generate() {
        const namespace = CoreProjectSG.getDefaultNamespace(this.item.module);
        const entityName = this.item.name;
        const entityGenericTypeParameters = this.features.itemGenericTypeParameters(this.item);
        const entityGenericTypeConstraints = this.features.itemGenericTypeConstraints(this.item, 2);
        const constructorParametersData = [];
        const baseConstructorParametersData = [];
        const propertyAssignmentsData = [];
        const propertyDeclarations1Data = [];
        const propertyDeclarations2Data = [];

        constructorParametersData.push(
            `I${entityName}Store${entityGenericTypeParameters} store`,
            `I${entityName}Accessor${entityGenericTypeParameters} accessor`,
            `IEnumerable<IValidator${entityGenericTypeParameters}> validators`,
            `ILogger<${entityName}Manager${entityGenericTypeParameters}> logger`
        );
        baseConstructorParametersData.push('store', 'accessor', 'validators', 'logger');

        for (const feature of this.features.allFeatures) {
            if (feature.itemHasFeature(this.item)) {
                feature.core_EntityManagerClass_ConstructorParametersData(this.item, constructorParametersData);
                feature.core_EntityManagerClass_PropertiesAssignmentsData(this.item, propertyAssignmentsData);
                feature.core_EntityManagerClass_PropertiesDeclarations1Data(this.item, propertyDeclarations1Data);
                feature.core_EntityManagerClass_PropertiesDeclarations2Data(this.item, propertyDeclarations2Data);
            }
        }

        propertyDeclarations1Data.push(`public I${entityName}Store${entityGenericTypeParameters} ${entityName}Store => Store as I${entityName}Store${entityGenericTypeParameters};`);
        propertyDeclarations1Data.push(`public I${entityName}Accessor${entityGenericTypeParameters} ${entityName}Accessor => Accessor as I${entityName}Accessor${entityGenericTypeParameters};`);

        const constructorParameters = StringHelper.joinLines(_.uniq(constructorParametersData), 3, ',', { start: 1 });
        const baseConstructorParameters = _.uniq(baseConstructorParametersData).join(', ');
        const propertyAssignments = StringHelper.joinLines(_.uniq(propertyAssignmentsData), 3, '', { start: 1, end: 1, endIndent: 2, spaceIfEmpty: true });
        const propertyDeclarations1 = StringHelper.joinLines(_.uniq(propertyDeclarations1Data), 2, '\n', { start: 2 });
        const propertyDeclarations2 = StringHelper.joinLines(_.uniq(propertyDeclarations2Data), 2, '\n', { start: 2 });

        const content = `using Microsoft.Extensions.Logging;
using MotiNet.Entities;
using System;
using System.Collections.Generic;

namespace ${namespace}
{
    public class ${entityName}Manager${entityGenericTypeParameters} : ManagerBase${entityGenericTypeParameters}, I${entityName}Manager${entityGenericTypeParameters}
${entityGenericTypeConstraints}
    {
        public ${entityName}Manager(${constructorParameters})
            : base(${baseConstructorParameters})
        {${propertyAssignments}}${propertyDeclarations1}${propertyDeclarations2}
    }
}
`;

        return content;
    }
}

export class CoreProject_EntityValidatorClassGenerator extends CSharpEntitySpecificContentGenerator {
    generate() {
        const namespace = CoreProjectSG.getDefaultNamespace(this.item.module);
        const moduleCommonName = IdentifierHelper.getModuleCommonName(this.item.module);
        const entityName = this.item.name;
        const lowerFirstEntityName = _.lowerFirst(entityName);
        const entityGenericTypeParameters = this.features.itemGenericTypeParameters(this.item);
        const entityGenericTypeConstraints = this.features.itemGenericTypeConstraints(this.item, 2);
        const validationsData = [];
        const subEntityValidateMethodsData = [];

        for (const feature of this.features.allFeatures) {
            if (feature.itemHasFeature(this.item)) {
                feature.core_EntityValidatorClass_ValidationsData(this.item, validationsData);
                feature.core_EntityValidatorClass_SubEntityValidateMethodsData(this.item, subEntityValidateMethodsData);
            }
        }

        const validations = StringHelper.joinLines(_.uniq(validationsData), 3, '\n', { start: 2 });
        const subEntityValidateMethods = StringHelper.joinLines(_.uniq(subEntityValidateMethodsData), 2, '\n', { start: 2 });

        const content = `using MotiNet;
using MotiNet.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ${namespace}
{
    public class ${entityName}Validator${entityGenericTypeParameters} : IValidator${entityGenericTypeParameters}
${entityGenericTypeConstraints}
    {
        public ${entityName}Validator(I${entityName}Accessor${entityGenericTypeParameters} accessor, ${moduleCommonName}ErrorDescriber errorDescriber)
        {
            Accessor = accessor ?? throw new System.ArgumentNullException(nameof(accessor));
            ErrorDescriber = errorDescriber ?? throw new System.ArgumentNullException(nameof(errorDescriber));
        }

        protected I${entityName}Accessor${entityGenericTypeParameters} Accessor { get; }

        private ${moduleCommonName}ErrorDescriber ErrorDescriber { get; }

        public async Task<GenericResult> ValidateAsync(object manager, T${entityName} ${lowerFirstEntityName})
        {
            var theManager = this.GetManager<T${entityName}, I${entityName}Manager${entityGenericTypeParameters}>(manager);
            var errors = new List<GenericError>();${validations}

            return GenericResult.GetResult(errors);
        }${subEntityValidateMethods}
    }
}
`;

        return content;
    }
}

export class CoreProject_ErrorDescriberClassGenerator extends CSharpModuleSpecificContentGenerator {
    generate() {
        const namespace = CoreProjectSG.getDefaultNamespace(this.module);
        const moduleCommonName = IdentifierHelper.getModuleCommonName(this.module);
        const describerMethodsData = [];

        for (const item of this.module.items) {
            const itemDescriberMethodsData = [];

            for (const feature of this.features.allFeatures) {
                if (feature.itemHasFeature(item)) {
                    feature.core_ErrorDescriberClass_DescriberMethodsData(item, itemDescriberMethodsData);
                }
            }

            if (itemDescriberMethodsData.length > 0) {
                const entityName = item.name;

                describerMethodsData.push(
                    `#region ${entityName}`,
                    ..._.uniq(itemDescriberMethodsData),
                    `#endregion ${entityName}`
                )
            }
        }

        const describerMethods = StringHelper.joinLines(_.uniq(describerMethodsData), 2, '\n', { start: 2 })
                                             .replace(/#endregion.*/g, '#endregion');

        const content = `using Microsoft.Extensions.Localization;
using ${namespace}.Resources;
using MotiNet;

namespace ${namespace}
{
    public class ${moduleCommonName}ErrorDescriber
    {
        #region Fields

        private readonly IStringLocalizer _localizer;

        #endregion

        #region Constructors

        public ${moduleCommonName}ErrorDescriber(IStringLocalizer<${moduleCommonName}ErrorDescriberResources> localizer) => _localizer = localizer;

        protected ${moduleCommonName}ErrorDescriber(IStringLocalizer localizer) => _localizer = localizer;

        #endregion${describerMethods}
    }
}
`;

        return content;
    }
}

export class CoreProject_ErrorDescriberResourcesClassGenerator extends CSharpModuleSpecificContentGenerator {
    generate() {
        const namespace = CoreProjectSG.getDefaultNamespace(this.module);
        const moduleCommonName = IdentifierHelper.getModuleCommonName(this.module);

        const content = `namespace ${namespace}.Resources
{
    public class ${moduleCommonName}ErrorDescriberResources { }
}
`;

        return content;
    }
}

export class CoreProject_ErrorDescriberResourcesResxGenerator extends ModuleSpecificContentGenerator {
    get language() { return 'markup'; }

    generate() {
        const itemsData = [];

        for (const item of this.module.items) {
            for (const feature of this.features.allFeatures) {
                if (feature.itemHasFeature(item)) {
                    feature.core_ErrorDescriberResourcesResx_ItemsData(item, itemsData);
                }
            }
        }

        const items = StringHelper.joinLines(_.uniq(itemsData), .5, '', { start: 1 });

        var content = ContentHelper.generateResourceFileContent(items);

        return content;
    }
}

export class CoreProject_BuilderClassGenerator extends CSharpModuleSpecificContentGenerator {
    generate() {
        const namespace = CoreProjectSG.getDefaultNamespace(this.module);
        const moduleCommonName = IdentifierHelper.getModuleCommonName(this.module);
        const constructorParametersData = [];
        const constructBuilderParametersData = [];
        const propertyDeclarationsData = [];

        for (const item of this.module.items) {
            const entityName = item.name;
            const lowerFirstEntityName = _.lowerFirst(entityName);

            constructorParametersData.push({
                text: `Type ${lowerFirstEntityName}Type`,
                lineBreak: item.parameterListLineBreak
            });

            constructBuilderParametersData.push({
                text: `${lowerFirstEntityName}Type`,
                lineBreak: item.parameterListLineBreak
            });

            propertyDeclarationsData.push(`public Type ${entityName}Type { get; private set; }`);

            for (const feature of this.features.allFeatures) {
                if (feature.itemHasFeature(item)) {
                    feature.core_BuilderClass_ConstructorParametersData(item, constructorParametersData);
                    feature.core_BuilderClass_ConstructBuilderParametersData(item, constructBuilderParametersData);
                    feature.core_BuilderClass_PropertiesDeclarationsData(item, propertyDeclarationsData);
                }
            }
        }

        const constructorParameters = StringHelper.joinParameters(_.uniqBy(constructorParametersData, value => value.text),
            3, { startComma: true, start: 1 });
        const constructBuilderParameters = StringHelper.joinParameters(_.uniqBy(constructBuilderParametersData, value => value.text),
            4, { startComma: true, start: 1 });
        const propertyDeclarations = StringHelper.joinLines(_.uniq(propertyDeclarationsData),
            2, '\n', { start: 2 });

        const content = `using Microsoft.Extensions.DependencyInjection;
using MotiNet.Entities;
using System;

namespace ${namespace}
{
    public class ${moduleCommonName}Builder : BuilderBase
    {
        public ${moduleCommonName}Builder(
            IServiceCollection services${constructorParameters})
            : base(services)
            => BuilderHelper.ConstructBuilder(
                this, typeof(${moduleCommonName}Builder).GetConstructors()[0],
                services${constructBuilderParameters});${propertyDeclarations}
    }
}
`;

        return content;
    }
}

export class CoreProject_DependencyInjectionClassGenerator extends CSharpModuleSpecificContentGenerator {
    generate() {
        const namespace = CoreProjectSG.getDefaultNamespace(this.module);
        const moduleCommonName = IdentifierHelper.getModuleCommonName(this.module);
        const moduleGenericTypeParameters = this.features.moduleGenericTypeParameters(this.module,
            `public static ${moduleCommonName}Builder Add${moduleCommonName}`.length / 4 + 2);
        const moduleGenericTypeConstraints = this.features.moduleGenericTypeConstraints(this.module, 3, false, { start: 1 });
        const entityServiceRegistrationsData = [];
        const moduleServiceRegistrationsData = [];
        const builderConstructorParametersData = _.map(this.features.moduleEntityNames(this.module),
            value => ({ text: `typeof(T${value.name})`, lineBreak: value.lineBreak }));

        for (const item of this.module.items) {
            const entityName = item.name;
            const entityGenericTypeParameters = this.features.itemGenericTypeParameters(item);

            entityServiceRegistrationsData.push(
                `services.TryAddScoped<I${entityName}Manager${entityGenericTypeParameters}, ${entityName}Manager${entityGenericTypeParameters}>();`);

            if (this.features.itemValidationRequired(item)) {
                entityServiceRegistrationsData.push(
                    `services.TryAddScoped<IValidator${entityGenericTypeParameters}, ${entityName}Validator${entityGenericTypeParameters}>();`);
            }

            for (const feature of this.features.allFeatures) {
                if (feature.itemHasFeature(item)) {
                    feature.core_DependencyInjectionClass_EntityServiceRegistrationsData(item, entityServiceRegistrationsData);
                }
            }

            entityServiceRegistrationsData.push(`${StringHelper.emptyLinePlaceholder} ${item.name}`);
        }

        if (this.features.moduleValidationRequired(this.module)) {
            moduleServiceRegistrationsData.push(`services.TryAddScoped<${moduleCommonName}ErrorDescriber, ${moduleCommonName}ErrorDescriber>();`);
        }

        const entityServiceRegistrations = StringHelper.joinLines(_.uniq(entityServiceRegistrationsData), 3, '', { start: 1 });
        const moduleServiceRegistrations = StringHelper.joinLines(_.uniq(moduleServiceRegistrationsData), 3, '', { start: 1, end: 1 });
        const builderConstructorParameters = StringHelper.joinParameters(_.uniq(builderConstructorParametersData), 4, { startComma: true, start: 1 });

        const content = `using Microsoft.Extensions.DependencyInjection.Extensions;
using MotiNet.Entities;
using ${namespace};

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ${moduleCommonName}ServiceCollectionExtensions
    {
        public static ${moduleCommonName}Builder Add${moduleCommonName}${moduleGenericTypeParameters}(
            this IServiceCollection services)${moduleGenericTypeConstraints}
        {${entityServiceRegistrations}${moduleServiceRegistrations}
            return new ${moduleCommonName}Builder(
                services${builderConstructorParameters});
        }
    }
}
`;

        return content;
    }
}
