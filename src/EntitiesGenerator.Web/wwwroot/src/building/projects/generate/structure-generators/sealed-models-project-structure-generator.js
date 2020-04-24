// SealedModels

import { IdentifierHelper } from '../content-helper';
import * as CG from '../content-generators/content-generators';
import AllFeaturesGenerator from '../feature-generators/all-features-generator';
import AllRelationshipsGenerator from '../relationship-generators/all-relationships-generator';

export class SmProjectSG {
    /**
     * @param {Module} module
     */
    static getProjectName(module) {
        return `${IdentifierHelper.getModuleRootNamespace(module)}.SealedModels`;
    }

    /**
     * @param {Module} module
     */
    static getDefaultNamespace(module) {
        return IdentifierHelper.getModuleRootNamespace(module);
    }

    /**
     * @param {AllFeaturesGenerator} features
     * @param {AllRelationshipsGenerator} relationships
     * @param {Module} module
     */
    generateProjectStructure(features, relationships, module) {
        const projectName = SmProjectSG.getProjectName(module);
        const moduleCommonName = IdentifierHelper.getModuleCommonName(module);

        const projectFolder = {
            type: 'folder',
            folderType: 'projectFolder',
            name: projectName,
            children: [
                {
                    type: 'file',
                    fileType: 'projectFile',
                    name: `${projectName}.csproj`,
                    generator: new CG.SmProject_ProjectFileGenerator(features, relationships, module)
                }
            ]
        }

        if (module.items.length > 0) {
            const entitiesFolder = this.generateEntitiesFolderStructure(features, relationships, module);
            const accessorsFolder = this.generateAccessorsFolderStructure(features, relationships, module);
            const specificationsFolder = this.generateSpecificationFolderStructure(features, relationships, module);

            projectFolder.children.push(entitiesFolder, accessorsFolder);

            if (specificationsFolder.children.length > 0) {
                projectFolder.children.push(specificationsFolder);
            }
        }

        projectFolder.children.push({
            type: 'folder',
            name: 'DependencyInjection',
            children: [
                {
                    type: 'file',
                    name: `SealedModels${moduleCommonName}BuilderExtensions.cs`,
                    generator: new CG.SmProject_DependencyInjectionClassGenerator(features, relationships, module)
                }
            ]
        });

        return projectFolder;
    }

    /**
     * @param {AllFeaturesGenerator} features
     * @param {AllRelationshipsGenerator} relationships
     * @param {Module} module
     */
    generateEntitiesFolderStructure(features, relationships, module) {
        const folder = {
            type: 'folder',
            name: '_Entities',
            children: []
        };

        const entities = features.moduleEntityNames(module);

        for (const entity of entities) {
            folder.children.push({
                type: 'file',
                name: `${entity.name}.cs`,
                generator: entity.isUnmanagedSubEntity === true ?
                    new CG.SmProject_SubEntityClassGenerator(features, relationships, entity.item, entity.name) :
                    new CG.SmProject_EntityClassGenerator(features, relationships, entity.item)
            });
        }

        return folder;
    }

    /**
     * @param {AllFeaturesGenerator} features
     * @param {AllRelationshipsGenerator} relationships
     * @param {Module} module
     */
    generateAccessorsFolderStructure(features, relationships, module) {
        const folder = {
            type: 'folder',
            name: '_Accessors',
            children: []
        };

        for (const item of module.items) {
            folder.children.push({
                type: 'file',
                name: `${item.name}Accessor.cs`,
                generator: new CG.SmProject_EntityAccessorClassGenerator(features, relationships, item)
            });
        }

        return folder;
    }

    /**
     * @param {AllFeaturesGenerator} features
     * @param {AllRelationshipsGenerator} relationships
     * @param {Module} module
     */
    generateSpecificationFolderStructure(features, relationships, module) {
        const folder = {
            type: 'folder',
            name: '_Specifications',
            children: []
        };

        for (const item of module.items) {
            for (const feature of features.allFeatures) {
                if (feature.itemHasFeature(item)) {
                    feature.sm_SpecificationsFolder(item, folder);
                }
            }
        }

        return folder;
    }
}
