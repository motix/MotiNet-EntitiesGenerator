import 'prismjs/components/prism-csharp';
import ContentHelper from '../content-helper';

import { CSharpContentGenerator, ProjectFileGenerator} from './content-generator';

export class SealedModelsProject_ProjectFileGenerator extends ProjectFileGenerator {
    generate() {
        const moduleNamespace = ContentHelper.getModuleNamespace(this.module);
        const coreProjectName = ContentHelper.get_CoreProject_Name(this.module);

        var content = `<Project Sdk="Microsoft.NET.Sdk">

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

        return content;
    }
}

export class SealedModelsProject_EntityClassGenerator extends CSharpContentGenerator {
    constructor(item) {
        super();

        this.item = item;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.item.module);
        const entityName = this.item.name;

        var content = `using System.ComponentModel.DataAnnotations;

namespace ${namespace}
{
    // Entity
    public sealed partial class ${entityName}
    {
        [StringLength(StringLengths.Guid)]
        public string Id { get; set; }
    }

    // Relationships
    partial class ${entityName}
    {
    }
}
`;

        return content;
    }
}

export class SealedModelsProject_EntityAccessorClassGenerator extends CSharpContentGenerator {
    constructor(item) {
        super();

        this.item = item;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.item.module);
        const entityName = this.item.name;
        const lowerCaseEntityName = ContentHelper.getLowerCaseEntityName(entityName);

        var content = `namespace ${namespace}
{
    public class ${entityName}Accessor : I${entityName}Accessor<${entityName}>
    {
        public object GetId(${entityName} ${lowerCaseEntityName}) => ${lowerCaseEntityName}.Id;
    }
}
`;

        return content;
    }
}

export class SealedModelsProject_DependencyInjectionClassGenerator extends CSharpContentGenerator {
    constructor(module) {
        super();

        this.module = module;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.module);
        const moduleName = ContentHelper.getModuleName(this.module);
        const whiteSpace = ContentHelper.generateWhiteSpace(moduleName.length);

        var genericParameters = '';
        var registrations = '';

        for (const item of this.module.items) {
            const entityName = item.name;

            genericParameters += `
                            ${whiteSpace}${entityName},`;

            registrations += `
            services.TryAddScoped(
                typeof(I${entityName}Accessor<>).MakeGenericType(builder.${entityName}Type),
                typeof(${entityName}Accessor));
`;
        }

        if (this.module.items.length > 0) {
            genericParameters = '<' + ContentHelper.trimParameterList(genericParameters) + '>';
        }

        var content = `using ${namespace};
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class SealedModels${moduleName}BuilderExtensions
    {
        public static ${moduleName}Builder Add${moduleName}WithSealedModels(this IServiceCollection services)
            => services.Add${moduleName}${genericParameters}()
                       .AddSealedModels();

        public static ${moduleName}Builder AddSealedModels(this ${moduleName}Builder builder)
        {
            var services = builder.Services;
${registrations}
            return builder;
        }
    }
}
`;

        return content;
    }
}
