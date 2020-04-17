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
        const customizationsPropertyDeclarationsData = [];

        for (const feature of this.features.allFeatures) {
            if (feature.itemHasFeature(this.item)) {
                feature.sm_EntityClass_EntityInterfacesData(this.item, entityInterfacesData);
                feature.sm_EntityClass_EntityPropertyDeclarationsData(this.item, entityPropertyDeclarationsData);
                feature.sm_EntityClass_RelationshipsPropertyDeclarationsData(this.item, relationshipsPropertyDeclarationsData);
                feature.sm_EntityClass_CustomizationsPropertyDeclarationsData(this.item, customizationsPropertyDeclarationsData);
            }

            feature.sm_EntityClass_EntityInterfacesData_FromOthers(this.item, entityInterfacesData);
            feature.sm_EntityClass_EntityPropertyDeclarationsData_FromOthers(this.item, entityPropertyDeclarationsData);
            feature.sm_EntityClass_RelationshipsPropertyDeclarationsData_FromOthers(this.item, relationshipsPropertyDeclarationsData);
            feature.sm_EntityClass_CustomizationsPropertyDeclarationsData_FromOthers(this.item, customizationsPropertyDeclarationsData);
        }

        const entityInterfaces = StringHelper.generateBaseBlock(_.uniq(entityInterfacesData), 2, { start: 1 });
        const entityPropertyDeclarations = StringHelper.joinLines(_.uniq(entityPropertyDeclarationsData), 2, '\n', { start: 1, end: 1, endIndent: 1, spaceIfEmpty: true });
        const relationshipsPropertyDeclarations = StringHelper.joinLines(_.uniq(relationshipsPropertyDeclarationsData), 2, '\n', { start: 1, end: 1, endIndent: 1, spaceIfEmpty: true });
        const customizationsPropertyDeclarations = StringHelper.joinLines(_.uniq(customizationsPropertyDeclarationsData), 2, '\n', { start: 1, end: 1, endIndent: 1, spaceIfEmpty: true });

        const relationshipsPartial = relationshipsPropertyDeclarationsData.length === 0 ? '' : `

    // Relationships
    partial class ${entityName}
    {${relationshipsPropertyDeclarations}}`;

        const customizationsPartial = customizationsPropertyDeclarationsData.length === 0 ? '' : `

    // Customizations
    partial class ${entityName}
    {${customizationsPropertyDeclarations}}`;

        const content = `using MotiNet.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace ${namespace}
{
    // Entity
    public ${classModifier} partial class ${entityName}${entityInterfaces}
    {${entityPropertyDeclarations}}${relationshipsPartial}${customizationsPartial}
}
`;

        return content;
    }
}

export class SmProject_SubEntityClassGenerator extends CSharpEntitySpecificContentGenerator {
    /**
     * @param {AllFeaturesGenerator} features
     * @param {Item} item
     * @param {string} subEntityName
     */
    constructor(features, item, subEntityName) {
        super(features, item);

        this.subEntityName = subEntityName;
    }

    generate() {
        const namespace = SmProjectSG.getDefaultNamespace(this.item.module);
        const subEntityName = this.subEntityName;
        const entityInterfacesData = [];
        const entityPropertyDeclarationsData = [];
        const relationshipsPropertyDeclarationsData = [];

        for (const feature of this.features.allFeatures) {
            feature.sm_SubEntityClass_EntityInterfacesData_FromOthers(this.item, this.subEntityName, entityInterfacesData);
            feature.sm_SubEntityClass_EntityPropertyDeclarationsData_FromOthers(this.item, this.subEntityName, entityPropertyDeclarationsData);
            feature.sm_SubEntityClass_RelationshipsPropertyDeclarationsData_FromOthers(this.item, this.subEntityName, relationshipsPropertyDeclarationsData);
        }

        const entityInterfaces = StringHelper.generateBaseBlock(_.uniq(entityInterfacesData), 2, { start: 1 });
        const entityPropertyDeclarations = StringHelper.joinLines(_.uniq(entityPropertyDeclarationsData), 2, '\n', { start: 1, end: 1, endIndent: 1, spaceIfEmpty: true });
        const relationshipsPropertyDeclarations = StringHelper.joinLines(_.uniq(relationshipsPropertyDeclarationsData), 2, '\n', { start: 1, end: 1, endIndent: 1, spaceIfEmpty: true });

        const relationshipsPartial = relationshipsPropertyDeclarationsData.length === 0 ? '' : `

    // Relationships
    partial class ${subEntityName}
    {${relationshipsPropertyDeclarations}}`;

        const content = `using MotiNet.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ${namespace}
{
    // Entity
    public sealed partial class ${subEntityName}${entityInterfaces}
    {${entityPropertyDeclarations}}${relationshipsPartial}
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
            `=> services.Add${moduleCommonName}`.length / 4 + 3);
        const serviceRegistrationsData = [];

        for (const item of this.module.items) {
            const entityName = item.name;
            const entityEmptyGenericTypeParameters = this.features.itemEmptyGenericTypeParameters(item);
            const entityMakeGenericTypeParameters = this.features.itemMakeGenericTypeParameters(item);

            serviceRegistrationsData.push(
                `services.TryAddScoped(
    typeof(I${entityName}Accessor${entityEmptyGenericTypeParameters}).MakeGenericType(${entityMakeGenericTypeParameters}),
    typeof(${entityName}Accessor));`);
        }

        const serviceRegistrations = StringHelper.joinLines(_.uniq(serviceRegistrationsData), 3, '\n', { start: 1, end: 1 });

        const content = `using ${namespace};
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Microsoft.Extensions.DependencyInjection
{
    public static partial class SealedModels${moduleCommonName}BuilderExtensions
    {
        public static ${moduleCommonName}Builder Add${moduleCommonName}WithSealedModels(this IServiceCollection services)
            => services.Add${moduleCommonName}${moduleSpecificTypeParameters}()
                       .AddSealedModels();

        public static ${moduleCommonName}Builder AddSealedModels(this ${moduleCommonName}Builder builder)
        {
            var services = builder.Services;
${serviceRegistrations}
            return builder;
        }
    }
}
`;

        return content;
    }
}
