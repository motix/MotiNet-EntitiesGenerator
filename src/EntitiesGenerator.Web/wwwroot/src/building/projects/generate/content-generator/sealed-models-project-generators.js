import 'prismjs/components/prism-csharp';
import ContentHelper from '../content-helper';

import { CSharpContentGenerator, ProjectFileGenerator } from './content-generator';

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

        var entityProperties = '';
        var relationshipsProperties = '';

        if (this.item.entityFeatureSetting !== null ||
            this.item.codeBasedEntityFeatureSetting !== null ||
            this.item.nameBasedEntityFeatureSetting !== null ||
            this.item.scopedNameBasedEntityFeatureSetting !== null ||
            this.item.readableIdEntityFeatureSetting !== null) {
            entityProperties += `

        [StringLength(StringLengths.Guid)]
        public string Id { get; set; }`;
        }

        if (this.item.timeTrackedEntityFeatureSetting !== null) {
            entityProperties += `

        public DateTime DataCreateDate { get; set; }

        public DateTime DataLastModifyDate { get; set; }`;
        }

        if (this.item.codeBasedEntityFeatureSetting !== null) {
            entityProperties += `

        [Required]
        [StringLength(StringLengths.TitleContent)]
        public string Code { get; set; }`;
        }

        if (this.item.nameBasedEntityFeatureSetting !== null ||
            this.item.scopedNameBasedEntityFeatureSetting !== null) {
            entityProperties += `

        [Required]
        [StringLength(StringLengths.TitleContent)]
        public string Name { get; set; }

        [Required]
        [StringLength(StringLengths.TitleContent)]
        public string NormalizedName { get; set; }`;
        }

        if (this.item.scopedNameBasedEntityFeatureSetting !== null) {
            const scopeName = this.item.scopedNameBasedEntityFeatureSetting.scopeName;

            entityProperties += `

        [Required]
        [StringLength(StringLengths.Guid)]
        public string ${scopeName}Id { get; set; }`;

            relationshipsProperties += `

        public ${scopeName} ${scopeName} { get; set; }`;
        }

        if (entityProperties !== '') {
            entityProperties = entityProperties.substr(1);
        }

        if (relationshipsProperties !== '') {
            relationshipsProperties = relationshipsProperties.substr(1);
        }

        var content = `using System.ComponentModel.DataAnnotations;

namespace ${namespace}
{
    // Entity
    public sealed partial class ${entityName}
    {${entityProperties}
    }

    // Relationships
    partial class ${entityName}
    {${relationshipsProperties}
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

        var methods = '';

        if (this.item.entityFeatureSetting !== null ||
            this.item.codeBasedEntityFeatureSetting !== null ||
            this.item.nameBasedEntityFeatureSetting !== null ||
            this.item.scopedNameBasedEntityFeatureSetting !== null ||
            this.item.readableIdEntityFeatureSetting !== null) {
            methods += `

        public object GetId(${entityName} ${lowerCaseEntityName}) => ${lowerCaseEntityName}.Id;`;
        }

        if (this.item.timeTrackedEntityFeatureSetting !== null) {
            methods += `

        public DateTime GetDataCreateDate(${entityName} ${lowerCaseEntityName}) => ${lowerCaseEntityName}.DataCreateDate;

        public void SetDataCreateDate(${entityName} ${lowerCaseEntityName}, DateTime dataCreateDate) => ${lowerCaseEntityName}.DataCreateDate = dataCreateDate;

        public void SetDataLastModifyDate(${entityName} ${lowerCaseEntityName}, DateTime dataLastModifyDate) => ${lowerCaseEntityName}.DataLastModifyDate = dataLastModifyDate;`;
        }

        if (this.item.codeBasedEntityFeatureSetting !== null) {
            methods += `

        public string GetCode(${entityName} ${lowerCaseEntityName}) => ${lowerCaseEntityName}.Code;

        public void SetCode(${entityName} ${lowerCaseEntityName}, string code) => ${lowerCaseEntityName}.Code = code;`;
        }

        if (this.item.nameBasedEntityFeatureSetting !== null ||
            this.item.scopedNameBasedEntityFeatureSetting !== null) {
            methods += `

        public string GetName(${entityName} ${lowerCaseEntityName}) => ${lowerCaseEntityName}.Name;

        public void SetNormalizedName(${entityName} ${lowerCaseEntityName}, string normalizedName) => ${lowerCaseEntityName}.NormalizedName = normalizedName;`;
        }

        if (this.item.scopedNameBasedEntityFeatureSetting !== null) {
            const scopeName = this.item.scopedNameBasedEntityFeatureSetting.scopeName;
            const lowerCaseScopeName = ContentHelper.getLowerCaseEntityName(scopeName);

            methods += `

        public object GetScopeId(${entityName} ${lowerCaseEntityName}) => ${lowerCaseEntityName}.${scopeName}Id;

        public void SetScopeId(${entityName} ${lowerCaseEntityName}, object ${lowerCaseScopeName}Id) => ${lowerCaseEntityName}.${scopeName}Id = (string)${lowerCaseScopeName}Id;

        public ${scopeName} GetScope(${entityName} ${lowerCaseEntityName}) => ${lowerCaseEntityName}.${scopeName};

        public void SetScope(${entityName} ${lowerCaseEntityName}, ${scopeName} ${lowerCaseScopeName}) => ${lowerCaseEntityName}.${scopeName} = ${lowerCaseScopeName};`;
        }

        if (methods !== '') {
            methods = methods.substr(1);
        }


        var content = `namespace ${namespace}
{
    public class ${entityName}Accessor : I${entityName}Accessor<${entityName}>
    {${methods}
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

        var moduleGenericParameters = '';
        var registrations = '';

        for (const item of this.module.items) {
            const entityName = item.name;
            const emptyGenericParameters = ContentHelper.getEmptyEntityGenericParameters(item);
            const moduleGenericParametersLineBreak = ContentHelper.entityParametersLineBreakApplied(item, false) ? (`
                            ` + ContentHelper.generateWhiteSpace(moduleName.length)) : (item === this.module.items[0] ? '' : ' ');
            const makeGenericTypeParameterList = ContentHelper.getMakeGenericTypeParameterList(item);

            moduleGenericParameters += `${moduleGenericParametersLineBreak}${entityName},`;

            registrations += `
            services.TryAddScoped(
                typeof(I${entityName}Accessor${emptyGenericParameters}).MakeGenericType(${makeGenericTypeParameterList}),
                typeof(${entityName}Accessor));
`;
        }

        if (this.module.items.length > 0) {
            moduleGenericParameters = '<' + ContentHelper.trimParameterList(moduleGenericParameters) + '>';
        }

        var content = `using ${namespace};
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class SealedModels${moduleName}BuilderExtensions
    {
        public static ${moduleName}Builder Add${moduleName}WithSealedModels(this IServiceCollection services)
            => services.Add${moduleName}${moduleGenericParameters}()
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
