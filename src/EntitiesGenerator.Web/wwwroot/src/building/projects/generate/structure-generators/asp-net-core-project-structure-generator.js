// AspNetCore

import { IdentifierHelper } from '../content-helper';
import * as CG from '../content-generators/content-generators';
import AllFeaturesGenerator from '../feature-generators/all-features-generator';
import AllRelationshipsGenerator from '../relationship-generators/all-relationships-generator';

export class AspProjectSG {
    /**
     * @param {Module} module
     */
    static getProjectName(module) {
        return `${IdentifierHelper.getModuleRootNamespace(module)}.AspNetCore`;
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
        const projectName = AspProjectSG.getProjectName(module);
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
                    generator: new CG.AspProject_ProjectFileGenerator(features, relationships, module)
                }
            ]
        }

        if (module.items.length > 0) {
            const managersFolder = this.generateManagersFolderStructure(features, relationships, module);
            projectFolder.children.push(managersFolder);
        }

        if (module.hasAspNetCoreOptions === true) {
            projectFolder.children.push(
                {
                    type: 'file',
                    name: `AspNet${moduleCommonName}Options.cs`,
                    generator: new CG.AspProject_OptionsClassGenerator(features, relationships, module)
                });
        }

        projectFolder.children.push({
            type: 'folder',
            name: 'DependencyInjection',
            children: [
                {
                    type: 'file',
                    name: `AspNet${moduleCommonName}BuilderExtensions.cs`,
                    generator: new CG.AspProject_DependencyInjectionClassGenerator(features, relationships, module)
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
    generateManagersFolderStructure(features, relationships, module) {
        const folder = {
            type: 'folder',
            name: '_Managers',
            children: []
        };

        for (const item of module.items) {
            if (item.modelOnly) {
                continue;
            }

            folder.children.push({
                type: 'file',
                name: `AspNet${item.name}Manager.cs`,
                generator: new CG.AspProject_EntityManagerClassGenerator(features, relationships, item)
            });
        }

        return folder;
    }
}
