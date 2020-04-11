import 'prismjs/components/prism-csharp';
import ContentHelper from '../content-helper';

import { ContentGenerator, CSharpContentGenerator } from './content-generator';

export class CoreProject_EntityManagerInterfaceGenerator extends CSharpContentGenerator {
    constructor(item) {
        super();

        this.item = item;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.item.module);
        const entityName = this.item.name;

        var content = `using MotiNet.Entities;

namespace ${namespace}
{
    // Entity Features: None

    public interface I${entityName}Manager<T${entityName}>
        : IEntityManager<T${entityName}>
        where T${entityName} : class
    { }
}
`;

        return content;
    }
}

export class CoreProject_EntityStoreInterfaceGenerator extends CSharpContentGenerator {
    constructor(item) {
        super();

        this.item = item;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.item.module);
        const entityName = this.item.name;

        var content = `using MotiNet.Entities;

namespace ${namespace}
{
    public interface I${entityName}Store<T${entityName}>
        : IEntityStore<T${entityName}>
        where T${entityName} : class
    { }
}
`;

        return content;
    }
}

export class CoreProject_EntityAccessorInterfaceGenerator extends CSharpContentGenerator {
    constructor(item) {
        super();

        this.item = item;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.item.module);
        const entityName = this.item.name;

        var content = `using MotiNet.Entities;

namespace ${namespace}
{
    public interface I${entityName}Accessor<T${entityName}>
        : IEntityAccessor<T${entityName}>
        where T${entityName} : class
    { }
}
`;

        return content;
    }
}

export class CoreProject_EntityManagerClassGenerator extends CSharpContentGenerator {
    constructor(item) {
        super();

        this.item = item;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.item.module);
        const entityName = this.item.name;
        const lowerCaseEntityName = ContentHelper.getLowerCaseEntityName(entityName);

        var content = `using Microsoft.Extensions.Logging;
using MotiNet.Entities;
using System;
using System.Collections.Generic;

namespace ${namespace}
{
    public class ${entityName}Manager<T${entityName}> : ManagerBase<T${entityName}>, I${entityName}Manager<T${entityName}>
        where T${entityName} : class
    {
        public ${entityName}Manager(
            I${entityName}Store<T${entityName}> store,
            I${entityName}Accessor<T${entityName}> ${lowerCaseEntityName}Accessor,
            IEnumerable<IValidator<T${entityName}>> ${lowerCaseEntityName}Validators,
            ILogger<${entityName}Manager<T${entityName}>> logger)
            : base(store, ${lowerCaseEntityName}Accessor, ${lowerCaseEntityName}Validators, logger)
        { }

        public IEntityStore<T${entityName}> EntityStore => Store as IEntityStore<T${entityName}>;

        public IEntityAccessor<T${entityName}> EntityAccessor => Accessor as IEntityAccessor<T${entityName}>;

        public I${entityName}Store<T${entityName}> ${entityName}Store => Store as I${entityName}Store<T${entityName}>;

        public I${entityName}Accessor<T${entityName}> ${entityName}Accessor => Accessor as I${entityName}Accessor<T${entityName}>;
    }
}
`;

        return content;
    }
}

export class CoreProject_EntityValidatorClassGenerator extends CSharpContentGenerator {
    constructor(item) {
        super();

        this.item = item;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.item.module);
        const moduleName = ContentHelper.getModuleName(this.item.module);
        const entityName = this.item.name;
        const lowerCaseEntityName = ContentHelper.getLowerCaseEntityName(entityName);

        var content = `using MotiNet;
using MotiNet.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ${namespace}
{
    public class ${entityName}Validator<T${entityName}> : IValidator<T${entityName}>
        where T${entityName} : class
    {
        public ${entityName}Validator(I${entityName}Accessor<T${entityName}> accessor, ${moduleName}ErrorDescriber errorDescriber)
        {
            Accessor = accessor;
            ErrorDescriber = errorDescriber;
        }

        protected I${entityName}Accessor<T${entityName}> Accessor { get; }

        private ${moduleName}ErrorDescriber ErrorDescriber { get; }

        public async Task<GenericResult> ValidateAsync(object manager, T${entityName} ${lowerCaseEntityName})
        {
            var theManager = this.GetManager<T${entityName}, I${entityName}Manager<T${entityName}>>(manager);
            var errors = new List<GenericError>();

            return GenericResult.GetResult(errors);
        }
    }
}
`;

        return content;
    }
}

