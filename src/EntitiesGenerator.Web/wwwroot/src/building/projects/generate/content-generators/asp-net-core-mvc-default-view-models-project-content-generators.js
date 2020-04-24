// AspNetCore.Mvc.DefaultViewModels

import 'prismjs/components/prism-csharp';
import ContentHelper, { IdentifierHelper, StringHelper } from '../content-helper';

import { CoreProjectSG, AspDvProjectSG } from '../structure-generators/structure-generators';
import {
    ModuleSpecificContentGenerator,
    CSharpModuleSpecificContentGenerator,
    CSharpEntitySpecificContentGenerator,
    ProjectFileGenerator
} from './content-generator';
import AllFeaturesGenerator from '../feature-generators/all-features-generator';
import AllRelationshipsGenerator from '../relationship-generators/all-relationships-generator';

export class AspDvProject_ProjectFileGenerator extends ProjectFileGenerator {
    generate() {
        const defaultNamespace = this.getProjectDefaultNamespaceIfRequired(AspDvProjectSG);
        const coreProjectName = CoreProjectSG.getProjectName(this.module);

        const content = `<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>netcoreapp3.1</TargetFramework>${defaultNamespace}
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="AutoMapper.Extensions.Microsoft.DependencyInjection" Version="7.0.0" />
    <PackageReference Include="MotiNet.ComponentModel.Annotations" Version="${ContentHelper.MotiNetCoreVersion}" />
    <PackageReference Include="MotiNet.Extensions.AutoMapper" Version="${ContentHelper.MotiNetCoreVersion}" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\\${coreProjectName}\\${coreProjectName}.csproj" />
  </ItemGroup>

  <ItemGroup>
    <Compile Update="DisplayNames.Designer.cs">
      <DesignTime>True</DesignTime>
      <AutoGen>True</AutoGen>
      <DependentUpon>DisplayNames.resx</DependentUpon>
    </Compile>
  </ItemGroup>

  <ItemGroup>
    <EmbeddedResource Update="DisplayNames.resx">
      <Generator>PublicResXFileCodeGenerator</Generator>
      <LastGenOutput>DisplayNames.Designer.cs</LastGenOutput>
    </EmbeddedResource>
  </ItemGroup>

</Project>
`;

        return content;
    }
}

export class AspDvProject_EntityViewModelsClassGenerator extends CSharpEntitySpecificContentGenerator {
    generate() {
        const namespace = AspDvProjectSG.getDefaultNamespace(this.item.module);
        const entityName = this.item.name;
        const basePropertyDeclarationsData = [];
        const fullPropertyDeclarationsData = [];

        for (const feature of this.features.allFeatures) {
            if (feature.itemHasFeature(this.item)) {
                feature.aspDv_EntityViewModelsClass_BasePropertyDeclarationsData(this.item, basePropertyDeclarationsData);
                feature.aspDv_EntityViewModelsClass_FullPropertyDeclarationsData(this.item, fullPropertyDeclarationsData);
            }

            feature.aspDv_EntityViewModelsClass_BasePropertyDeclarationsData_FromOthers(this.item, basePropertyDeclarationsData);
            feature.aspDv_EntityViewModelsClass_FullPropertyDeclarationsData_FromOthers(this.item, fullPropertyDeclarationsData);
        }

        for (const relationship of this.item.module.itemsRelationships) {
            if (this.relationships.itemHasRelationship(this.item, relationship)) {
                const generator = this.relationships.getGenerator(relationship);
                generator.aspDv_EntityViewModelsClass_BasePropertyDeclarationsData(this.item, relationship, basePropertyDeclarationsData);
                generator.aspDv_EntityViewModelsClass_FullPropertyDeclarationsData(this.item, relationship, fullPropertyDeclarationsData);
            }
        }

        const basePropertyDeclarations = StringHelper.joinLines(_.uniq(basePropertyDeclarationsData), 2, '\n', { start: 1, end: 1, endIndent: 1, spaceIfEmpty: true });
        const fullPropertyDeclarations = StringHelper.joinLines(_.uniq(fullPropertyDeclarationsData), 2, '\n', { start: 1, end: 1, endIndent: 1, spaceIfEmpty: true });

        const content = `using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ${namespace}
{
    // Base
    public abstract partial class ${entityName}ViewModelBase
    {${basePropertyDeclarations}}

    // Full
    public partial class ${entityName}ViewModel : ${entityName}ViewModelBase
    {${fullPropertyDeclarations}}

    // Lite
    public partial class ${entityName}LiteViewModel : ${entityName}ViewModelBase
    { }
}
`;

        return content;
    }
}

