import '../types';
import 'lodash';

export default class FeatureGenerator {
    get featureType() {
        return null;
    }

    /**
     * @param {Item} item
     */
    itemHasFeature(item) {
        return this.itemFeatureSetting(item) !== null;
    }

    /**
     * @param {Item} item
     * @return {FeatureSetting}
     */
    itemFeatureSetting(item) {
        const propertyName = _.lowerFirst(`${this.featureType}FeatureSetting`);
        return item[propertyName];
    }

    /**
     * @param {Module} module
     */
    moduleValidationRequired(module) {
        for (const item of module.items) {
            if (this.itemHasFeature(item) && this.itemValidationRequired(item)) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param {Item} item
     */
    itemValidationRequired(item) {
        this.throwIfItemNotHaveFeature(item);

        return false;
    }

    /**
     * @param {Item} item
     * @return {EntityNameListItem[]}
     */
    itemEntityNames(item) {
        this.throwIfItemNotHaveFeature(item);

        return [{
            item: item,
            name: item.name,
            lineBreak: item.parameterListLineBreak
        }];
    }

    /**
     * @param {Item} item
     */
    itemGenericTypeParameters(item) {
        const entities = this.itemEntityNames(item);
        const parameters = _.map(entities, value => `T${value.name}`);

        var str = parameters.join(', ');
        str = `<${str}>`;

        return str;
    }

    /**
     * @param {Item} item
     */
    itemSpecificTypeParameters(item) {
        const entities = this.itemEntityNames(item);
        const parameters = _.map(entities, 'name');

        var str = parameters.join(', ');
        str = `<${str}>`;

        return str;
    }

    /**
     * @param {Item} item
     */
    throwIfItemNotHaveFeature(item) {
        if (!this.itemHasFeature(item)) {
            const error = new ItemNotHasFeatureError(item, this);
            console.error(error);
            throw error.message;
        }
    }

    /**
     * @param {Item} item
     */
    throwIfItemHasFeature(item) {
        if (this.itemHasFeature(item)) {
            const error = new ItemHasFeatureError(item, this);
            console.error(error);
            throw error.message;
        }
    }

    // Project specific content

    // Core

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerInterface_FeaturesCommentData(item, data) {
        this.throwIfItemNotHaveFeature(item);

        data.push(this.featureType);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerInterface_ManagerInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityStoreInterface_StoreInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityAccessorInterface_AccessorInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_ConstructorParametersData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesAssignmentsData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesDeclarations1Data(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityManagerClass_PropertiesDeclarations2Data(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityValidatorClass_ValidationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_EntityValidatorClass_SubEntityValidateMethodsData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_ErrorDescriberClass_DescriberMethodsData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {{key: string, xml: string}[]} data
     */
    core_ErrorDescriberResourcesResx_ItemsData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {ParameterListItem[]} data
     */
    core_BuilderClass_ConstructorParametersData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {ParameterListItem[]} data
     */
    core_BuilderClass_ConstructBuilderParametersData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_BuilderClass_PropertiesDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    core_DependencyInjectionClass_EntityServiceRegistrationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    // SealedModels

    /**
     * @param {Item} item
     * @param {Folder} folder
     */
    sm_SpecificationsFolder_GenerateSpecification(item, folder) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_EntityInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_EntityInterfacesData_FromOthers(item, data) {
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_EntityPropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_EntityPropertyDeclarationsData_FromOthers(item, data) {
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_RelationshipsPropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_RelationshipsPropertyDeclarationsData_FromOthers(item, data) {
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_CustomizationPropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityClass_CustomizationPropertyDeclarationsData_FromOthers(item, data) {
    }

    /**
     * @param {Item} item
     * @param {string} subEntityName
     * @param {string[]} data
     */
    sm_SubEntityClass_EntityInterfacesData_FromOthers(item, subEntityName, data) {
    }

    /**
     * @param {Item} item
     * @param {string} subEntityName
     * @param {string[]} data
     */
    sm_SubEntityClass_EntityPropertyDeclarationsData_FromOthers(item, subEntityName, data) {
    }

    /**
     * @param {Item} item
     * @param {string} subEntityName
     * @param {string[]} data
     */
    sm_SubEntityClass_RelationshipsPropertyDeclarationsData_FromOthers(item, subEntityName, data) {
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityAccessorClass_AccessorMethodsData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_EntityAccessorClass_AccessorMethodsData_FromOthers(item, data) {
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    sm_DependencyInjectionClass_ServiceRegistrationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    // EntityFrameworkCore

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    ef_DbContextClass_PropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    ef_DbContextClass_ConfigureEntityRegistrationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    ef_DbContextClass_ConfigureEntityMethodsData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    // EntityFrameworkCore.SealedModels

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    efSm_DbContextClass_EntityConfigurationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    efSm_DbContextClass_EntityConfigurationsData_FromOthers(item, data) {
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    efSm_EntityStoreClass_StoreBaseData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    efSm_EntityStoreClass_StoreInterfacesData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {ParameterListItem[]} data
     */
    efSm_EntityStoreClass_ConstructorParametersData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    efSm_EntityStoreClass_ConstructorBodyData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    efSm_EntityStoreClass_StorePropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    efSm_EntityStoreClass_StoreMethodDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    efSm_EntityStoreClass_StoreMemberDeclarationsData_FeatureAbsent(item, data) {
        this.throwIfItemHasFeature(item);
    }

    // AspNetCore

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    asp_EntityManagerClass_ConstructorParametersData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    asp_EntityManagerClass_BaseConstructorParametersData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    // AspNetCore.Mvc.DefaultViewModels

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_EntityViewModelsClass_BasePropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_EntityViewModelsClass_BasePropertyDeclarationsData_FromOthers(item, data) {
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_EntityViewModelsClass_FullPropertyDeclarationsData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_EntityViewModelsClass_FullPropertyDeclarationsData_FromOthers(item, data) {
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_SubEntityViewModelsClass_BasePropertyDeclarationsData_FromOthers(item, data) {
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_SubEntityViewModelsClass_FullPropertyDeclarationsData_FromOthers(item, data) {
    }

    /**
     * @param {Item} item
     * @param {{key: string, content: string}[]} data
     */
    aspDv_DisplayNamesResx_ItemsData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {{key: string, content: string}[]} data
     */
    aspDv_DisplayNamesResxDesignerClass_ItemsData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_ProfileClass_CreateEntityMapChainedMethodsData(item, data) {
        this.throwIfItemNotHaveFeature(item);
    }

    /**
     * @param {Item} item
     * @param {string[]} data
     */
    aspDv_ProfileClass_CreateEntityMapChainedMethodsData_FromOthers(item, data) {
    }
}

class ItemNotHasFeatureError {
    /**
     * @param {Item} item
     * @param {FeatureGenerator} featureGenerator
     */
    constructor(item, featureGenerator) {
        this.item = item;
        this.featureGenerator = featureGenerator;
        this.itemName = item.name;
        this.featureType = featureGenerator.featureType;
        this.message = `Item ${this.itemName} does not have feature ${this.featureType}. This operation cannot perform if this item does not have the feature.`;
    }
}

class ItemHasFeatureError {
    /**
     * @param {Item} item
     * @param {FeatureGenerator} featureGenerator
     */
    constructor(item, featureGenerator) {
        this.item = item;
        this.featureGenerator = featureGenerator;
        this.itemName = item.name;
        this.featureType = featureGenerator.featureType;
        this.message = `Item ${this.itemName} has feature ${this.featureType}. This operation cannot perform if this item has the feature.`;
    }
}
