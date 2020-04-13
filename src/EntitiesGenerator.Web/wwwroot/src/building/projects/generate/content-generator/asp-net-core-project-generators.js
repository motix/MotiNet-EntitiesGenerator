﻿import 'prismjs/components/prism-csharp';
import ContentHelper from '../content-helper';

import { CSharpContentGenerator, ProjectFileGenerator } from './content-generator';

export class AspNetCoreProject_ProjectFileGenerator extends ProjectFileGenerator {
    generate() {
        const moduleNamespace = ContentHelper.getModuleNamespace(this.module);
        const coreProjectName = ContentHelper.get_CoreProject_Name(this.module);

        var content = `<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>netcoreapp3.1</TargetFramework>
    <RootNamespace>${moduleNamespace}</RootNamespace>
  </PropertyGroup>

  <ItemGroup>
    <FrameworkReference Include="Microsoft.AspNetCore.App" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\\${coreProjectName}\\${coreProjectName}.csproj" />
  </ItemGroup>

</Project>
`;

        return content;
    }
}

export class AspNetCoreProject_EntityManagerClassGenerator extends CSharpContentGenerator {
    constructor(item) {
        super();

        this.item = item;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.item.module);
        const entityName = this.item.name;
        const entityGenericParameters = ContentHelper.getEntityGenericParameters(this.item);
        const lowerCaseEntityName = ContentHelper.getLowerCaseEntityName(entityName);

        // Generic parameter specifications

        var entityGenericParameterSpecifications = `
        where T${entityName} : class`;

        if (this.item.scopedNameBasedEntityFeatureSetting !== null) {
            entityGenericParameterSpecifications += `
        where T${this.item.scopedNameBasedEntityFeatureSetting.scopeName} : class`;
        }

        // Constructor parameters, base constructor parameters

        var constructorParameters = `
            I${entityName}Store${entityGenericParameters} store,
            I${entityName}Accessor${entityGenericParameters} accessor`;

        var baseConstructorParameters = 'store, accessor';

        if (ContentHelper.entityValidationRequired(this.item)) {
            constructorParameters += `,
            IEnumerable<IValidator${entityGenericParameters}> validators`;

            baseConstructorParameters += ', validators'
        }

        constructorParameters += `,
            ILogger<${entityName}Manager${entityGenericParameters}> logger`;

        baseConstructorParameters += ', logger'

        if (this.item.codeBasedEntityFeatureSetting !== null) {
            constructorParameters += `,
            ILookupNormalizer<T${entityName}> codeNormalizer`;

            baseConstructorParameters += ', codeNormalizer'

            if (this.item.codeBasedEntityFeatureSetting.hasCodeGenerator === true) {
                constructorParameters += `,
            IEntityCodeGenerator<T${entityName}> codeGenerator`;

                baseConstructorParameters += ', codeGenerator'
            }
        }

        if (this.item.nameBasedEntityFeatureSetting !== null ||
            this.item.scopedNameBasedEntityFeatureSetting !== null) {
            constructorParameters += `,
            ILookupNormalizer<T${entityName}> nameNormalizer`;

            baseConstructorParameters += ', nameNormalizer'
        }

        if (this.item.preprocessedEntityFeatureSetting !== null) {
            constructorParameters += `,
            IEntityPreprocessor<T${entityName}> preprocessor`;

            baseConstructorParameters += ', preprocessor'
        }

        constructorParameters += `,
            IHttpContextAccessor contextAccessor`;

        var content = `using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using MotiNet.Entities;
using System.Collections.Generic;
using System.Threading;

namespace ${namespace}
{
    public class AspNet${entityName}Manager${entityGenericParameters} : ${entityName}Manager${entityGenericParameters}${entityGenericParameterSpecifications}
    {
        private readonly CancellationToken _cancel;
        
        public AspNet${entityName}Manager(${constructorParameters})
            : base(${baseConstructorParameters})
            => _cancel = contextAccessor?.HttpContext?.RequestAborted ?? CancellationToken.None;

        public override CancellationToken CancellationToken => _cancel;
    }
}
`;

        return content;
    }
}

export class AspNetCoreProject_DependencyInjectionClassGenerator extends CSharpContentGenerator {
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
            builder.Services.AddScoped(typeof(I${entityName}Manager${emptyGenericParameters}).MakeGenericType(${makeGenericTypeParameterList}), typeof(AspNet${entityName}Manager${emptyGenericParameters}).MakeGenericType(${makeGenericTypeParameterList}));`;
        }

        if (this.module.items.length > 0) {
            registrations += '\n';
        }

        var content = `using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection.Extensions;
using ${namespace};

namespace Microsoft.Extensions.DependencyInjection
{
    public static class AspNet${moduleName}BuilderExtensions
    {
        public static ${moduleName}Builder AddAspNetCore(this ${moduleName}Builder builder)
        {
            // Hosting doesn't add IHttpContextAccessor by default
            builder.Services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
${registrations}
            return builder;
        }
    }
}
`;

        return content;
    }
}
