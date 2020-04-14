// AspNetCore.Mvc.DefaultViewModels

import 'prismjs/components/prism-csharp';
import { IdentifierHelper } from '../content-helper';
import ContentHelper from '../content-helper';

import * as SG from '../structure-generators/structure-generators';
import { ModuleSpecificContentGenerator, CSharpModuleSpecificContentGenerator, CSharpEntitySpecificContentGenerator, ProjectFileGenerator } from './content-generator';

export class AspDvProject_ProjectFileGenerator extends ProjectFileGenerator {
    generate() {
        const defaultNamespace = this.getProjectDefaultNamespaceIfRequired(SG.AspDvProjectSG);
        const coreProjectName = SG.CoreProjectSG.getProjectName(this.module);

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
        const namespace = ContentHelper.get_CoreProject_Namespace(this.item.module);
        const entityName = this.item.name;

        const content = `using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ${namespace}.Mvc
{
    // Base
    public abstract class ${entityName}ViewModelBase
    {
        public ${entityName}ViewModelBase() => Id = Guid.NewGuid().ToString();

        public string Id { get; set; }
    }

    // Full
    public class ${entityName}ViewModel : ${entityName}ViewModelBase { }

    // Lite
    public class ${entityName}LiteViewModel : ${entityName}ViewModelBase { }
}
`;

        return content;
    }
}

export class AspDvProject_SubEntityViewModelsClassGenerator extends CSharpEntitySpecificContentGenerator {
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
        const content = '//';

        return content;
    }
}

export class AspDvProject_DisplayNamesResxGenerator extends ModuleSpecificContentGenerator {
    get language() { return 'markup'; }

    generate() {
        const items = '';

        var content = ContentHelper.generateResourceFileContent(items);

        return content;
    }
}

export class AspDvProject_ProfileClassGenerator extends CSharpModuleSpecificContentGenerator {
    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.module);
        const moduleCommonName = IdentifierHelper.getModuleCommonName(this.module);

        var registrations = '';
        for (const item of this.module.items) {
            const entityName = item.name;

            registrations += `
            CreateMap(builder.${entityName}Type, typeof(${entityName}ViewModel))
                .ReverseMap();
            CreateMap(builder.${entityName}Type, typeof(${entityName}LiteViewModel));
`;
        }

        if (this.module.items.length > 0) {
            registrations = registrations.substr(0, registrations.length - 1);
        }

        const content = `using AutoMapper;
using MotiNet.AutoMapper;

namespace ${namespace}.Mvc
{
    public class ${moduleCommonName}Profile : Profile
    {
        public ${moduleCommonName}Profile(${moduleCommonName}Builder builder)
        {${registrations}
        }
    }
}
`;

        return content;
    }
}

export class AspDvProject_DependencyInjectionClassGenerator extends CSharpModuleSpecificContentGenerator {
    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.module);
        const moduleCommonName = IdentifierHelper.getModuleCommonName(this.module);

        const content = `using AutoMapper;
using ${namespace};
using ${namespace}.Mvc;
using System;
using System.Reflection;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class DefaultViewModels${moduleCommonName}BuilderExtensions
    {
        public static ${moduleCommonName}Profile GetDefaultViewModelsProfile(this ${moduleCommonName}Builder builder)
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
