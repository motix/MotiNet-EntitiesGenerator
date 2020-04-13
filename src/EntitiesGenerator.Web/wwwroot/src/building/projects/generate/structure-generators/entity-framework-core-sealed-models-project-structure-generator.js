// EntityFrameworkCore.SealedModels

import { IdentifierHelper } from '../content-helper';
import AllFeaturesGenerator from '../feature-generators/all-features-generator';
import * as CG from '../content-generators/content-generators';

export class EfSmProjectSG {
    /**
     * @param {Module} module
     */
    static getProjectName(module) {
        return `${IdentifierHelper.getModuleRootNamespace(module)}.EntityFrameworkCore.SealedModels`;
    }

    /**
     * @param {Module} module
     */
    static getDefaultNamespace(module) {
        return `${IdentifierHelper.getModuleRootNamespace(module)}.EntityFrameworkCore`;
    }

    /**
     * @param {Module} module
     * @param {AllFeaturesGenerator} features
     */
    generateProjectStructure(module, features) {
        const projectName = EfSmProjectSG.getProjectName(module);
        const moduleCommonName = IdentifierHelper.getModuleCommonName(module);
        const storesFolder = this.generateStoresFolderStructure(module);

        const projectFolder = {
            type: 'folder',
            folderType: 'projectFolder',
            name: projectName,
            children: [
                {
                    type: 'file',
                    fileType: 'projectFile',
                    name: projectName + '.csproj',
                    generator: new CG.EfSmProject_ProjectFileGenerator(module)
                },
                {
                    type: 'file',
                    name: moduleCommonName + 'DbContextBase.cs',
                    generator: new CG.EfSmProject_DbContextClassGenerator(module)
                },
                storesFolder,
                {
                    type: 'folder',
                    name: 'DependencyInjection',
                    children: [
                        {
                            type: 'file',
                            name: 'EntityFrameworkCore' + moduleCommonName + 'BuilderExtensions.cs',
                            generator: new CG.EfSmProject_DependencyInjectionClassGenerator(module)
                        }
                    ]
                }
            ]
        }

        return projectFolder;
    }

    /**
     * @param {Module} module
     */
    generateStoresFolderStructure(module) {
        const folder = {
            type: 'folder',
            name: '_Stores',
            children: []
        };

        for (const item of module.items) {
            folder.children.push({
                type: 'file',
                name: item.name + 'Store.cs',
                generator: new CG.EfSmProject_EntityStoreClassGenerator(item)
            });
        }

        return folder;
    }
}
