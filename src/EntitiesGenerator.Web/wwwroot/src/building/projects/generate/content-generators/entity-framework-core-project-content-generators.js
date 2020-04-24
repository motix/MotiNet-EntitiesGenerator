// EntityFrameworkCore

import pluralize from 'pluralize';
import 'prismjs/components/prism-csharp';
import { IdentifierHelper, StringHelper } from '../content-helper';

import { EfProjectSG } from '../structure-generators/structure-generators';
import {
    CSharpModuleSpecificContentGenerator,
    ProjectFileGenerator
} from './content-generator';

export class EfProject_ProjectFileGenerator extends ProjectFileGenerator {
    generate() {
        const defaultNamespace = this.getProjectDefaultNamespaceIfRequired(EfProjectSG);

        const content = `<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>netstandard2.1</TargetFramework>${defaultNamespace}
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="3.1.3" />
  </ItemGroup>

</Project>
`;

        return content;
    }
}

export class EfProject_DbContextClassGenerator extends CSharpModuleSpecificContentGenerator {
    generate() {
        const namespace = EfProjectSG.getDefaultNamespace(this.module);
        const moduleCommonName = IdentifierHelper.getModuleCommonName(this.module);
        const moduleGenericTypeParameters = this.features.moduleGenericTypeParameters(this.module,
            `public abstract partial class ${moduleCommonName}DbContextBase`.length / 4 + 1, true);
        const moduleGenericTypeConstraints = this.features.moduleGenericTypeConstraints(this.module, 2, true, { start: 1 });
        const propertyDeclarationsData = [];
        const configureEntityRegistrationsData = [];
        const configureEntityMethodsData = [];

        for (const item of this.module.items) {
            const entityName = item.name;
            const pluralEntityName = pluralize(entityName);

            propertyDeclarationsData.push(`public DbSet<T${entityName}> ${pluralEntityName} { get; set; }`);
            configureEntityRegistrationsData.push(`modelBuilder.Entity<T${entityName}>(Configure${entityName});`);
            configureEntityMethodsData.push(`protected virtual void Configure${entityName}(EntityTypeBuilder<T${entityName}> builder) { }`);

            for (const feature of this.features.allFeatures) {
                if (feature.itemHasFeature(item)) {
                    feature.ef_DbContextClass_PropertyDeclarationsData(item, propertyDeclarationsData);
                    feature.ef_DbContextClass_ConfigureEntityRegistrationsData(item, configureEntityRegistrationsData);
                    feature.ef_DbContextClass_ConfigureEntityMethodsData(item, configureEntityMethodsData);
                }
            }
        }

        for (const item of this.module.items) {
            for (const relationship of this.module.itemsRelationships) {
                if (this.relationships.itemHasRelationship(item, relationship)) {
                    const generator = this.relationships.getGenerator(relationship);
                    generator.ef_DbContextClass_PropertyDeclarationsData(item, relationship, propertyDeclarationsData);
                    generator.ef_DbContextClass_ConfigureEntityRegistrationsData(item, relationship, configureEntityRegistrationsData);
                }
            }
        }

        const propertyDeclarations = StringHelper.joinLines(_.uniq(propertyDeclarationsData), 2, '\n', { start: 1, end: 1 });
        const configureEntityRegistrations = StringHelper.joinLines(_.uniq(configureEntityRegistrationsData), 3, '', { start: 1, end: 1, spaceIfEmpty: true });
        const configureEntityMethods = StringHelper.joinLines(_.uniq(configureEntityMethodsData), 2, '\n', { start: 2 });

        const content = `using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace ${namespace}
{
    public abstract partial class ${moduleCommonName}DbContextBase${moduleGenericTypeParameters}
        : DbContext${moduleGenericTypeConstraints}
    {
        protected ${moduleCommonName}DbContextBase(DbContextOptions options) : base(options) { }

        protected ${moduleCommonName}DbContextBase() { }
${propertyDeclarations}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {${configureEntityRegistrations}
            var internalMethod = GetType().GetMethod("OnModelCreatingInternal",
                System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.NonPublic);

            if (internalMethod != null)
            {
                internalMethod.Invoke(this, new object[] { modelBuilder });
            }
        }${configureEntityMethods}
    }
}
`;

        return content;
    }
}
