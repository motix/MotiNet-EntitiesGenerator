// SealedModels

import 'prismjs/components/prism-csharp';
import ContentHelper, { IdentifierHelper, StringHelper } from '../content-helper';

import { CoreProjectSG, SmProjectSG } from '../structure-generators/structure-generators';
import {
    CSharpModuleSpecificContentGenerator,
    CSharpEntitySpecificContentGenerator,
    ProjectFileGenerator
} from './content-generator';
import AllFeaturesGenerator from '../feature-generators/all-features-generator';
import AllRelationshipsGenerator from '../relationship-generators/all-relationships-generator';

export class SmProject_ProjectFileGenerator extends ProjectFileGenerator {
    generate() {
        const defaultNamespace = this.getProjectDefaultNamespaceIfRequired(SmProjectSG);
        const coreProjectName = CoreProjectSG.getProjectName(this.module);

        const content = `<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>netstandard2.1</TargetFramework>${defaultNamespace}
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="MotiNet.ComponentModel.Annotations" Version="${ContentHelper.MotiNetCoreVersion}" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\\${coreProjectName}\\${coreProjectName}.csproj" />
  </ItemGroup>

</Project>
`;

        return content;
    }
}

export class SmProject_EntityClassGenerator extends CSharpEntitySpecificContentGenerator {
    generate() {
        const namespace = SmProjectSG.getDefaultNamespace(this.item.module);
        const entityName = this.item.name;
        const classModifier = this.item.abstractModel ? 'abstract' : 'sealed';
        const entityInterfacesData = [];
        const entityPropertyDeclarationsData = [];
        const relationshipsPropertyDeclarationsData = [];
        const customizationFieldDeclarationsData = [];
        const customizationPropertyDeclarationsData = [];

        for (const feature of this.features.allFeatures) {
            if (feature.itemHasFeature(this.item)) {
                feature.sm_EntityClass_EntityInterfacesData(this.item, entityInterfacesData);
                feature.sm_EntityClass_EntityPropertyDeclarationsData(this.item, entityPropertyDeclarationsData);
                feature.sm_EntityClass_RelationshipsPropertyDeclarationsData(this.item, relationshipsPropertyDeclarationsData);
                feature.sm_EntityClass_CustomizationFieldDeclarationsData(this.item, customizationFieldDeclarationsData);
                feature.sm_EntityClass_CustomizationPropertyDeclarationsData(this.item, customizationPropertyDeclarationsData);
            }

            feature.sm_EntityClass_EntityInterfacesData_FromOthers(this.item, entityInterfacesData);
            feature.sm_EntityClass_EntityPropertyDeclarationsData_FromOthers(this.item, entityPropertyDeclarationsData);
            feature.sm_EntityClass_RelationshipsPropertyDeclarationsData_FromOthers(this.item, relationshipsPropertyDeclarationsData);
            feature.sm_EntityClass_CustomizationFieldDeclarationsData_FromOthers(this.item, customizationFieldDeclarationsData);
            feature.sm_EntityClass_CustomizationPropertyDeclarationsData_FromOthers(this.item, customizationPropertyDeclarationsData);
        }

        for (const relationship of this.item.module.itemsRelationships) {
            if (this.relationships.itemHasRelationship(this.item, relationship)) {
                const generator = this.relationships.getGenerator(relationship);
                generator.sm_EntityClass_EntityPropertyDeclarationsData(this.item, relationship, entityPropertyDeclarationsData);
                generator.sm_EntityClass_RelationshipsPropertyDeclarationsData(this.item, relationship, relationshipsPropertyDeclarationsData);
                generator.sm_EntityClass_CustomizationFieldDeclarationsData(this.item, relationship, customizationFieldDeclarationsData);
                generator.sm_EntityClass_CustomizationPropertyDeclarationsData(this.item, relationship, customizationPropertyDeclarationsData);
            }
        }

        const entityInterfaces = StringHelper.generateBaseBlock(_.uniq(entityInterfacesData), 2, { start: 1 });
        const entityPropertyDeclarations = StringHelper.joinLines(_.uniq(entityPropertyDeclarationsData), 2, '\n', { start: 1, end: 1, endIndent: 1, spaceIfEmpty: true });
        const relationshipsPropertyDeclarations = StringHelper.joinLines(_.uniq(relationshipsPropertyDeclarationsData), 2, '\n', { start: 1, end: 1, endIndent: 1, spaceIfEmpty: true });
        const customizationBodyDeclarations = StringHelper.joinLines(_.uniq(customizationFieldDeclarationsData).concat(_.uniq(customizationPropertyDeclarationsData)),
            2, '\n', { start: 1, end: 1, endIndent: 1, spaceIfEmpty: true });

        const relationshipsPartial = relationshipsPropertyDeclarationsData.length === 0 ? '' : `

    // Relationships
    partial class ${entityName}
    {${relationshipsPropertyDeclarations}}`;

        const customizationPartial = customizationPropertyDeclarationsData.length === 0 ? '' : `

    // Customization
    partial class ${entityName}
    {${customizationBodyDeclarations}}`;

        const content = `using MotiNet.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace ${namespace}
{
    // Entity
    public ${classModifier} partial class ${entityName}${entityInterfaces}
    {${entityPropertyDeclarations}}${relationshipsPartial}${customizationPartial}
}
`;

        return content;
    }
}

