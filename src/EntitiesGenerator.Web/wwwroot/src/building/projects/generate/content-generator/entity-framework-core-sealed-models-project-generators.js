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
        const moduleGenericParametersWhiteSpace = '                        ' + ContentHelper.generateWhiteSpace(moduleName.length);
        const moduleGenericParametersLastLineBreak = this.module.items.length === 0 ? '' : '\n' + moduleGenericParametersWhiteSpace;

        var moduleGenericParameters = '';
        var methods = '';

        for (const item of this.module.items) {
            const entityName = item.name;
            const moduleGenericParametersLineBreak = ContentHelper.entityParametersLineBreakApplied(item, false) ?
                '\n' + moduleGenericParametersWhiteSpace : (item === this.module.items[0] ? '' : ' ');

            moduleGenericParameters += `${moduleGenericParametersLineBreak}${entityName},`;

            methods += `

        protected override void Configure${entityName}(EntityTypeBuilder<${entityName}> builder)
        {
        }`;

            if (item.scopedNameBasedEntityFeatureSetting !== null) {
                const scopeName = item.scopedNameBasedEntityFeatureSetting.scopeName;

                if (!ContentHelper.subEntityManaged(item, scopeName)) {
                    moduleGenericParameters += ` ${scopeName},`;
                }
            }
        }

        var content = `using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ${namespace}.EntityFrameworkCore
{
    public abstract class ${moduleName}DbContextBase
        : ${moduleName}DbContextBase<${moduleGenericParameters}${moduleGenericParametersLastLineBreak}// Key
${moduleGenericParametersWhiteSpace}string>
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
        const entityGenericParameters = ContentHelper.getEntitySpecificGenericParameters(this.item);

        var bases = '';
        var baseConstructorCall = '';
        var properties = '';
        var methods = '';

        if (this.item.entityFeatureSetting !== null) {
            bases += `EntityStore<${entityName}, TDbContext>,
          `;

            baseConstructorCall = ' : base(dbContext)';
        }

        bases += `I${entityName}Store${entityGenericParameters}`;

        if (this.item.timeTrackedEntityFeatureSetting !== null) {
            bases += `,
          ITimeTrackedEntityStoreMarker<${entityName}, TDbContext>`;

            methods += `

        public ${entityName} FindLatest()
            => TimeTrackedEntityStoreHelper.FindLatestEntity(this);

        public Task<${entityName}> FindLatestAsync(CancellationToken cancellationToken)
            => TimeTrackedEntityStoreHelper.FindLatestEntityAsync(this, cancellationToken);`;
        }

        if (this.item.codeBasedEntityFeatureSetting !== null) {
            bases += `,
          ICodeBasedEntityStoreMarker<${entityName}, TDbContext>`;

            methods += `

        public ${entityName} FindByCode(string normalizedCode)
            => CodeBasedEntityStoreHelper.FindEntityByCode(this, normalizedCode);

        public Task<${entityName}> FindByCodeAsync(string normalizedCode, CancellationToken cancellationToken)
            => CodeBasedEntityStoreHelper.FindEntityByCodeAsync(this, normalizedCode, cancellationToken);`;
        }

        if (this.item.nameBasedEntityFeatureSetting !== null) {
            bases += `,
          INameBasedEntityStoreMarker<${entityName}, TDbContext>`;

            methods += `

        public ${entityName} FindByName(string normalizedName)
            => NameBasedEntityStoreHelper.FindEntityByName(this, normalizedName);

        public Task<${entityName}> FindByNameAsync(string normalizedName, CancellationToken cancellationToken)
            => NameBasedEntityStoreHelper.FindEntityByNameAsync(this, normalizedName, cancellationToken);`;
        }

        if (this.item.scopedNameBasedEntityFeatureSetting !== null) {
            const scopeName = this.item.scopedNameBasedEntityFeatureSetting.scopeName;
            const lowerCaseScopeName = ContentHelper.getLowerCaseEntityName(scopeName);

            bases += `,
          IScopedNameBasedEntityStoreMarker<${entityName}, ${scopeName}, TDbContext>`;

            methods += `

        public ${entityName} FindByName(string normalizedName, ${scopeName} ${lowerCaseScopeName})
            => ScopedNameBasedEntityStoreHelper.FindEntityByName(this, normalizedName, ${lowerCaseScopeName}, x => x.${scopeName}Id);

        public Task<${entityName}> FindByNameAsync(string normalizedName, ${scopeName} ${lowerCaseScopeName}, CancellationToken cancellationToken)
            => ScopedNameBasedEntityStoreHelper.FindEntityByNameAsync(this, normalizedName, ${lowerCaseScopeName}, x => x.${scopeName}Id, cancellationToken);

        public ${scopeName} FindScopeById(object id)
            => ScopedNameBasedEntityStoreHelper.FindScopeById(this, id);

        public Task<${scopeName}> FindScopeByIdAsync(object id, CancellationToken cancellationToken)
            => ScopedNameBasedEntityStoreHelper.FindScopeByIdAsync(this, id, cancellationToken);`;
        }

        if (this.item.onOffEntityFeatureSetting !== null) {
            properties += `

        public ISearchSpecification<${entityName}> SearchActiveEntitiesSpecification => new SearchActiveSpecification<${entityName}>();`;
        }

        if (bases !== '') {
            bases = `
        : ` + bases;
        }

        if (this.item.entityFeatureSetting === null) {
            properties += '\n' + ContentHelper.generateDisposePattern();
        }

        var content = `using Microsoft.EntityFrameworkCore;
using MotiNet.Entities;
using MotiNet.Entities.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace ${namespace}.EntityFrameworkCore
{
    public class ${entityName}Store<TDbContext>${bases}
        where TDbContext : DbContext
    {
        public ${entityName}Store(TDbContext dbContext)${baseConstructorCall} { }${properties}${methods}
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
            const emptyGenericParameters = ContentHelper.getEmptyEntityGenericParameters(item);
            const makeGenericTypeParameterList = ContentHelper.getMakeGenericTypeParameterList(item);

            registrations += `
            services.TryAddScoped(
                typeof(I${entityName}Store${emptyGenericParameters}).MakeGenericType(${makeGenericTypeParameterList}),
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
