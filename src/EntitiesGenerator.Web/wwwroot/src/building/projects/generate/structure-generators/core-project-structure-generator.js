// Core

import { IdentifierHelper } from '../content-helper';
import AllFeaturesGenerator from '../feature-generators/all-features-generator';
import * as CG from '../content-generators/content-generators';

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
     * @param {Module} module
     * @param {AllFeaturesGenerator} features
     */
    generateProjectStructure(module, features) {
        const projectName = CoreProjectSG.getProjectName(module);
        const moduleCommonName = IdentifierHelper.getModuleCommonName(module);
        const validationRequired = features.moduleValidationRequired(module);
        const entitiesFolder = this.generateEntitiesFolderStructure(module, features);

        const projectFolder = {
            type: 'folder',
            folderType: 'projectFolder',
            name: projectName,
            children: [
                {
                    type: 'file',
                    fileType: 'projectFile',
                    name: projectName + '.csproj',
                    generator: new CG.CoreProject_ProjectFileGenerator(module)
                },
                entitiesFolder
            ]
        };

        if (validationRequired) {
            projectFolder.children.push(
                {
                    type: 'file',
                    name: moduleCommonName + 'ErrorDescriber.cs',
                    generator: new CG.CoreProject_ErrorDescriberClassGenerator(module)
                },
                {
                    type: 'folder',
                    name: 'Resources',
                    children: [
                        {
                            type: 'file',
                            name: moduleCommonName + 'ErrorDescriberResources.cs',
                            generator: new CG.CoreProject_ErrorDescriberResourcesClassGenerator(module)
                        },
                        {
                            type: 'file',
                            name: moduleCommonName + 'ErrorDescriberResources.resx',
                            generator: new CG.CoreProject_ErrorDescriberResourcesResxGenerator(module)
                        }
                    ]
                }
            );
        }

        projectFolder.children.push(
            {
                type: 'file',
                name: moduleCommonName + 'Builder.cs',
                generator: new CG.CoreProject_BuilderClassGenerator(module)
            },
            {
                type: 'folder',
                name: 'DependencyInjection',
                children: [
                    {
                        type: 'file',
                        name: moduleCommonName + 'ServiceCollectionExtensions.cs',
                        generator: new CG.CoreProject_DependencyInjectionClassGenerator(module)
                    }
                ]
            }
        );

        return projectFolder;
    }

    /**
     * @param {Module} module
     * @param {AllFeaturesGenerator} features
     */
    generateEntitiesFolderStructure(module, features) {
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
                        name: 'I' + item.name + 'Manager.cs',
                        generator: new CG.CoreProject_EntityManagerInterfaceGenerator(item)
                    },
                    {
                        type: 'file',
                        name: 'I' + item.name + 'Store.cs',
                        generator: new CG.CoreProject_EntityStoreInterfaceGenerator(item)
                    },
                    {
                        type: 'file',
                        name: 'I' + item.name + 'Accessor.cs',
                        generator: new CG.CoreProject_EntityAccessorInterfaceGenerator(item)
                    },
                    {
                        type: 'file',
                        name: item.name + 'Manager.cs',
                        generator: new CG.CoreProject_EntityManagerClassGenerator(item)
                    }
                ]
            };

            if (validationRequired) {
                entityFolder.children.push({
                    type: 'file',
                    name: item.name + 'Validator.cs',
                    generator: new CG.CoreProject_EntityValidatorClassGenerator(item)
                });
            }

            folder.children.push(entityFolder);
        }

        return folder;
    }
}
