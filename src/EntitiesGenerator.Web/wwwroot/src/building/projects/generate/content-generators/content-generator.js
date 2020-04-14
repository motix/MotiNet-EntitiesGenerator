import AllFeaturesGenerator from "../feature-generators/all-features-generator";

export class ContentGenerator {
    /**
     * @param {AllFeaturesGenerator} features
     */
    constructor(features) {
        this.features = features;
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
     * @param {Project} project
     */
    constructor(features, project) {
        super(features);

        this.project = project;
    }
}

export class CSharpProjectSpecificContentGenerator extends ProjectSpecificContentGenerator {
    get language() { return 'csharp'; }
}

export class ModuleSpecificContentGenerator extends ContentGenerator {
    /**
     * @param {AllFeaturesGenerator} features
     * @param {Module} module
     */
    constructor(features, module) {
        super(features);

        this.module = module;
    }
}

export class CSharpModuleSpecificContentGenerator extends ModuleSpecificContentGenerator {
    get language() { return 'csharp'; }
}

export class EntitySpecificContentGenerator extends ContentGenerator {
    /**
     * @param {AllFeaturesGenerator} features
     * @param {Item} item
     */
    constructor(features, item) {
        super(features);

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
