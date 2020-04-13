import 'prismjs/components/prism-csharp';
import ContentHelper from '../content-helper';

import { CSharpContentGenerator, ProjectFileGenerator} from './content-generator';

export class EntityFrameworkCoreSealedModelsProject_ProjectFileGenerator extends ProjectFileGenerator {
    generate() {
        const moduleNamespace = ContentHelper.getModuleNamespace(this.module);
        const entityFrameworkCoreProjectName = ContentHelper.get_EntityFrameworkCoreProject_Name(this.module);
        const sealedModelsProjectName = ContentHelper.get_SealedModelsProject_Name(this.module);

        var content = `<Project Sdk="Microsoft.NET.Sdk">

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

        return content;
    }
}

export class EntityFrameworkCoreSealedModelsProject_DbContextClassGenerator extends CSharpContentGenerator {
    constructor(module) {
        super();

        this.module = module;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.module);
        const moduleName = ContentHelper.getModuleName(this.module);

        var moduleGenericParameters = '';
        var methods = '';

        for (const item of this.module.items) {
            const entityName = item.name;

            moduleGenericParameters += `
            ${entityName},`;

            methods += `

        protected override void Configure${entityName}(EntityTypeBuilder<${entityName}> builder)
        {
        }`;
        }

        var content = `using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ${namespace}.EntityFrameworkCore
{
    public abstract class ${moduleName}DbContextBase
        : ${moduleName}DbContextBase<${moduleGenericParameters}
            // Key
            string>
    {
        protected ${moduleName}DbContextBase(DbContextOptions options) : base(options) { }

        protected ${moduleName}DbContextBase() { }${methods}
    }
}
`;

        return content;
    }
}

export class EntityFrameworkCoreSealedModelsProject_EntityStoreClassGenerator extends CSharpContentGenerator {
    constructor(item) {
        super();

        this.item = item;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.item.module);
        const entityName = this.item.name;

        var content = `using Microsoft.EntityFrameworkCore;
using MotiNet.Entities.EntityFrameworkCore;

namespace ${namespace}.EntityFrameworkCore
{
    public class ${entityName}Store<TDbContext>
        : EntityStore<${entityName}, TDbContext>,
          I${entityName}Store<${entityName}>
        where TDbContext : DbContext
    {
        public ${entityName}Store(TDbContext dbContext) : base(dbContext) { }
    }
}
`;

        return content;
    }
}

export class EntityFrameworkCoreSealedModelsProject_DependencyInjectionClassGenerator extends CSharpContentGenerator {
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
            services.TryAddScoped(
                typeof(I${entityName}Store<>).MakeGenericType(builder.${entityName}Type),
                typeof(${entityName}Store<>).MakeGenericType(contextType));
`;
        }

        var content = `using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using ${namespace};
using ${namespace}.EntityFrameworkCore;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class EntityFrameworkCore${moduleName}BuilderExtensions
    {
        public static ${moduleName}Builder AddEntityFrameworkCoreWithSealedModels<TContext>(this ${moduleName}Builder builder)
            where TContext : DbContext
        {
            var services = builder.Services;
            var contextType = typeof(TContext);
${registrations}
            return builder;
        }
    }
}
`;

        return content;
    }
}
