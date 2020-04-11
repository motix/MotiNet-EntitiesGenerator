import 'prismjs/components/prism-csharp';
import ContentHelper from '../content-helper';

import { CSharpContentGenerator } from './content-generator';

export class AspNetCoreProject_EntityManagerClassGenerator extends CSharpContentGenerator {
    constructor(item) {
        super();

        this.item = item;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.item.module);
        const entityName = this.item.name;
        const lowerCaseEntityName = ContentHelper.getLowerCaseEntityName(entityName);

        var content = `using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using MotiNet.Entities;
using System.Collections.Generic;
using System.Threading;

namespace ${namespace}
{
    public class AspNet${entityName}Manager<T${entityName}> : ${entityName}Manager<T${entityName}> where T${entityName} : class
    {
        private readonly CancellationToken _cancel;
        
        public AspNet${entityName}Manager(
            I${entityName}Store<T${entityName}> store,
            I${entityName}Accessor<T${entityName}> ${lowerCaseEntityName}Accessor,
            IEnumerable<IValidator<T${entityName}>> ${lowerCaseEntityName}Validators,
            ILogger<${entityName}Manager<T${entityName}>> logger,
            IHttpContextAccessor contextAccessor)
            : base(store, ${lowerCaseEntityName}Accessor, ${lowerCaseEntityName}Validators, logger)
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

            registrations += `
            builder.Services.AddScoped(typeof(I${entityName}Manager<>).MakeGenericType(builder.${entityName}Type), typeof(AspNet${entityName}Manager<>).MakeGenericType(builder.${entityName}Type));`;
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
