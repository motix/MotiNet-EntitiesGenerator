import 'prismjs/components/prism-csharp';
import ContentHelper from '../content-helper';

import { CSharpContentGenerator } from './content-generator';

export class EntityFrameworkCoreSealedModelsProject_DbContextClassGenerator extends CSharpContentGenerator {
    constructor(module) {
        super();

        this.module = module;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.module);
        const moduleName = ContentHelper.getModuleName(this.module);

        var genericParameters = '';
        var methods = '';

        for (const item of this.module.items) {
            const entityName = item.name;

            genericParameters += `
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
        : ${moduleName}DbContextBase<${genericParameters}
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
