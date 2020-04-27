// EntityFrameworkCore.SealedModels

import pluralize from 'pluralize';
import 'prismjs/components/prism-csharp';
import ContentHelper, { IdentifierHelper, StringHelper } from '../content-helper';

import { SmProjectSG, EfProjectSG, EfSmProjectSG } from '../structure-generators/structure-generators';
import {
    CSharpModuleSpecificContentGenerator,
    CSharpEntitySpecificContentGenerator,
    ProjectFileGenerator
} from './content-generator';

export class EfSmProject_ProjectFileGenerator extends ProjectFileGenerator {
    generate() {
        const defaultNamespace = this.getProjectDefaultNamespaceIfRequired(EfSmProjectSG);
        const entityFrameworkCoreProjectName = EfProjectSG.getProjectName(this.module);
        const sealedModelsProjectName = SmProjectSG.getProjectName(this.module);

        const content = `<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>netstandard2.1</TargetFramework>${defaultNamespace}
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

export class EfSmProject_DbContextClassGenerator extends CSharpModuleSpecificContentGenerator {
    generate() {
        const namespace = EfSmProjectSG.getDefaultNamespace(this.module);
        const moduleCommonName = IdentifierHelper.getModuleCommonName(this.module);
        const modelOnlyEntities = this.features.moduleModelOnlyEntityNames(this.module);
        const moduleSpecificTypeParameters = this.features.moduleSpecificTypeParameters(this.module,
            `: ${moduleCommonName}DbContextBase`.length / 4 + 2, true);
        const propertyDeclarationsData = _.map(modelOnlyEntities,
            value => `public DbSet<${value.name}> ${pluralize(value.name)} { get; set; }`);
        const configureEntityRegistrationsData = _.map(modelOnlyEntities,
            value => `modelBuilder.Entity<${value.name}>(Configure${value.name});`);
        //const configureEntityMethodsData = _.map(entities,
        //    value => `protected virtual void Configure${value.name}(EntityTypeBuilder<T${value.name}> builder) { }`);
        const configureEntityMethodsData = [];

        for (const item of this.module.items) {
            const entityConfigurationsData = [];

            for (const feature of this.features.allFeatures) {
                if (feature.itemHasFeature(item)) {
                    feature.efSm_DbContextClass_EntityConfigurationsData(item, entityConfigurationsData);
                }
            }

            for (const relationship of this.module.itemsRelationships) {
                if (this.relationships.itemHasRelationship(item, relationship)) {
                    const generator = this.relationships.getGenerator(relationship);
                    generator.efSm_DbContextClass_EntityConfigurationsData(item, relationship, entityConfigurationsData);
                }
            }

            if (entityConfigurationsData.length > 0) {
                const entityName = item.name;
                const modification = item.modelOnly ? 'virtual' : 'override';
                const entityConfigurations = StringHelper.joinLines(_.uniq(entityConfigurationsData), 1, '\n');

                configureEntityMethodsData.push(`protected ${modification} void Configure${entityName}(EntityTypeBuilder<${entityName}> builder)
{
${entityConfigurations}
}`);
            } else if (item.modelOnly) {
                const entityName = item.name;
                configureEntityMethodsData.push(`protected virtual void Configure${entityName}(EntityTypeBuilder<${entityName}> builder) { }`);
            }
        }

        const propertyDeclarations = StringHelper.joinLines(_.uniq(propertyDeclarationsData), 2, '\n', { start: 2, end: 1 });
        const configureEntityRegistrations = StringHelper.joinLines(_.uniq(configureEntityRegistrationsData), 1, '', { start: 1, end: 1, spaceIfEmpty: true });
        const configureEntityMethods = StringHelper.joinLines(_.uniq(configureEntityMethodsData), 2, '\n', { start: 2 });

        var onModelCreatingMethod = modelOnlyEntities.length === 0 ? '' : `
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);
${configureEntityRegistrations}
    var internalMethod = GetType().GetMethod("OnModelCreatingInternal",
        System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.NonPublic);

