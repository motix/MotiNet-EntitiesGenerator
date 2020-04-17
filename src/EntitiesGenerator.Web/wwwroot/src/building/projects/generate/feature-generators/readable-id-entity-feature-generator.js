import FeatureGenerator from './feature-generator';

export default class ReadableIdEntityFeatureGenerator extends FeatureGenerator {
    get featureType() {
        return 'ReadableIdEntity';
    }

    // IntelliSense support
    /**
     * @param {Item} item
     * @return {ReadableIdEntityFeatureSetting}
     */
    itemFeatureSetting(item) {
        return super.itemFeatureSetting(item);
    }

    // Project specific content

    // Core

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerInterface_ManagerInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`IReadableIdEntityManager${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityAccessorInterface_AccessorInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`IReadableIdEntityAccessor${this.itemGenericTypeParameters(item)}`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesDeclarations1Data(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(`public IReadableIdEntityAccessor${this.itemGenericTypeParameters(item)} ReadableIdEntityAccessor => Accessor as IReadableIdEntityAccessor${this.itemGenericTypeParameters(item)};`);
    }

    // SealedModels

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_EntityPropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        const constructorModifier = item.abstractModel ? 'protected' : 'public';

        data.push(
            `${constructorModifier} ${item.name}() => Id = Guid.NewGuid().ToString();`,
            `[StringLength(StringLengths.Guid)]
public string Id { get; set; }`);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityAccessorClass_AccessorMethodsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        if (item.codeBasedEntityFeatureSetting !== null) {
            data.push(`public object GetIdSource(${item.name} ${_.lowerFirst(item.name)}) => ${_.lowerFirst(item.name)}.Code;`);
        } else if (item.nameBasedEntityFeatureSetting !== null ||
            item.scopedNameBasedEntityFeatureSetting !== null) {
            data.push(`public object GetIdSource(${item.name} ${_.lowerFirst(item.name)}) => ${_.lowerFirst(item.name)}.Name;`);
        } else {
            data.push(`// TODO:: Implement
public object GetIdSource(${item.name} ${_.lowerFirst(item.name)}) => throw new NotImplementedException();`);
        }
        data.push(`public void SetId(${item.name} ${_.lowerFirst(item.name)}, string id) => ${_.lowerFirst(item.name)}.Id = id;`);
    }

    // AspNetCore.Mvc.DefaultViewModels

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_EntityViewModelsClass_BasePropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(
            `protected ${item.name}ViewModelBase() => Id = Guid.NewGuid().ToString();`,
            'public string Id { get; set; }');
    }
}
