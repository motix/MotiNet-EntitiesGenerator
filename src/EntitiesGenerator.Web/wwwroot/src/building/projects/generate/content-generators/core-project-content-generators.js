// Core

import 'prismjs/components/prism-csharp';
import { IdentifierHelper, StringHelper } from '../content-helper';
import ContentHelper from '../content-helper';

import * as SG from '../structure-generators/structure-generators';
import { ModuleSpecificContentGenerator, CSharpModuleSpecificContentGenerator, CSharpEntitySpecificContentGenerator, ProjectFileGenerator } from './content-generator';

export class CoreProject_ProjectFileGenerator extends ProjectFileGenerator {
    generate() {
        const defaultNamespace = this.getProjectDefaultNamespaceIfRequired(SG.CoreProjectSG);

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
        const namespace = SG.CoreProjectSG.getDefaultNamespace(this.item.module);
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

        const featuresComment = this.generateFeatureComments(featuresCommentData);
        const managerInterfaces = StringHelper.generateBaseBlock(managerInterfacesData, 2, { start: 1 });

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
        const namespace = SG.CoreProjectSG.getDefaultNamespace(this.item.module);
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
            StringHelper.generateBaseBlock(storeInterfacesData, 2, { start: 1 });

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
        const namespace = SG.CoreProjectSG.getDefaultNamespace(this.item.module);
        const entityName = this.item.name;
        const entityGenericTypeParameters = this.features.itemGenericTypeParameters(this.item);
        const entityGenericTypeConstraints = this.features.itemGenericTypeConstraints(this.item, 2);
        const accessorInterfacesData = [];

        for (const feature of this.features.allFeatures) {
            if (feature.itemHasFeature(this.item)) {
                feature.core_EntityAccessorInterface_AccessorInterfacesData(this.item, accessorInterfacesData);
            }
        }

        const accessorInterfaces = StringHelper.generateBaseBlock(accessorInterfacesData, 2, { start: 1 });

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
        const namespace = SG.CoreProjectSG.getDefaultNamespace(this.item.module);
        const entityName = this.item.name;
        const entityGenericTypeParameters = this.features.itemGenericTypeParameters(this.item);
        const entityGenericTypeConstraints = this.features.itemGenericTypeConstraints(this.item, 2);
        const constructorParametersData = [];
        const baseConstructorParametersData = [];
        const propertiesAssignmentsData = [];
        const propertiesDeclarations1Data = [];
        const propertiesDeclarations2Data = [];

        constructorParametersData.push(
            `I${entityName}Store${entityGenericTypeParameters} store`,
            `I${entityName}Accessor${entityGenericTypeParameters} accessor`
        );
        baseConstructorParametersData.push('store', 'accessor');

        if (this.features.itemValidationRequired(this.item)) {
            constructorParametersData.push(`IEnumerable<IValidator${entityGenericTypeParameters}> validators`);
            baseConstructorParametersData.push('validators');
        } else {
            baseConstructorParametersData.push('null');
        }

        constructorParametersData.push(`ILogger<${entityName}Manager${entityGenericTypeParameters}> logger`);
        baseConstructorParametersData.push('logger');

        for (const feature of this.features.allFeatures) {
            if (feature.itemHasFeature(this.item)) {
                feature.core_EntityManagerClass_ConstructorParametersData(this.item, constructorParametersData);
                feature.core_EntityManagerClass_PropertiesAssignmentsData(this.item, propertiesAssignmentsData);
                feature.core_EntityManagerClass_PropertiesDeclarations1Data(this.item, propertiesDeclarations1Data);
                feature.core_EntityManagerClass_PropertiesDeclarations2Data(this.item, propertiesDeclarations2Data);
            }
        }

        propertiesDeclarations1Data.push(`public I${entityName}Store${entityGenericTypeParameters} ${entityName}Store => Store as I${entityName}Store${entityGenericTypeParameters};`);
        propertiesDeclarations1Data.push(`public I${entityName}Accessor${entityGenericTypeParameters} ${entityName}Accessor => Accessor as I${entityName}Accessor${entityGenericTypeParameters};`);

        const constructorParameters = StringHelper.joinLines(_.uniq(constructorParametersData), 3, ',', { start: 1 });
        const baseConstructorParameters = baseConstructorParametersData.join(', ');
        const propertiesAssignments = StringHelper.joinLines(_.uniq(propertiesAssignmentsData), 3, '', { start: 1, end: 1, endIndent: 2, spaceIfEmpty: true });
        const propertiesDeclarations1 = StringHelper.joinLines(propertiesDeclarations1Data, 2, '\n', { start: 2 });
        const propertiesDeclarations2 = StringHelper.joinLines(_.uniq(propertiesDeclarations2Data), 2, '\n', { start: 2 });

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
        {${propertiesAssignments}}${propertiesDeclarations1}${propertiesDeclarations2}
    }
}
`;

        return content;
    }
}

export class CoreProject_EntityValidatorClassGenerator extends CSharpEntitySpecificContentGenerator {
    generate() {
        const namespace = SG.CoreProjectSG.getDefaultNamespace(this.item.module);
        const moduleCommonName = IdentifierHelper.getModuleCommonName(this.item.module);
        const entityName = this.item.name;
        const lowerFirstEntityName = _.lowerFirst(entityName);
        const entityGenericTypeParameters = this.features.itemGenericTypeParameters(this.item);
        const entityGenericTypeConstraints = this.features.itemGenericTypeConstraints(this.item, 2);
        const validationsData = [];
        const subEntityValidationsData = [];

        for (const feature of this.features.allFeatures) {
            if (feature.itemHasFeature(this.item)) {
                feature.core_EntityValidatorClass_ValidationsData(this.item, validationsData);
                feature.core_EntityValidatorClass_SubEntityValidationsData(this.item, subEntityValidationsData);
            }
        }

        const validations = StringHelper.joinLines(_.uniq(validationsData), 3, '\n', { start: 2 });
        const subEntityValidations = StringHelper.joinLines(subEntityValidationsData, 2, '\n', { start: 2 });

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
        }${subEntityValidations}
    }
}
`;

        return content;
    }
}