    if (internalMethod != null)
    {
        internalMethod.Invoke(this, new object[] { modelBuilder });
    }
}`;
        onModelCreatingMethod = StringHelper.indent(onModelCreatingMethod, 2);

        const content = `using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ${namespace}
{
    public abstract partial class ${moduleCommonName}DbContextBase
        : ${moduleCommonName}DbContextBase${moduleSpecificTypeParameters}
    {
        protected ${moduleCommonName}DbContextBase(DbContextOptions options) : base(options) { }

        protected ${moduleCommonName}DbContextBase() { }${propertyDeclarations}${onModelCreatingMethod}${configureEntityMethods}
    }
}
`;

        return content;
    }
}

export class EfSmProject_EntityStoreClassGenerator extends CSharpEntitySpecificContentGenerator {
    generate() {
        const namespace = EfSmProjectSG.getDefaultNamespace(this.item.module);
        const entityName = this.item.name;
        const entitySpecificTypeParameters = this.features.itemSpecificTypeParameters(this.item);
        /**
         * @type {{baseClass: string, constructorCall: string}}
         */
        const storeBaseData = { baseClass: null, constructorCall: null };
        const storeInterfacesData = [];
        const storeBaseAndInterfacesData = [];
        const constructorParametersData = [];
        const constructorBodyData = [];
        const storePropertyDeclarationsData = [];
        const storeMethodDeclarationsData = [];
        const storeMemberDeclarationsData = [];

        for (const feature of this.features.allFeatures) {
            if (feature.itemHasFeature(this.item)) {
                feature.efSm_EntityStoreClass_StoreBaseData(this.item, storeBaseData);
                feature.efSm_EntityStoreClass_StoreInterfacesData(this.item, storeInterfacesData);
                feature.efSm_EntityStoreClass_ConstructorParametersData(this.item, constructorParametersData);
                feature.efSm_EntityStoreClass_ConstructorBodyData(this.item, constructorBodyData);
                feature.efSm_EntityStoreClass_StorePropertyDeclarationsData(this.item, storePropertyDeclarationsData);
                feature.efSm_EntityStoreClass_StoreMethodDeclarationsData(this.item, storeMethodDeclarationsData);
            } else {
                feature.efSm_EntityStoreClass_StoreMemberDeclarationsData_FeatureAbsent(this.item, storeMemberDeclarationsData);
            }
        }

        if (storeBaseData.baseClass !== null) {
            storeBaseAndInterfacesData.push(storeBaseData.baseClass);
        }

        storeBaseAndInterfacesData.push(`I${entityName}Store${entitySpecificTypeParameters}`);
        storeBaseAndInterfacesData.push(...storeInterfacesData);

        const storeBaseAndInterfaces = StringHelper.generateBaseBlock(_.uniq(storeBaseAndInterfacesData), 2, { start: 1 });
        const storeBaseConstructorCall = storeBaseData.constructorCall === null ? '' : ` : ${storeBaseData.constructorCall}`;
        const constructorParameters = StringHelper.joinParameters(_.uniqBy(constructorParametersData, value => value.text),
            0, { startComma: true });
        const constructorBody = StringHelper.joinLines(_.uniq(constructorBodyData), 3, '', {start: 1, end: 1, endIndent: 2, spaceIfEmpty: true})
        const storePropertyDeclarations = StringHelper.joinLines(_.uniq(storePropertyDeclarationsData), 2, '\n', { start: 2 });
        const storeMethodDeclarations = StringHelper.joinLines(_.uniq(storeMethodDeclarationsData), 2, '\n', { start: 2 });
        const storeMemberDeclarations = StringHelper.joinLines(_.uniq(storeMemberDeclarationsData), 2, '\n', { start: 2 });

        const content = `using Microsoft.EntityFrameworkCore;
using MotiNet.Entities;
using MotiNet.Entities.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace ${namespace}
{
    public partial class ${entityName}Store<TDbContext>${storeBaseAndInterfaces}
        where TDbContext : DbContext
    {
        public ${entityName}Store(TDbContext dbContext${constructorParameters})${storeBaseConstructorCall}${constructorBodyData.length > 0 ? '\n' : ' '}{${constructorBody}}${storePropertyDeclarations}${storeMethodDeclarations}${storeMemberDeclarations}
    }
}
`;

        return content;
    }
}

export class EfSmProject_OptionsClassGenerator extends CSharpModuleSpecificContentGenerator {
    generate() {
        const namespace = EfSmProjectSG.getDefaultNamespace(this.module);
        const moduleCommonName = IdentifierHelper.getModuleCommonName(this.module);

        const content = `namespace ${namespace}
{
    public partial class EntityFrameworkCore${moduleCommonName}Options
    { }
}
`;

        return content;
    }
}

export class EfSmProject_DependencyInjectionClassGenerator extends CSharpModuleSpecificContentGenerator {
    generate() {
        const smNamespace = SmProjectSG.getDefaultNamespace(this.module);
        const namespace = EfSmProjectSG.getDefaultNamespace(this.module);
        const moduleCommonName = IdentifierHelper.getModuleCommonName(this.module);
        const serviceRegistrationsData = [];

        for (const item of this.module.items) {
            if (item.modelOnly) {
                continue;
            }

            const entityName = item.name;
            const entityEmptyGenericTypeParameters = this.features.itemEmptyGenericTypeParameters(item);
            const entityMakeGenericTypeParameters = this.features.itemMakeGenericTypeParameters(item);

            serviceRegistrationsData.push(
                `services.TryAddScoped(
    typeof(I${entityName}Store${entityEmptyGenericTypeParameters}).MakeGenericType(${entityMakeGenericTypeParameters}),
    typeof(${entityName}Store<>).MakeGenericType(contextType));`);
        }

        const serviceRegistrations = StringHelper.joinLines(_.uniq(serviceRegistrationsData), 3, '\n', { start: 1, end: 1 });

        const content = `using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using ${smNamespace};
using ${namespace};

namespace Microsoft.Extensions.DependencyInjection
{
    public static partial class EntityFrameworkCore${moduleCommonName}BuilderExtensions
    {
        public static ${moduleCommonName}Builder AddEntityFrameworkCoreWithSealedModels<TContext>(this ${moduleCommonName}Builder builder)
            where TContext : DbContext
        {
            var services = builder.Services;
            var contextType = typeof(TContext);
${serviceRegistrations}
            var internalMethod = typeof(EntityFrameworkCore${moduleCommonName}BuilderExtensions).GetMethod("AddEntityFrameworkCoreWithSealedModelsInternal",
                System.Reflection.BindingFlags.Static | System.Reflection.BindingFlags.NonPublic);

            if (internalMethod != null)
            {
                internalMethod = internalMethod.MakeGenericMethod(typeof(TContext));
                internalMethod.Invoke(null, new object[] { builder });
            }

            return builder;
        }
    }
}
`;

        return content;
    }
}
