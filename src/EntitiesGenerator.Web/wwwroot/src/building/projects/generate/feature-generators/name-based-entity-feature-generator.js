import ContentHelper from '../content-helper';
import FeatureGenerator from './feature-generator';

export default class NameBasedEntityFeatureGenerator extends FeatureGenerator {
    get featureType() {
        return 'NameBasedEntity';
    }

    // IntelliSense support
    /**
     * @param {Item} item
     * @return {NameBasedEntityFeatureSetting}
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

    // Project specific content

    // Core

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerInterface_ManagerInterfacesData(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push(`INameBasedEntityManager${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityStoreInterface_StoreInterfacesData(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push(`INameBasedEntityStore${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityAccessorInterface_AccessorInterfacesData(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push(`INameBasedEntityAccessor${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_ConstructorParametersData(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push(`ILookupNormalizer<T${item.name}> nameNormalizer`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesAssignmentsData(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push('NameNormalizer = nameNormalizer ?? throw new ArgumentNullException(nameof(nameNormalizer));');
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesDeclarations1Data(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push(`public INameBasedEntityStore${this.itemGenericTypeParameters(item)} NameBasedEntityStore => Store as INameBasedEntityStore${this.itemGenericTypeParameters(item)};`);
        data.push(`public INameBasedEntityAccessor${this.itemGenericTypeParameters(item)} NameBasedEntityAccessor => Accessor as INameBasedEntityAccessor${this.itemGenericTypeParameters(item)};`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesDeclarations2Data(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push('public ILookupNormalizer NameNormalizer { get; }');
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityValidatorClass_ValidationsData(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push(`await this.ValidateNameAsync(theManager, Accessor, ${_.lowerFirst(item.name)}, errors,
    name => ErrorDescriber.Invalid${item.name}Name(name), name => ErrorDescriber.Duplicate${item.name}Name(name));`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_ErrorDescriberClass_DescribersData(item, data) {
        this.throwIfItemNotHasFeature(item);

        const entityName = item.name;
        const lowerFirstEntityName = _.lowerFirst(entityName);

        data.push(`public virtual GenericError Invalid${entityName}Name(string ${lowerFirstEntityName}Name)
    => new GenericError
    {
        Code = nameof(Invalid${entityName}Name),
        Description = _localizer[nameof(Invalid${entityName}Name), ${lowerFirstEntityName}Name]
    };

public virtual GenericError Duplicate${entityName}Name(string ${lowerFirstEntityName}Name)
    => new GenericError
    {
        Code = nameof(Duplicate${entityName}Name),
        Description = _localizer[nameof(Duplicate${entityName}Name), ${lowerFirstEntityName}Name]
    };`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_ErrorDescriberResourcesClass_ItemsData(item, data) {
        this.throwIfItemNotHasFeature(item);

        data.push(`<data name="Duplicate${item.name}Name" xml:space="preserve">
  <value>${item.displayName} name '{0}' has already been used.</value>
</data>
<data name="Invalid${item.name}Name" xml:space="preserve">
  <value>${item.displayName} name '{0}' is invalid.</value>
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
