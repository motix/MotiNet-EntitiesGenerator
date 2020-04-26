// EntityFrameworkCore.SealedModels

import { IdentifierHelper } from '../content-helper';
import * as CG from '../content-generators/content-generators';
import AllFeaturesGenerator from '../feature-generators/all-features-generator';
import AllRelationshipsGenerator from '../relationship-generators/all-relationships-generator';

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
     * @param {AllRelationshipsGenerator} relationships
     * @param {Module} module
     */
    generateProjectStructure(features, relationships, module) {
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
                    generator: new CG.EfSmProject_ProjectFileGenerator(features, relationships, module)
                }
            ]
        }

        for (const relationship of module.itemsRelationships) {
            const generator = relationships.getGenerator(relationship);
            generator.efSm_ProjectFolder(relationship, projectFolder);
        }

        projectFolder.children.push({
            type: 'file',
            name: `${moduleCommonName}DbContextBase.cs`,
            generator: new CG.EfSmProject_DbContextClassGenerator(features, relationships, module)
        });

        if (module.items.length > 0) {
            const storesFolder = this.generateStoresFolderStructure(features, relationships, module);
            projectFolder.children.push(storesFolder);
        }

        if (module.hasEntityFrameworkCoreSealedModelsOptions === true) {
            projectFolder.children.push(
                {
                    type: 'file',
                    name: `EntityFrameworkCore${moduleCommonName}Options.cs`,
                    generator: new CG.EfSmProject_OptionsClassGenerator(features, relationships, module)
                });
        }

        projectFolder.children.push({
            type: 'folder',
            name: 'DependencyInjection',
            children: [
                {
                    type: 'file',
                    name: `EntityFrameworkCore${moduleCommonName}BuilderExtensions.cs`,
                    generator: new CG.EfSmProject_DependencyInjectionClassGenerator(features, relationships, module)
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
    generateStoresFolderStructure(features, relationships, module) {
        const folder = {
            type: 'folder',
            name: '_Stores',
            children: []
        };

        for (const item of module.items) {
            if (item.modelOnly) {
                continue;
            }

            folder.children.push({
                type: 'file',
                name: `${item.name}Store.cs`,
                generator: new CG.EfSmProject_EntityStoreClassGenerator(features, relationships, item)
            });
        }

        return folder;
    }
}
