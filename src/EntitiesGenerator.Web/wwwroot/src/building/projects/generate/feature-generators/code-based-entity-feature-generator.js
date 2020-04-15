import ContentHelper from '../content-helper';
import FeatureGenerator from './feature-generator';

export default class CodeBasedEntityFeatureGenerator extends FeatureGenerator {
    get featureType() {
        return 'CodeBasedEntity';
    }

    // IntelliSense support
    /**
     * @param {Item} item
     * @return {CodeBasedEntityFeatureSetting}
     */
    itemFeatureSetting(item) {
        return super.itemFeatureSetting(item);
    }

    /**
     * @param {Item} item
     */
    itemValidationRequired(item) {
        this.throwIfItemNotHasFeature(item);

        return true;
    }

    // Feature settings

    /**
     * @param {Item} item
     */
    hasCodeGenerator(item) {
        return this.itemFeatureSetting(item).hasCodeGenerator;
    }

    // Project specific content

    // Core

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerInterface_ManagerInterfacesData(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push(`ICodeBasedEntityManager${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityStoreInterface_StoreInterfacesData(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push(`ICodeBasedEntityStore${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityAccessorInterface_AccessorInterfacesData(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push(`ICodeBasedEntityAccessor${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_ConstructorParametersData(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push(`ILookupNormalizer<T${item.name}> codeNormalizer`);

        if (this.hasCodeGenerator(item)) {
            data.push(`IEntityCodeGenerator<T${item.name}> codeGenerator`);
        }
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesAssignmentsData(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push('CodeNormalizer = codeNormalizer ?? throw new ArgumentNullException(nameof(codeNormalizer));');

        if (this.hasCodeGenerator(item)) {
            data.push('CodeGenerator = codeGenerator ?? throw new ArgumentNullException(nameof(codeGenerator));');
        }
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesDeclarations1Data(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push(`public ICodeBasedEntityStore${this.itemGenericTypeParameters(item)} CodeBasedEntityStore => Store as ICodeBasedEntityStore${this.itemGenericTypeParameters(item)};`);
        data.push(`public ICodeBasedEntityAccessor${this.itemGenericTypeParameters(item)} CodeBasedEntityAccessor => Accessor as ICodeBasedEntityAccessor${this.itemGenericTypeParameters(item)};`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesDeclarations2Data(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push('public ILookupNormalizer CodeNormalizer { get; }');

        if (this.hasCodeGenerator(item)) {
            data.push(`public IEntityCodeGenerator<T${item.name}> CodeGenerator { get; }`);
        } else {
            data.push(`public IEntityCodeGenerator<T${item.name}> CodeGenerator => null;`);
        }
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityValidatorClass_ValidationsData(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push(`await this.ValidateCodeAsync(theManager, Accessor, ${_.lowerFirst(item.name)}, errors,
    code => ErrorDescriber.Invalid${item.name}Code(code), code => ErrorDescriber.Duplicate${item.name}Code(code));`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_ErrorDescriberClass_DescribersData(item, data) {
        this.throwIfItemNotHasFeature(item);

        const entityName = item.name;
        const lowerFirstEntityName = _.lowerFirst(entityName);

        data.push(`public virtual GenericError Invalid${entityName}Code(string ${lowerFirstEntityName}Code)
    => new GenericError
    {
        Code = nameof(Invalid${entityName}Code),
        Description = _localizer[nameof(Invalid${entityName}Code), ${lowerFirstEntityName}Code]
    };

public virtual GenericError Duplicate${entityName}Code(string ${lowerFirstEntityName}Code)
    => new GenericError
    {
        Code = nameof(Duplicate${entityName}Code),
        Description = _localizer[nameof(Duplicate${entityName}Code), ${lowerFirstEntityName}Code]
    };`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_ErrorDescriberResourcesClass_ItemsData(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push(`<data name="Duplicate${item.name}Code" xml:space="preserve">
  <value>${item.displayName} code '{0}' has already been used.</value>
</data>
<data name="Invalid${item.name}Code" xml:space="preserve">
  <value>${item.displayName} code '{0}' is invalid.</value>
</data>`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_DependencyInjectionClass_EntityServiceRegistrationsData(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push(`services.TryAddScoped<ILookupNormalizer<T${item.name}>, LowerInvariantLookupNormalizer<T${item.name}>>();`);
    }
}
