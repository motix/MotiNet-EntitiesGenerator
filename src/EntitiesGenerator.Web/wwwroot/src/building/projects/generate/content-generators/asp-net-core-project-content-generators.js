// AspNetCore

import 'prismjs/components/prism-csharp';
import { IdentifierHelper, StringHelper } from '../content-helper';

import { CoreProjectSG, AspProjectSG } from '../structure-generators/structure-generators';
import {
    CSharpModuleSpecificContentGenerator,
    CSharpEntitySpecificContentGenerator,
    ProjectFileGenerator
} from './content-generator';

export class AspProject_ProjectFileGenerator extends ProjectFileGenerator {
    generate() {
        const defaultNamespace = this.getProjectDefaultNamespaceIfRequired(AspProjectSG);
        const coreProjectName = CoreProjectSG.getProjectName(this.module);

        const content = `<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>netcoreapp3.1</TargetFramework>${defaultNamespace}
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

export class AspProject_EntityManagerClassGenerator extends CSharpEntitySpecificContentGenerator {
    generate() {
        const namespace = AspProjectSG.getDefaultNamespace(this.item.module);
        const entityName = this.item.name;
        const entityGenericTypeParameters = this.features.itemGenericTypeParameters(this.item);
        const entityGenericTypeConstraints = this.features.itemGenericTypeConstraints(this.item, 2);
        const constructorParametersData = [];
        const baseConstructorParametersData = [];

        constructorParametersData.push(
            `I${entityName}Store${entityGenericTypeParameters} store`,
            `I${entityName}Accessor${entityGenericTypeParameters} accessor`,
            `IEnumerable<IValidator${entityGenericTypeParameters}> validators`,
            `ILogger<${entityName}Manager${entityGenericTypeParameters}> logger`
        );
        baseConstructorParametersData.push('store', 'accessor', 'validators', 'logger');

        for (const feature of this.features.allFeatures) {
            if (feature.itemHasFeature(this.item)) {
                feature.asp_EntityManagerClass_ConstructorParametersData(this.item, constructorParametersData);
                feature.asp_EntityManagerClass_BaseConstructorParametersData(this.item, baseConstructorParametersData);
            }
        }

        constructorParametersData.push('IHttpContextAccessor contextAccessor');

        const constructorParameters = StringHelper.joinLines(_.uniq(constructorParametersData), 3, ',', { start: 1 });
        const baseConstructorParameters = _.uniq(baseConstructorParametersData).join(', ');

        const content = `using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using MotiNet.Entities;
using System.Collections.Generic;
using System.Threading;

namespace ${namespace}
{
    public class AspNet${entityName}Manager${entityGenericTypeParameters} : ${entityName}Manager${entityGenericTypeParameters}
${entityGenericTypeConstraints}
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

export class AspProject_OptionsClassGenerator extends CSharpModuleSpecificContentGenerator {
    generate() {
        const namespace = AspProjectSG.getDefaultNamespace(this.module);
        const moduleCommonName = IdentifierHelper.getModuleCommonName(this.module);

        const content = `namespace ${namespace}
{
    public partial class AspNet${moduleCommonName}Options
    { }
}
`;

        return content;
    }
}

export class AspProject_DependencyInjectionClassGenerator extends CSharpModuleSpecificContentGenerator {
    generate() {
        const namespace = AspProjectSG.getDefaultNamespace(this.module);
        const moduleCommonName = IdentifierHelper.getModuleCommonName(this.module);
        const serviceRegistrationsData = [];

        for (const item of this.module.items) {
            const entityName = item.name;
            const entityEmptyGenericTypeParameters = this.features.itemEmptyGenericTypeParameters(item);
            const entityMakeGenericTypeParameters = this.features.itemMakeGenericTypeParameters(item);

            serviceRegistrationsData.push(
                `services.AddScoped(
    typeof(I${entityName}Manager${entityEmptyGenericTypeParameters}).MakeGenericType(${entityMakeGenericTypeParameters}),
    typeof(AspNet${entityName}Manager${entityEmptyGenericTypeParameters}).MakeGenericType(${entityMakeGenericTypeParameters}));`);
        }

        const serviceRegistrations = StringHelper.joinLines(_.uniq(serviceRegistrationsData), 1, '\n', { start: 1, end: 1 });

        var body;

        if (this.module.hasAspNetCoreOptions === true) {
            body = `public static ${moduleCommonName}Builder AddAspNetCore(this ${moduleCommonName}Builder builder) => builder.AddAspNetCore(setupAction: null);

public static ${moduleCommonName}Builder AddAspNetCore(this ${moduleCommonName}Builder builder, Action<AspNet${moduleCommonName}Options> setupAction)
{
    var services = builder.Services;

    // Hosting doesn't add IHttpContextAccessor by default
    services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
${serviceRegistrations}
    if (setupAction != null)
    {
        services.Configure(setupAction);
    }

    var internalMethod = typeof(AspNet${moduleCommonName}BuilderExtensions).GetMethod("AddAspNetCoreInternal",
        System.Reflection.BindingFlags.Static | System.Reflection.BindingFlags.NonPublic);

    if (internalMethod != null)
    {
        internalMethod.Invoke(null, new object[] { builder, setupAction });
    }

    return builder;
}`;
        } else {
            body = `public static ${moduleCommonName}Builder AddAspNetCore(this ${moduleCommonName}Builder builder)
{
    var services = builder.Services;

    // Hosting doesn't add IHttpContextAccessor by default
    services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
${serviceRegistrations}
    var internalMethod = typeof(AspNet${moduleCommonName}BuilderExtensions).GetMethod("AddAspNetCoreInternal",
        System.Reflection.BindingFlags.Static | System.Reflection.BindingFlags.NonPublic);

    if (internalMethod != null)
    {
        internalMethod.Invoke(null, new object[] { builder });
    }

    return builder;
}`;
        }

        body = StringHelper.indent(body, 2);

        const content = `using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection.Extensions;
using System;
using ${namespace};

namespace Microsoft.Extensions.DependencyInjection
{
    public static class AspNet${moduleCommonName}BuilderExtensions
    {
${body}
    }
}
`;

        return content;
    }
}
