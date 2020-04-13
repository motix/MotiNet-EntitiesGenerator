import pluralize from 'pluralize';
import 'prismjs/components/prism-csharp';
import ContentHelper from '../content-helper';

import { CSharpContentGenerator, ProjectFileGenerator} from './content-generator';

export class EntityFrameworkCoreProject_ProjectFileGenerator extends ProjectFileGenerator {
    generate() {
        var content = `<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>netstandard2.1</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="3.1.3" />
  </ItemGroup>

</Project>
`;

        return content;
    }
}

export class EntityFrameworkCoreProject_DbContextClassGenerator extends CSharpContentGenerator {
    constructor(module) {
        super();

        this.module = module;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.module);
        const moduleName = ContentHelper.getModuleName(this.module);
        const moduleGenericParametersWhiteSpace = '                                        ' + ContentHelper.generateWhiteSpace(moduleName.length);
        const moduleGenericParametersLastLineBreak = this.module.items.length === 0 ? '' : '\n' + moduleGenericParametersWhiteSpace;

        var moduleGenericParameters = '';
        var moduleGenericParameterSpecifications = '';
        var properties = '';
        var registrations = '';
        var methods = '';

        for (const item of this.module.items) {
            const entityName = item.name;
            const pluralEntityName = pluralize(entityName);
            const moduleGenericParametersLineBreak = ContentHelper.entityParametersLineBreakApplied(item, false) ?
                '\n' + moduleGenericParametersWhiteSpace : (item === this.module.items[0] ? '' : ' ');

            moduleGenericParameters += `${moduleGenericParametersLineBreak}T${entityName},`;

            moduleGenericParameterSpecifications += `
        where T${entityName} : class`;

            properties += `
        public DbSet<T${entityName}> ${pluralEntityName} { get; set; }
`;

            registrations += `
            modelBuilder.Entity<T${entityName}>(Configure${entityName});`;

            methods += `

        protected virtual void Configure${entityName}(EntityTypeBuilder<T${entityName}> builder) { }`;

            if (item.scopedNameBasedEntityFeatureSetting !== null) {
                const scopeName = item.scopedNameBasedEntityFeatureSetting.scopeName;

                if (!ContentHelper.subEntityManaged(item, scopeName)) {
                    const pluralScopeName = pluralize(scopeName);

                    moduleGenericParameters += ` T${scopeName},`;

                    moduleGenericParameterSpecifications += `
        where T${scopeName} : class`;

                    properties += `
        public DbSet<T${scopeName}> ${pluralScopeName} { get; set; }
`;

                    registrations += `
            modelBuilder.Entity<T${scopeName}>(Configure${scopeName});`;

                    methods += `

        protected virtual void Configure${scopeName}(EntityTypeBuilder<T${scopeName}> builder) { }`;
                }
            }
        }

        var content = `using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace ${namespace}.EntityFrameworkCore
{
    public abstract class ${moduleName}DbContextBase<${moduleGenericParameters}${moduleGenericParametersLastLineBreak}// Key
${moduleGenericParametersWhiteSpace}TKey>
        : DbContext${moduleGenericParameterSpecifications}
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
