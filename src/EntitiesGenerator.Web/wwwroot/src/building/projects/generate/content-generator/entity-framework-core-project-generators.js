import pluralize from 'pluralize';
import 'prismjs/components/prism-csharp';
import ContentHelper from '../content-helper';

import { CSharpContentGenerator } from './content-generator';

export class EntityFrameworkCoreProject_DbContextClassGenerator extends CSharpContentGenerator {
    constructor(module) {
        super();

        this.module = module;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.module);
        const moduleName = ContentHelper.getModuleName(this.module);

        var genericParameters = '';
        var genericParameterSpecifications = '';
        var properties = '';
        var registrations = '';
        var methods = '';

        for (const item of this.module.items) {
            const entityName = item.name;
            const pluralEntityName = pluralize(entityName);

            genericParameters += `
        T${entityName},`;

            genericParameterSpecifications += `
        where T${entityName} : class`;

            properties += `
        public DbSet<T${entityName}> ${pluralEntityName} { get; set; }
`;

            registrations += `
            modelBuilder.Entity<T${entityName}>(Configure${entityName});`;

            methods += `

        protected virtual void Configure${entityName}(EntityTypeBuilder<T${entityName}> builder) { }`;
        }

        var content = `using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace ${namespace}.EntityFrameworkCore
{
    public abstract class ${moduleName}DbContextBase<${genericParameters}
        // Key
        TKey>
        : DbContext${genericParameterSpecifications}
        // Key
        where TKey : IEquatable<TKey>
    {
        protected ${moduleName}DbContextBase(DbContextOptions options) : base(options) { }

        protected ${moduleName}DbContextBase() { }
${properties}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {${registrations}
        }${methods}
    }
}
`;

        return content;
    }
}
