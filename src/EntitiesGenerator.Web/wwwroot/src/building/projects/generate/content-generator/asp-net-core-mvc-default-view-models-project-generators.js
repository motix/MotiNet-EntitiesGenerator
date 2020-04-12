import 'prismjs/components/prism-csharp';
import ContentHelper from '../content-helper';

import { ContentGenerator, CSharpContentGenerator, ProjectFileGenerator } from './content-generator';

export class AspNetCoreMvcDefaultViewModelsProject_ProjectFileGenerator extends ProjectFileGenerator {
    generate() {
        const moduleNamespace = ContentHelper.getModuleNamespace(this.module);
        const coreProjectName = ContentHelper.get_CoreProject_Name(this.module);

        var content = `<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>netcoreapp3.1</TargetFramework>
    <RootNamespace>${moduleNamespace}.Mvc</RootNamespace>
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

export class AspNetCoreMvcDefaultViewModelsProject_EntityViewModelsClassGenerator extends CSharpContentGenerator {
    constructor(item) {
        super();

        this.item = item;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.item.module);
        const entityName = this.item.name;

        var content = `using System;
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

export class AspNetCoreMvcDefaultViewModelsProject_DisplayNamesResxGenerator extends ContentGenerator {
    constructor(module) {
        super();

        this.module = module;
    }

    get language() { return 'markup'; }

    generate() {
        const items = '';

        var content = ContentHelper.generateResourceFileContent(items);

        return content;
    }
}

export class AspNetCoreMvcDefaultViewModelsProject_ProfileClassGenerator extends CSharpContentGenerator {
    constructor(module) {
        super();

        this.module = module;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.module);
        const moduleName = ContentHelper.getModuleName(this.module);

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

        var content = `using AutoMapper;
using MotiNet.AutoMapper;

namespace ${namespace}.Mvc
{
    public class ${moduleName}Profile : Profile
    {
        public ${moduleName}Profile(${moduleName}Builder builder)
        {${registrations}
        }
    }
}
`;

        return content;
    }
}

export class AspNetCoreMvcDefaultViewModelsProject_DependencyInjectionClassGenerator extends CSharpContentGenerator {
    constructor(module) {
        super();

        this.module = module;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.module);
        const moduleName = ContentHelper.getModuleName(this.module);

        var content = `using AutoMapper;
using ${namespace};
using ${namespace}.Mvc;
using System;
using System.Reflection;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class DefaultViewModels${moduleName}BuilderExtensions
    {
        public static ${moduleName}Profile GetDefaultViewModelsProfile(this ${moduleName}Builder builder)
            => new ${moduleName}Profile(builder);

        public static ${moduleName}Builder AddDefaultViewModels(this ${moduleName}Builder builder)
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
