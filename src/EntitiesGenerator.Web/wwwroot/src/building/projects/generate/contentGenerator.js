import ContentHelper from './contentHelper';

export class ContentGenerator {
    get language() { return ''; }

    generate() { }
}

import 'prismjs/components/prism-solution-file';
export class SolutionFileGenerator extends ContentGenerator {
    constructor(project) {
        super();

        this.project = project;
    }

    get language() { return 'solution-file' }

    generate() {
        const solutionFolderTypeGuid = '2150E333-8FDC-42A3-9474-1A3956D46DE8';
        const projectWithoutOwnNamespaceTypeGuid = '9A19103F-16F7-4668-BE54-9A1E7A4F7556'
        const projectWithOwnNamespaceTypeGuid = 'FAE04EC0-301F-11D3-BF4B-00C04F79EFBC';

        const srcFolderGuid = ContentHelper.newGuid();
        const moduleFolderGuids = {};
        for (const module of this.project.modules) {
            if (module.hasOwnNamespace) {
                moduleFolderGuids[module.name] = ContentHelper.newGuid();
            }
        }

        var foldersSection = `
Project("{${solutionFolderTypeGuid}}") = "src", "src", "{${srcFolderGuid}}"
EndProject
`;
        for (const moduleName in moduleFolderGuids) {
            foldersSection += `
Project("{${solutionFolderTypeGuid}}") = "${moduleName}", "${moduleName}", "{${moduleFolderGuids[moduleName]}}"
EndProject
`;
        }

        const sections = {
            projectsSection: '',
            projectsNestingSection: ''
        }
        for (const module of this.project.modules) {
            if (module.hasOwnNamespace) {
                sections.projectsNestingSection += `
		{${moduleFolderGuids[module.name]}} = {${srcFolderGuid}}
`;
            }

            writeProject(module, ContentHelper.get_CoreProject_Name(module), sections);
            writeProject(module, ContentHelper.get_SealedModelsProject_Name(module), sections);
            writeProject(module, ContentHelper.get_EntityFrameworkCoreProject_Name(module), sections);
            writeProject(module, ContentHelper.get_EntityFrameworkCoreSealedModelsProject_Name(module), sections);
            writeProject(module, ContentHelper.get_AspNetCoreProject_Name(module), sections);
            writeProject(module, ContentHelper.get_AspNetCoreMvcDefaultViewModelsProject_Name(module), sections);
        }

        var content = `
Microsoft Visual Studio Solution File, Format Version 12.00
# Visual Studio Version 16
VisualStudioVersion = 16.0.28606.126
MinimumVisualStudioVersion = 10.0.40219.1
${foldersSection}
Project("{${solutionFolderTypeGuid}}") = "Solution Items", "Solution Items", "{${ContentHelper.newGuid()}}"
	ProjectSection(SolutionItems) = preProject
		NuGet.config = NuGet.config
		README.md = README.md
	EndProjectSection
EndProject
${sections.projectsSection}
Global
	GlobalSection(NestedProjects) = preSolution
${sections.projectsNestingSection}
	EndGlobalSection
EndGlobal
`;

        content = ContentHelper.cleanContent(content);

        return content;

        function writeProject(module, projectName, sections) {
            const projectTypeGuid = module.hasOwnNamespace ? projectWithOwnNamespaceTypeGuid : projectWithoutOwnNamespaceTypeGuid;

            const projectGuid = ContentHelper.newGuid();
            const projectPath = `src${module.hasOwnNamespace ? '\\' + module.name : ''}\\${projectName}\\${projectName}.csproj`;

            sections.projectsSection += `
Project("{${projectTypeGuid}}") = "${projectName}", "${projectPath}", "{${projectGuid}}"
EndProject
`;

            const parentGuid = module.hasOwnNamespace ? moduleFolderGuids[module.name] : srcFolderGuid;
            sections.projectsNestingSection += `
		{${projectGuid}} = {${parentGuid}}
`;
        }
    }
}

export class ProjectFileGenerator extends ContentGenerator {
    constructor(module) {
        super();

        this.module = module;
    }

    get language() { return 'xml'; }
}

export class CoreProject_ProjectFileGenerator extends ProjectFileGenerator {
    generate() {
        const moduleNamespace = ContentHelper.getModuleNamespace(this.module);

        var content = `
<Project Sdk="Microsoft.NET.Sdk">

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

        content = ContentHelper.cleanContent(content);

        return content;
    }
}

export class SealedModelsProject_ProjectFileGenerator extends ProjectFileGenerator {
    generate() {
        const moduleNamespace = ContentHelper.getModuleNamespace(this.module);
        const coreProjectName = ContentHelper.get_CoreProject_Name(this.module);

        var content = `
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>netstandard2.1</TargetFramework>
    <RootNamespace>${moduleNamespace}</RootNamespace>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="MotiNet.ComponentModel.Annotations" Version="${ContentHelper.MotiNetCoreVersion}" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\\${coreProjectName}\\${coreProjectName}.csproj" />
  </ItemGroup>

</Project>
`;

        content = ContentHelper.cleanContent(content);

        return content;
    }
}

export class EntityFrameworkCoreProject_ProjectFileGenerator extends ProjectFileGenerator {
    generate() {
        var content = `
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>netstandard2.1</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="3.1.3" />
  </ItemGroup>

</Project>
`;

        content = ContentHelper.cleanContent(content);

        return content;
    }
}

export class EntityFrameworkCoreSealedModelsProject_ProjectFileGenerator extends ProjectFileGenerator {
    generate() {
        const moduleNamespace = ContentHelper.getModuleNamespace(this.module);
        const entityFrameworkCoreProjectName = ContentHelper.get_EntityFrameworkCoreProject_Name(this.module);
        const sealedModelsProjectName = ContentHelper.get_SealedModelsProject_Name(this.module);

        var content = `
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>netstandard2.1</TargetFramework>
    <RootNamespace>${moduleNamespace}.EntityFrameworkCore</RootNamespace>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="MotiNet.Extensions.Entities.EntityFrameworkCore" Version="${ContentHelper.MotiNetEntitiesVersion}" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\\${entityFrameworkCoreProjectName}\\${entityFrameworkCoreProjectName}.csproj" />
    <ProjectReference Include="..\\${sealedModelsProjectName}\\${sealedModelsProjectName}.csproj" />
  </ItemGroup>

</Project>
`;

        content = ContentHelper.cleanContent(content);

        return content;
    }
}

export class AspNetCoreProject_ProjectFileGenerator extends ProjectFileGenerator {
    generate() {
        const moduleNamespace = ContentHelper.getModuleNamespace(this.module);
        const coreProjectName = ContentHelper.get_CoreProject_Name(this.module);

        var content = `
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>netcoreapp3.1</TargetFramework>
    <RootNamespace>${moduleNamespace}</RootNamespace>
  </PropertyGroup>

  <ItemGroup>
    <FrameworkReference Include="Microsoft.AspNetCore.App" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\\${coreProjectName}\\${coreProjectName}.csproj" />
  </ItemGroup>

</Project>
`;

        content = ContentHelper.cleanContent(content);

        return content;
    }
}

export class AspNetCoreMvcDefaultViewModelsProject_ProjectFileGenerator extends ProjectFileGenerator {
    generate() {
        const moduleNamespace = ContentHelper.getModuleNamespace(this.module);
        const coreProjectName = ContentHelper.get_CoreProject_Name(this.module);

        var content = `
<Project Sdk="Microsoft.NET.Sdk">

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

        content = ContentHelper.cleanContent(content);

        return content;
    }
}
