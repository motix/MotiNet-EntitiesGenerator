import AllFeaturesGenerator from "../feature-generators/all-features-generator";
import AllRelationshipsGenerator from "../relationship-generators/all-relationships-generator";

export class ContentGenerator {
    /**
     * @param {AllFeaturesGenerator} features
     * @param {AllRelationshipsGenerator} relationships
     */
    constructor(features, relationships) {
        this.features = features;
        this.relationships = relationships;
    }

    get language() { return ''; }

    generate() { }
}

export class CSharpContentGenerator {
    get language() { return 'csharp'; }
}

export class ProjectSpecificContentGenerator extends ContentGenerator {
    /**
     * @param {AllFeaturesGenerator} features
     * @param {AllRelationshipsGenerator} relationships
     * @param {Project} project
     */
    constructor(features, relationships, project) {
        super(features, relationships);

        this.project = project;
    }
}

export class CSharpProjectSpecificContentGenerator extends ProjectSpecificContentGenerator {
    get language() { return 'csharp'; }
}

export class ModuleSpecificContentGenerator extends ContentGenerator {
    /**
     * @param {AllFeaturesGenerator} features
     * @param {AllRelationshipsGenerator} relationships
     * @param {Module} module
     */
    constructor(features, relationships, module) {
        super(features, relationships);

        this.module = module;
    }
}

export class CSharpModuleSpecificContentGenerator extends ModuleSpecificContentGenerator {
    get language() { return 'csharp'; }
}

export class EntitySpecificContentGenerator extends ContentGenerator {
    /**
     * @param {AllFeaturesGenerator} features
     * @param {AllRelationshipsGenerator} relationships
     * @param {Item} item
     */
    constructor(features, relationships, item) {
        super(features, relationships);

        this.item = item;
    }
}

export class CSharpEntitySpecificContentGenerator extends EntitySpecificContentGenerator {
    get language() { return 'csharp'; }
}

export class ProjectFileGenerator extends ModuleSpecificContentGenerator {
    get language() { return 'xml'; }

    getProjectDefaultNamespaceIfRequired(structureGeneratorClass) {
        const projectName = structureGeneratorClass.getProjectName(this.module);
        const namespace = structureGeneratorClass.getDefaultNamespace(this.module);

        return projectName === namespace ? '' : `
    <RootNamespace>${namespace}</RootNamespace>`;
    }
}