export class SmProject_SubEntityClassGenerator extends CSharpEntitySpecificContentGenerator {
    /**
     * @param {AllFeaturesGenerator} features
     * @param {AllRelationshipsGenerator} relationships
     * @param {Item} item
     * @param {string} subEntityName
     */
    constructor(features, relationships, item, subEntityName) {
        super(features, relationships, item);

        this.subEntityName = subEntityName;
    }

    generate() {
        const namespace = SmProjectSG.getDefaultNamespace(this.item.module);
        const subEntityName = this.subEntityName;
        const entityInterfacesData = [];
        const entityPropertyDeclarationsData = [];
        const relationshipsPropertyDeclarationsData = [];
        const customizationFieldDeclarationsData = [];
        const customizationPropertyDeclarationsData = [];

        for (const feature of this.features.allFeatures) {
            if (feature.itemHasFeature(this.item)) {
                feature.sm_SubEntityClass_EntityInterfacesData(this.item, this.subEntityName, entityInterfacesData);
                feature.sm_SubEntityClass_EntityPropertyDeclarationsData(this.item, this.subEntityName, entityPropertyDeclarationsData);
                feature.sm_SubEntityClass_RelationshipsPropertyDeclarationsData(this.item, this.subEntityName, relationshipsPropertyDeclarationsData);
                feature.sm_SubEntityClass_CustomizationFieldDeclarationsData(this.item, this.subEntityName, customizationFieldDeclarationsData);
                feature.sm_SubEntityClass_CustomizationPropertyDeclarationsData(this.item, this.subEntityName, customizationPropertyDeclarationsData);
            }
        }

        const entityInterfaces = StringHelper.generateBaseBlock(_.uniq(entityInterfacesData), 2, { start: 1 });
        const entityPropertyDeclarations = StringHelper.joinLines(_.uniq(entityPropertyDeclarationsData), 2, '\n', { start: 1, end: 1, endIndent: 1, spaceIfEmpty: true });
        const relationshipsPropertyDeclarations = StringHelper.joinLines(_.uniq(relationshipsPropertyDeclarationsData), 2, '\n', { start: 1, end: 1, endIndent: 1, spaceIfEmpty: true });
        const customizationBodyDeclarations = StringHelper.joinLines(_.uniq(customizationFieldDeclarationsData).concat(_.uniq(customizationPropertyDeclarationsData)),
            2, '\n', { start: 1, end: 1, endIndent: 1, spaceIfEmpty: true });

        const relationshipsPartial = relationshipsPropertyDeclarationsData.length === 0 ? '' : `

    // Relationships
    partial class ${subEntityName}
    {${relationshipsPropertyDeclarations}}`;

        const customizationPartial = customizationPropertyDeclarationsData.length === 0 ? '' : `

    // Customization
    partial class ${subEntityName}
    {${customizationBodyDeclarations}}`;

        const content = `using MotiNet.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace ${namespace}
{
    // Entity
    public sealed partial class ${subEntityName}${entityInterfaces}
    {${entityPropertyDeclarations}}${relationshipsPartial}${customizationPartial}
}
`;

        return content;
    }
}

