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
     * @param {AllFeaturesGenerator} features
     * @param {Module} module
     */
    generateProjectStructure(features, module) {
        const projectName = EfSmProjectSG.getProjectName(module);
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
                    generator: new CG.EfSmProject_ProjectFileGenerator(features, module)
                },
                {
                    type: 'file',
                    name: `${moduleCommonName}DbContextBase.cs`,
                    generator: new CG.EfSmProject_DbContextClassGenerator(features, module)
                }
            ]
        }

        if (module.items.length > 0) {
            const storesFolder = this.generateStoresFolderStructure(features, module);
            projectFolder.children.push(storesFolder);
        }

        if (module.hasEntityFrameworkCoreSealedModelsOptions === true) {
            projectFolder.children.push(
                {
                    type: 'file',
                    name: `EntityFrameworkCore${moduleCommonName}Options.cs`,
                    generator: new CG.EfSmProject_OptionsClassGenerator(features, module)
                });
        }

        projectFolder.children.push({
            type: 'folder',
            name: 'DependencyInjection',
            children: [
                {
                    type: 'file',
                    name: `EntityFrameworkCore${moduleCommonName}BuilderExtensions.cs`,
                    generator: new CG.EfSmProject_DependencyInjectionClassGenerator(features, module)
                }
            ]
        });

        return projectFolder;
    }

    /**
     * @param {AllFeaturesGenerator} features
     * @param {Module} module
     */
    generateStoresFolderStructure(features, module) {
        const folder = {
            type: 'folder',
            name: '_Stores',
            children: []
        };

        for (const item of module.items) {
            folder.children.push({
                type: 'file',
                name: `${item.name}Store.cs`,
                generator: new CG.EfSmProject_EntityStoreClassGenerator(features, item)
            });
        }

        return folder;
    }
}
