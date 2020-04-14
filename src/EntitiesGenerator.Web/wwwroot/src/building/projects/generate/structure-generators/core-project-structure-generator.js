﻿// Core

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
     * @param {AllFeaturesGenerator} features
     * @param {Module} module
     */
    generateProjectStructure(features, module) {
        const projectName = CoreProjectSG.getProjectName(module);
        const moduleCommonName = IdentifierHelper.getModuleCommonName(module);
        const validationRequired = features.moduleValidationRequired(module);
        const entitiesFolder = this.generateEntitiesFolderStructure(features, module);

        const projectFolder = {
            type: 'folder',
            folderType: 'projectFolder',
            name: projectName,
            children: [
                {
                    type: 'file',
                    fileType: 'projectFile',
                    name: projectName + '.csproj',
                    generator: new CG.CoreProject_ProjectFileGenerator(features, module)
                },
                entitiesFolder
            ]
        };

        if (validationRequired) {
            projectFolder.children.push(
                {
                    type: 'file',
                    name: moduleCommonName + 'ErrorDescriber.cs',
                    generator: new CG.CoreProject_ErrorDescriberClassGenerator(features, module)
                },
                {
                    type: 'folder',
                    name: 'Resources',
                    children: [
                        {
                            type: 'file',
                            name: moduleCommonName + 'ErrorDescriberResources.cs',
                            generator: new CG.CoreProject_ErrorDescriberResourcesClassGenerator(features, module)
                        },
                        {
                            type: 'file',
                            name: moduleCommonName + 'ErrorDescriberResources.resx',
                            generator: new CG.CoreProject_ErrorDescriberResourcesResxGenerator(features, module)
                        }
                    ]
                }
            );
        }

        projectFolder.children.push(
            {
                type: 'file',
                name: moduleCommonName + 'Builder.cs',
                generator: new CG.CoreProject_BuilderClassGenerator(features, module)
            },
            {
                type: 'folder',
                name: 'DependencyInjection',
                children: [
                    {
                        type: 'file',
                        name: moduleCommonName + 'ServiceCollectionExtensions.cs',
                        generator: new CG.CoreProject_DependencyInjectionClassGenerator(features, module)
                    }
                ]
            }
        );

        return projectFolder;
    }

    /**
     * @param {AllFeaturesGenerator} features
     * @param {Module} module
     */
    generateEntitiesFolderStructure(features, module) {
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
                        generator: new CG.CoreProject_EntityManagerInterfaceGenerator(features, item)
                    },
                    {
                        type: 'file',
                        name: 'I' + item.name + 'Store.cs',
                        generator: new CG.CoreProject_EntityStoreInterfaceGenerator(features, item)
                    },
                    {
                        type: 'file',
                        name: 'I' + item.name + 'Accessor.cs',
                        generator: new CG.CoreProject_EntityAccessorInterfaceGenerator(features, item)
                    },
                    {
                        type: 'file',
                        name: item.name + 'Manager.cs',
                        generator: new CG.CoreProject_EntityManagerClassGenerator(features, item)
                    }
                ]
            };

            if (validationRequired) {
                entityFolder.children.push({
                    type: 'file',
                    name: item.name + 'Validator.cs',
                    generator: new CG.CoreProject_EntityValidatorClassGenerator(features, item)
                });
            }

            folder.children.push(entityFolder);
        }

        return folder;
    }
}