export class CoreProject_ErrorDescriberClassGenerator extends CSharpModuleSpecificContentGenerator {
    generate() {
        const namespace = SG.CoreProjectSG.getDefaultNamespace(this.module);
        const moduleCommonName = IdentifierHelper.getModuleCommonName(this.module);
        const describersData = [];

        for (const item of this.module.items) {
            const itemDescribersData = [];

            for (const feature of this.features.allFeatures) {
                if (feature.itemHasFeature(item)) {
                    feature.core_ErrorDescriberClass_DescribersData(item, itemDescribersData);
                }
            }

            if (itemDescribersData.length > 0) {
                const entityName = item.name;

                describersData.push(
                    `#region ${entityName}`,
                    ...itemDescribersData,
                    `#endregion ${entityName}`
                )
            }
        }

        const describers = StringHelper.joinLines(_.uniq(describersData), 2, '\n', { start: 2 });

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

        #endregion${describers}
    }
}
`;

        return content;
    }
}

export class CoreProject_ErrorDescriberResourcesClassGenerator extends CSharpModuleSpecificContentGenerator {
    generate() {
        const namespace = SG.CoreProjectSG.getDefaultNamespace(this.module);
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
                    feature.core_ErrorDescriberResourcesClass_ItemsData(item, itemsData);
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
        const namespace = SG.CoreProjectSG.getDefaultNamespace(this.module);
        const moduleCommonName = IdentifierHelper.getModuleCommonName(this.module);
        const constructorParametersData = [];
        const constructBuilderParametersData = [];
        const propertiesDeclarationsData = [];

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

            propertiesDeclarationsData.push(`public Type ${entityName}Type { get; private set; }`);

            for (const feature of this.features.allFeatures) {
                if (feature.itemHasFeature(item)) {
                    feature.core_BuilderClass_ConstructorParametersData(item, constructorParametersData);
                    feature.core_BuilderClass_ConstructBuilderParametersData(item, constructBuilderParametersData);
                    feature.core_BuilderClass_PropertiesDeclarationsData(item, propertiesDeclarationsData);
                }
            }
        }

        const constructorParameters = StringHelper.joinParameters(_.uniqBy(constructorParametersData, value => value.text),
            3, { startComma: true, start: 1 });
        const constructBuilderParameters = StringHelper.joinParameters(_.uniqBy(constructBuilderParametersData, value => value.text),
            4, { startComma: true, start: 1 });
        const propertiesDeclarations = StringHelper.joinLines(_.uniq(propertiesDeclarationsData),
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
                services${constructBuilderParameters});${propertiesDeclarations}
    }
}
`;

        return content;
    }
}

export class CoreProject_DependencyInjectionClassGenerator extends CSharpModuleSpecificContentGenerator {
    generate() {
        const namespace = SG.CoreProjectSG.getDefaultNamespace(this.module);
        const moduleCommonName = IdentifierHelper.getModuleCommonName(this.module);
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
                    `services.TryAddScoped<IValidator<T${entityName}>, ${entityName}Validator${entityGenericTypeParameters}>();`);
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

        var indent;

        indent = `public static ${moduleCommonName}Builder Add${moduleCommonName}`.length / 4 + 2;
        const moduleGenericTypeParameters = this.features.moduleGenericTypeParameters(this.module, indent);
        const moduleGenericTypeConstraints = this.features.moduleGenericTypeConstraints(this.module, 3, { start: 1 });
        const entityServiceRegistrations = StringHelper.joinLines(_.uniq(entityServiceRegistrationsData), 3, '', { start: 1 });
        const moduleServiceRegistrations = StringHelper.joinLines(_.uniq(moduleServiceRegistrationsData), 3, '', { start: 1, end: 1 });
        const builderConstructorParameters = StringHelper.joinParameters(builderConstructorParametersData, 4, { startComma: true, start: 1 });

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
