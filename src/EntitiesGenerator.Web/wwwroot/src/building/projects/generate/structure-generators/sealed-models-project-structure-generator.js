// SealedModels

import { IdentifierHelper } from '../content-helper';
import AllFeaturesGenerator from '../feature-generators/all-features-generator';
import * as CG from '../content-generators/content-generators';

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
     * @param {Module} module
     * @param {AllFeaturesGenerator} features
     */
    generateProjectStructure(module, features) {
        const projectName = SmProjectSG.getProjectName(module);
        const moduleCommonName = IdentifierHelper.getModuleCommonName(module);
        const entitiesFolder = this.generateEntitiesFolderStructure(module, features);
        const accessorsFolder = this.generateAccessorsFolderStructure(module);

        const projectFolder = {
            type: 'folder',
            folderType: 'projectFolder',
            name: projectName,
            children: [
                {
                    type: 'file',
                    fileType: 'projectFile',
                    name: projectName + '.csproj',
                    generator: new CG.SmProject_ProjectFileGenerator(module)
                },
                entitiesFolder,
                accessorsFolder,
                {
                    type: 'folder',
                    name: 'DependencyInjection',
                    children: [
                        {
                            type: 'file',
                            name: 'SealedModels' + moduleCommonName + 'BuilderExtensions.cs',
                            generator: new CG.SmProject_DependencyInjectionClassGenerator(module)
                        }
                    ]
                }
            ]
        }

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
            folder.children.push({
                type: 'file',
                name: item.name + '.cs',
                generator: new CG.SmProject_EntityClassGenerator(item)
            });

            const unmanagedSubEntities = features.itemUnmanagedSubEntities(item);
            for (const subEntity of unmanagedSubEntities) {
                folder.children.push({
                    type: 'file',
                    name: subEntity + '.cs',
                    generator: new CG.SmProject_SubEntityClassGenerator(item, subEntity)
                });
            }
        }

        return folder;
    }

    /**
     * @param {Module} module
     */
    generateAccessorsFolderStructure(module) {
        const folder = {
            type: 'folder',
            name: '_Accessors',
            children: []
        };

        for (const item of module.items) {
            folder.children.push({
                type: 'file',
                name: item.name + 'Accessor.cs',
                generator: new CG.SmProject_EntityAccessorClassGenerator(item)
            });
        }

        return folder;
    }
}