export class AspDvProject_SubEntityViewModelsClassGenerator extends CSharpEntitySpecificContentGenerator {
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
        const namespace = AspDvProjectSG.getDefaultNamespace(this.item.module);
        const subEntityName = this.subEntityName;
        const basePropertyDeclarationsData = [];
        const fullPropertyDeclarationsData = [];

        for (const feature of this.features.allFeatures) {
            if (feature.itemHasFeature(this.item)) {
                feature.aspDv_SubEntityViewModelsClass_BasePropertyDeclarationsData(this.item, subEntityName, basePropertyDeclarationsData);
                feature.aspDv_SubEntityViewModelsClass_FullPropertyDeclarationsData(this.item, subEntityName, fullPropertyDeclarationsData);
            }
        }

        const basePropertyDeclarations = StringHelper.joinLines(_.uniq(basePropertyDeclarationsData), 2, '\n', { start: 1, end: 1, endIndent: 1, spaceIfEmpty: true });
        const fullPropertyDeclarations = StringHelper.joinLines(_.uniq(fullPropertyDeclarationsData), 2, '\n', { start: 1, end: 1, endIndent: 1, spaceIfEmpty: true });

        const content = `using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ${namespace}
{
    // Base
    public abstract partial class ${subEntityName}ViewModelBase
    {${basePropertyDeclarations}}

    // Full
    public partial class ${subEntityName}ViewModel : ${subEntityName}ViewModelBase
    {${fullPropertyDeclarations}}

    // Lite
    public partial class ${subEntityName}LiteViewModel : ${subEntityName}ViewModelBase
    { }
}
`;

        return content;
    }
}

export class AspDvProject_DisplayNamesResxGenerator extends ModuleSpecificContentGenerator {
    get language() { return 'markup'; }

    generate() {
        const itemsData = [];

        for (const item of this.module.items) {
            for (const feature of this.features.allFeatures) {
                if (feature.itemHasFeature(item)) {
                    feature.aspDv_DisplayNamesResx_ItemsData(item, itemsData);
                }
            }

            for (const relationship of this.module.itemsRelationships) {
                if (this.relationships.itemHasRelationship(item, relationship)) {
                    const generator = this.relationships.getGenerator(relationship);
                    generator.aspDv_DisplayNamesResx_ItemsData(item, relationship, itemsData);
                }
            }
        }

        const items = StringHelper.joinLines(_.uniq(_.map(_.sortBy(itemsData, value => _.toLower(value.key)), 'content')), .5, '', { start: 1 });

        var content = ContentHelper.generateResourceFileContent(items);

        return content;
    }
}

export class AspDvProject_DisplayNamesResxDesignerClassGenerator extends ModuleSpecificContentGenerator {
    get language() { return 'markup'; }

    generate() {
        const namespace = AspDvProjectSG.getDefaultNamespace(this.module);
        const itemsData = [];

        for (const item of this.module.items) {
            for (const feature of this.features.allFeatures) {
                if (feature.itemHasFeature(item)) {
                    feature.aspDv_DisplayNamesResxDesignerClass_ItemsData(item, itemsData);
                }
            }

            for (const relationship of this.module.itemsRelationships) {
                if (this.relationships.itemHasRelationship(item, relationship)) {
                    const generator = this.relationships.getGenerator(relationship);
                    generator.aspDv_DisplayNamesResxDesignerClass_ItemsData(item, relationship, itemsData);
                }
            }
        }

        var items = StringHelper.joinLines(_.uniq(_.map(_.sortBy(itemsData, value => _.toLower(value.key)), 'content')), 2, '\n// Keep this space');

        // Visual Studio generates spaces on empty lines
        const regex = new RegExp(`^${_.repeat(' ', 8)}// Keep this space`, 'gm')
        items = items.replace(regex, _.repeat(' ', 8));
        items = '\n' + _.repeat(' ', 8) + '\n' + items;

        var content = ContentHelper.generateResourceFileDesignerClassContent(namespace, items);

        return content;
    }
}

