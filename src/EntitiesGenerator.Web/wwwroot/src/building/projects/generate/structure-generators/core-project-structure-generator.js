// Core

import { IdentifierHelper } from '../content-helper';
import * as CG from '../content-generators/content-generators';
import AllFeaturesGenerator from '../feature-generators/all-features-generator';
import AllRelationshipsGenerator from '../relationship-generators/all-relationships-generator';

export class CoreProjectSG {
    /**
     * @param {Module} module
     */
    static getProjectName(module) {
        return `${IdentifierHelper.getModuleRootNamespace(module)}.Core`;
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
        const projectName = CoreProjectSG.getProjectName(module);
        const moduleCommonName = IdentifierHelper.getModuleCommonName(module);
        const validationRequired = features.moduleValidationRequired(module);

        const projectFolder = {
            type: 'folder',
            folderType: 'projectFolder',
            name: projectName,
            children: [
                {
                    type: 'file',
                    fileType: 'projectFile',
                    name: `${projectName}.csproj`,
                    generator: new CG.CoreProject_ProjectFileGenerator(features, relationships, module)
                }
            ]
        };

        if (module.items.length > 0) {
            const entitiesFolder = this.generateEntitiesFolderStructure(features, relationships, module);
            projectFolder.children.push(entitiesFolder);
        }

        if (validationRequired) {
            projectFolder.children.push(
                {
                    type: 'file',
                    name: `${moduleCommonName}ErrorDescriber.cs`,
                    generator: new CG.CoreProject_ErrorDescriberClassGenerator(features, relationships, module)
                },
                {
                    type: 'folder',
                    name: 'Resources',
                    children: [
                        {
                            type: 'file',
                            name: `${moduleCommonName}ErrorDescriberResources.cs`,
                            generator: new CG.CoreProject_ErrorDescriberResourcesClassGenerator(features, relationships, module)
                        },
                        {
                            type: 'file',
                            name: `${moduleCommonName}ErrorDescriberResources.resx`,
                            generator: new CG.CoreProject_ErrorDescriberResourcesResxGenerator(features, relationships, module)
                        }
                    ]
                });
        }

        projectFolder.children.push(
            {
                type: 'file',
                name: `${moduleCommonName}Builder.cs`,
                generator: new CG.CoreProject_BuilderClassGenerator(features, relationships, module)
            });

        if (module.hasCoreOptions === true) {
            projectFolder.children.push(
                {
                    type: 'file',
                    name: `${moduleCommonName}Options.cs`,
                    generator: new CG.CoreProject_OptionsClassGenerator(features, relationships, module)
                });
        }

        projectFolder.children.push(
            {
                type: 'folder',
                name: 'DependencyInjection',
                children: [
                    {
                        type: 'file',
                        name: `${moduleCommonName}ServiceCollectionExtensions.cs`,
                        generator: new CG.CoreProject_DependencyInjectionClassGenerator(features, relationships, module)
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

        for (const item of module.items) {
            const validationRequired = features.itemValidationRequired(item);

            const entityFolder = {
                type: 'folder',
                name: '_' + item.name,
                children: [
                    {
                        type: 'file',
                        name: `I${item.name}Manager.cs`,
                        generator: new CG.CoreProject_EntityManagerInterfaceGenerator(features, relationships, item)
                    },
                    {
                        type: 'file',
                        name: `I${item.name}Store.cs`,
                        generator: new CG.CoreProject_EntityStoreInterfaceGenerator(features, relationships, item)
                    },
                    {
                        type: 'file',
                        name: `I${item.name}Accessor.cs`,
                        generator: new CG.CoreProject_EntityAccessorInterfaceGenerator(features, relationships, item)
                    },
                    {
                        type: 'file',
                        name: `${item.name}Manager.cs`,
                        generator: new CG.CoreProject_EntityManagerClassGenerator(features, relationships, item)
                    }
                ]
            };

            if (validationRequired) {
                entityFolder.children.push({
                    type: 'file',
                    name: `${item.name}Validator.cs`,
                    generator: new CG.CoreProject_EntityValidatorClassGenerator(features, relationships, item)
                });
            }

            folder.children.push(entityFolder);
        }

        return folder;
    }
}
