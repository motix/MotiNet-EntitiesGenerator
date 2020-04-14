﻿// SealedModels

import pluralize from 'pluralize';
import 'prismjs/components/prism-csharp';
import { IdentifierHelper } from '../content-helper';
import ContentHelper from '../content-helper';

import * as SG from '../structure-generators/structure-generators';
import { CSharpModuleSpecificContentGenerator, CSharpEntitySpecificContentGenerator, ProjectFileGenerator } from './content-generator';
import AllFeaturesGenerator from '../feature-generators/all-features-generator';

export class SmProject_ProjectFileGenerator extends ProjectFileGenerator {
    generate() {
        const defaultNamespace = this.getProjectDefaultNamespaceIfRequired(SG.SmProjectSG);
        const coreProjectName = SG.CoreProjectSG.getProjectName(this.module);

        const content = `<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>netstandard2.1</TargetFramework>${defaultNamespace}
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

export class SmProject_EntityClassGenerator extends CSharpEntitySpecificContentGenerator {
    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.item.module);
        const entityName = this.item.name;

        var interfaces = '';
        var entityProperties = '';
        var relationshipsProperties = '';

        if (ContentHelper.entityIdWiseRequired) {
            interfaces += `
          IIdWiseEntity<string>,`;
        }

        if (ContentHelper.entityIdWiseRequired ||
            this.item.entityFeatureSetting !== null ||
            this.item.codeBasedEntityFeatureSetting !== null ||
            this.item.nameBasedEntityFeatureSetting !== null ||
            this.item.scopedNameBasedEntityFeatureSetting !== null ||
            this.item.readableIdEntityFeatureSetting !== null) {
            entityProperties += `

        [StringLength(StringLengths.Guid)]
        public string Id { get; set; }`;
        }

        if (this.item.timeTrackedEntityFeatureSetting !== null) {
            interfaces += `
          ITimeWiseEntity,`;

            entityProperties += `

        public DateTime DataCreateDate { get; set; }

        public DateTime DataLastModifyDate { get; set; }`;
        }

        if (this.item.codeBasedEntityFeatureSetting !== null) {
            interfaces += `
          ICodeWiseEntity,`;

            entityProperties += `

        [Required]
        [StringLength(StringLengths.TitleContent)]
        public string Code { get; set; }`;
        }

        if (this.item.nameBasedEntityFeatureSetting !== null ||
            this.item.scopedNameBasedEntityFeatureSetting !== null) {
            interfaces += `
          INameWiseEntity,`;

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

        if (this.item.onOffEntityFeatureSetting !== null) {
            interfaces += `
          IIsActiveWiseEntity,`;

            entityProperties += `

        public bool IsActive { get; set; }`;
        }

        if (entityProperties !== '') {
            entityProperties = entityProperties.substr(1);
        }

        if (relationshipsProperties !== '') {
            relationshipsProperties = relationshipsProperties.substr(1);
        }

        if (interfaces !== '') {
            interfaces = interfaces.substr(0, '        '.length + 1) + ':' + interfaces.substr('        '.length + 2);
            interfaces = interfaces.substr(0, interfaces.length - 1);
        }

        const content = `using MotiNet.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ${namespace}
{
    // Entity
    public sealed partial class ${entityName}${interfaces}
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

export class SmProject_SubEntityClassGenerator extends CSharpEntitySpecificContentGenerator {
    /**
     * @param {AllFeaturesGenerator} features
     * @param {Item} item
     * @param {string} subEntityName
     */
    constructor(features, item, subEntityName) {
        super(features, item);

        this.subEntityName = subEntityName;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.item.module);
        const entityName = this.item.name;

        var subEntityName;
        var interfaces = '';
        var entityProperties = '';
        var relationshipsProperties = '';

        if (this.item.codeBasedEntityFeatureSetting !== null) {
            subEntityName = this.item.scopedNameBasedEntityFeatureSetting.scopeName;
            const pluralEntityName = pluralize(entityName);
            interfaces += `
          IIdWiseEntity<string>,`;

            entityProperties += `

        [StringLength(StringLengths.Guid)]
        public string Id { get; set; }`;

            relationshipsProperties += `

        public ICollection<${entityName}> ${pluralEntityName} { get; set; }`;
        } else {
            throw 'Unsupported feature when generating sub-entity class.'
        }

        if (entityProperties !== '') {
            entityProperties = entityProperties.substr(1);
        }

        if (relationshipsProperties !== '') {
            relationshipsProperties = relationshipsProperties.substr(1);
        }

        if (interfaces !== '') {
            interfaces = interfaces.substr(0, '        '.length + 1) + ':' + interfaces.substr('        '.length + 2);
            interfaces = interfaces.substr(0, interfaces.length - 1);
        }

        const content = `using MotiNet.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ${namespace}
{
    // Entity
    public sealed partial class ${subEntityName}${interfaces}
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

export class SmProject_EntityAccessorClassGenerator extends CSharpEntitySpecificContentGenerator {
    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.item.module);
        const entityName = this.item.name;
        const entityGenericParameters = ContentHelper.getEntitySpecificGenericParameters(this.item);
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

        if (this.item.readableIdEntityFeatureSetting !== null) {
            if (this.item.codeBasedEntityFeatureSetting !== null) {
                methods += `

        public object GetIdSource(${entityName} ${lowerCaseEntityName}) => ${lowerCaseEntityName}.Code;`;
            } else if (this.item.nameBasedEntityFeatureSetting !== null ||
                this.item.scopedNameBasedEntityFeatureSetting !== null) {
                methods += `

        public object GetIdSource(${entityName} ${lowerCaseEntityName}) => ${lowerCaseEntityName}.Name;`;
            } else {
                methods += `

        // TODO:: Implement
        public object GetIdSource(${entityName} ${lowerCaseEntityName}) => throw new NotImplementedException();`;
            }

            methods += `

        public void SetId(${entityName} ${lowerCaseEntityName}, string id) => ${lowerCaseEntityName}.Id = id;`;
        }

        if (methods !== '') {
            methods = methods.substr(1);
        }

        const content = `using System;

namespace ${namespace}
{
    public class ${entityName}Accessor : I${entityName}Accessor${entityGenericParameters}
    {${methods}
    }
}
`;

        return content;
    }
}

export class SmProject_DependencyInjectionClassGenerator extends CSharpModuleSpecificContentGenerator {
    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.module);
        const moduleCommonName = IdentifierHelper.getModuleCommonName(this.module);

        var moduleGenericParameters = '';
        var registrations = '';

        for (const item of this.module.items) {
            const entityName = item.name;
            const emptyGenericParameters = ContentHelper.getEmptyEntityGenericParameters(item);
            const moduleGenericParametersLineBreak = ContentHelper.entityParametersLineBreakApplied(item, false) ? (`
                            ` + ContentHelper.generateWhiteSpace(moduleCommonName.length)) : (item === this.module.items[0] ? '' : ' ');
            const makeGenericTypeParameterList = ContentHelper.getMakeGenericTypeParameterList(item);

            moduleGenericParameters += `${moduleGenericParametersLineBreak}${entityName},`;

            if (item.scopedNameBasedEntityFeatureSetting !== null) {
                const scopeName = item.scopedNameBasedEntityFeatureSetting.scopeName;

                if (!ContentHelper.subEntityManaged(item, scopeName)) {
                    moduleGenericParameters += ` ${scopeName},`;
                }
            }

            registrations += `
            services.TryAddScoped(
                typeof(I${entityName}Accessor${emptyGenericParameters}).MakeGenericType(${makeGenericTypeParameterList}),
                typeof(${entityName}Accessor));
`;
        }

        if (this.module.items.length > 0) {
            moduleGenericParameters = '<' + ContentHelper.trimParameterList(moduleGenericParameters) + '>';
        }

        const content = `using ${namespace};
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class SealedModels${moduleCommonName}BuilderExtensions
    {
        public static ${moduleCommonName}Builder Add${moduleCommonName}WithSealedModels(this IServiceCollection services)
            => services.Add${moduleCommonName}${moduleGenericParameters}()
                       .AddSealedModels();

        public static ${moduleCommonName}Builder AddSealedModels(this ${moduleCommonName}Builder builder)
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