export class AspDvProject_ProfileClassGenerator extends CSharpModuleSpecificContentGenerator {
    generate() {
        const namespace = AspDvProjectSG.getDefaultNamespace(this.module);
        const entities = this.features.moduleEntityNames(this.module);
        const moduleCommonName = IdentifierHelper.getModuleCommonName(this.module);
        const createEntityMapsData = [];

        for (const entity of entities) {
            const createEntityMapChainedMethodsData = [];

            for (const feature of this.features.allFeatures) {
                if (feature.itemHasFeature(entity.item)) {
                    feature.aspDv_ProfileClass_CreateEntityMapChainedMethodsData(entity.item, createEntityMapChainedMethodsData);
                }

                feature.aspDv_ProfileClass_CreateEntityMapChainedMethodsData_FromOthers(entity.item, createEntityMapChainedMethodsData);
            }

            for (const relationship of this.module.itemsRelationships) {
                if (this.relationships.itemHasRelationship(entity.item, relationship)) {
                    const generator = this.relationships.getGenerator(relationship);
                    generator.aspDv_ProfileClass_CreateEntityMapChainedMethodsData(entity.item, relationship, createEntityMapChainedMethodsData);
                }
            }

            const createEntityMapChainedMethods = StringHelper.joinLines(_.uniq(createEntityMapChainedMethodsData), 1, '', { start: 1 });

            createEntityMapsData.push(`CreateMap(builder.${entity.name}Type, typeof(${entity.name}ViewModel))${createEntityMapChainedMethods}
    .ReverseMap();
CreateMap(builder.${entity.name}Type, typeof(${entity.name}LiteViewModel));`);
        }

        const createEntityMaps = StringHelper.joinLines(createEntityMapsData, 3, '\n', { start: 1, end: 1 });

        const content = `using AutoMapper;
using MotiNet.AutoMapper;

namespace ${namespace}
{
    public partial class ${moduleCommonName}Profile : Profile
    {
        public ${moduleCommonName}Profile(${moduleCommonName}Builder builder)
        {${createEntityMaps}
            var internalMethod = GetType().GetMethod("ConstructorInternal",
                System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.NonPublic);

            if (internalMethod != null)
            {
                internalMethod.Invoke(this, new object[] { builder });
            }
        }
    }
}
`;

        return content;
    }
}

export class AspDvProject_DependencyInjectionClassGenerator extends CSharpModuleSpecificContentGenerator {
    generate() {
        const coreNamespace = CoreProjectSG.getDefaultNamespace(this.module);
        const namespace = AspDvProjectSG.getDefaultNamespace(this.module);
        const moduleCommonName = IdentifierHelper.getModuleCommonName(this.module);

        const content = `using AutoMapper;
using ${coreNamespace};
using ${namespace};
using System;
using System.Reflection;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class DefaultViewModels${moduleCommonName}BuilderExtensions
    {
        public static Profile GetDefaultViewModelsProfile(this ${moduleCommonName}Builder builder)
            => new ${moduleCommonName}Profile(builder);

        public static ${moduleCommonName}Builder AddDefaultViewModels(this ${moduleCommonName}Builder builder)
        {
            builder.Services.AddAutoMapper(config =>
            {
                config.AddProfile(builder.GetDefaultViewModelsProfile());
            }, Array.Empty<Assembly>());

            return builder;
        }
    }
}
`;

        return content;
    }
}