export class SmProject_EntityAccessorClassGenerator extends CSharpEntitySpecificContentGenerator {
    generate() {
        const namespace = SmProjectSG.getDefaultNamespace(this.item.module);
        const entityName = this.item.name;
        const entitySpecificTypeParameters = this.features.itemSpecificTypeParameters(this.item);
        const accessorMethodsData = [];

        for (const feature of this.features.allFeatures) {
            if (feature.itemHasFeature(this.item)) {
                feature.sm_EntityAccessorClass_AccessorMethodsData(this.item, accessorMethodsData);
            }

            feature.sm_EntityAccessorClass_AccessorMethodsData_FromOthers(this.item, accessorMethodsData);
        }

        const accessorMethods = StringHelper.joinLines(_.uniq(accessorMethodsData), 2, '\n', { start: 1, end: 1, endIndent: 1, spaceIfEmpty: true });

        const content = `using System;

namespace ${namespace}
{
    public class ${entityName}Accessor : I${entityName}Accessor${entitySpecificTypeParameters}
    {${accessorMethods}}
}
`;

        return content;
    }
}

export class SmProject_DependencyInjectionClassGenerator extends CSharpModuleSpecificContentGenerator {
    generate() {
        const namespace = SmProjectSG.getDefaultNamespace(this.module);
        const moduleCommonName = IdentifierHelper.getModuleCommonName(this.module);
        const moduleSpecificTypeParameters = this.features.moduleSpecificTypeParameters(this.module,
            `=> services.Add${moduleCommonName}`.length / 4 + 1);
        const serviceRegistrationsData = [];

        for (const item of this.module.items) {
            const entityName = item.name;
            const entityEmptyGenericTypeParameters = this.features.itemEmptyGenericTypeParameters(item);
            const entityMakeGenericTypeParameters = this.features.itemMakeGenericTypeParameters(item);

            serviceRegistrationsData.push(
                `services.TryAddScoped(
    typeof(I${entityName}Accessor${entityEmptyGenericTypeParameters}).MakeGenericType(${entityMakeGenericTypeParameters}),
    typeof(${entityName}Accessor));`);

            for (const feature of this.features.allFeatures) {
                if (feature.itemHasFeature(item)) {
                    feature.sm_DependencyInjectionClass_ServiceRegistrationsData(item, serviceRegistrationsData);
                }
            }
        }

        const serviceRegistrations = StringHelper.joinLines(_.uniq(serviceRegistrationsData), 3, '\n', { start: 1, end: 1 });

        var body;

        if (this.module.hasCoreOptions === true) {
            body = `public static ${moduleCommonName}Builder Add${moduleCommonName}WithSealedModels(this IServiceCollection services)
    => services.Add${moduleCommonName}WithSealedModels(setupAction: null);

public static ${moduleCommonName}Builder Add${moduleCommonName}WithSealedModels(this IServiceCollection services, Action<${moduleCommonName}Options> setupAction)
    => services.Add${moduleCommonName}${moduleSpecificTypeParameters}(setupAction)
               .AddSealedModels();`;
        } else {
            body = `public static ${moduleCommonName}Builder Add${moduleCommonName}WithSealedModels(this IServiceCollection services)
    => services.Add${moduleCommonName}${moduleSpecificTypeParameters}()
               .AddSealedModels();`;
        }

        body = StringHelper.indent(body, 2);

        const content = `using ${namespace};
using Microsoft.Extensions.DependencyInjection.Extensions;
using System;

namespace Microsoft.Extensions.DependencyInjection
{
    public static partial class SealedModels${moduleCommonName}BuilderExtensions
    {
${body}

        public static ${moduleCommonName}Builder AddSealedModels(this ${moduleCommonName}Builder builder)
        {
            var services = builder.Services;
${serviceRegistrations}
            var internalMethod = typeof(SealedModels${moduleCommonName}BuilderExtensions).GetMethod("AddSealedModelsInternal",
                System.Reflection.BindingFlags.Static | System.Reflection.BindingFlags.NonPublic);

            if (internalMethod != null)
            {
                internalMethod.Invoke(null, new object[] { builder });
            }

            return builder;
        }
    }
}
`;

        return content;
    }
}