export class CoreProject_ErrorDescriberClassGenerator extends CSharpContentGenerator {
    constructor(module) {
        super();

        this.module = module;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.module);
        const moduleName = ContentHelper.getModuleName(this.module);

        var content = `using Microsoft.Extensions.Localization;
using ${namespace}.Resources;
using MotiNet;

namespace ${namespace}
{
    public class ${moduleName}ErrorDescriber
    {
        #region Fields

        private readonly IStringLocalizer _localizer;

        #endregion

        #region Constructors

        public ${moduleName}ErrorDescriber(IStringLocalizer<${moduleName}ErrorDescriberResources> localizer) => _localizer = localizer;

        protected ${moduleName}ErrorDescriber(IStringLocalizer localizer) => _localizer = localizer;

        #endregion
    }
}
`;

        return content;
    }
}

export class CoreProject_ErrorDescriberResourcesClassGenerator extends CSharpContentGenerator {
    constructor(module) {
        super();

        this.module = module;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.module);
        const moduleName = ContentHelper.getModuleName(this.module);

        var content = `namespace ${namespace}.Resources
{
    public class ${moduleName}ErrorDescriberResources { }
}
`;

        return content;
    }
}

export class CoreProject_ErrorDescriberResourcesResxGenerator extends ContentGenerator {
    constructor(module) {
        super();

        this.module = module;
    }

    get language() { return 'markup'; }

    generate() {
        const items = '';

        var content = ContentHelper.generateResourceFileContent(items);

        return content;
    }
}

export class CoreProject_BuilderClassGenerator extends CSharpContentGenerator {
    constructor(module) {
        super();

        this.module = module;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.module);
        const moduleName = ContentHelper.getModuleName(this.module);

        var constructorParameters = '';
        var constructBuilderParameters = '';
        var properties = '';
        for (const item of this.module.items) {
            const entityName = item.name;
            const lowerCaseEntityName = ContentHelper.getLowerCaseEntityName(entityName);

            constructorParameters += `,
            Type ${lowerCaseEntityName}Type`;

            constructBuilderParameters += `,
                ${lowerCaseEntityName}Type`;

            properties += `
        public Type ${entityName}Type { get; private set; }
`;
        }

        var content = `using Microsoft.Extensions.DependencyInjection;
using MotiNet.Entities;
using System;

namespace ${namespace}
{
    public class ${moduleName}Builder : BuilderBase
    {
        public ${moduleName}Builder(
            IServiceCollection services${constructorParameters})
            : base(services)
            => BuilderHelper.ConstructBuilder(
                this, typeof(${moduleName}Builder).GetConstructors()[0],
                services${constructBuilderParameters});

        #region Properties
${properties}
        #endregion
    }
}
`;

        return content;
    }
}

export class CoreProject_DependencyInjectionClassGenerator extends CSharpContentGenerator {
    constructor(module) {
        super();

        this.module = module;
    }

    generate() {
        const namespace = ContentHelper.get_CoreProject_Namespace(this.module);
        const moduleName = ContentHelper.getModuleName(this.module);

        var genericParameters = '';
        var genericParameterSpecifications = '';
        var registrations = '';
        var builderConstructorParameters = '';

        for (const item of this.module.items) {
            const entityName = item.name;

            genericParameters += `
            T${entityName},`;

            genericParameterSpecifications += `
            where T${entityName} : class`;

            registrations += `
            services.TryAddScoped<I${entityName}Manager<T${entityName}>, ${entityName}Manager<T${entityName}>>();
            services.TryAddScoped<IValidator<T${entityName}>, ${entityName}Validator<T${entityName}>>();
`;

            builderConstructorParameters += `,
                typeof(T${entityName})`;
        }

        if (this.module.items.length > 0) {
            genericParameters = '<' + genericParameters.substr(0, genericParameters.length - 1) + '>';
        }

        var content = `using Microsoft.Extensions.DependencyInjection.Extensions;
using MotiNet.Entities;
using ${namespace};

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ${moduleName}ServiceCollectionExtensions
    {
        public static ${moduleName}Builder Add${moduleName}${genericParameters}(
            this IServiceCollection services)${genericParameterSpecifications}
        {${registrations}
            // Features

            services.TryAddScoped<${moduleName}ErrorDescriber, ${moduleName}ErrorDescriber>();

            return new ${moduleName}Builder(
                services${builderConstructorParameters});
        }
    }
}
`;

        return content;
    }
}
