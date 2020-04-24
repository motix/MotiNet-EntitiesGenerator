// EntityFrameworkCore

import { IdentifierHelper } from '../content-helper';
import * as CG from '../content-generators/content-generators';
import AllFeaturesGenerator from '../feature-generators/all-features-generator';
import AllRelationshipsGenerator from '../relationship-generators/all-relationships-generator';

export class EfProjectSG {
    /**
     * @param {Module} module
     */
    static getProjectName(module) {
        return `${IdentifierHelper.getModuleRootNamespace(module)}.EntityFrameworkCore`;
    }

    /**
     * @param {Module} module
     */
    static getDefaultNamespace(module) {
        return EfProjectSG.getProjectName(module);
    }

    /**
     * @param {AllFeaturesGenerator} features
     * @param {AllRelationshipsGenerator} relationships
     * @param {Module} module
     */
    generateProjectStructure(features, relationships, module) {
        const projectName = EfProjectSG.getProjectName(module);
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
                    generator: new CG.EfProject_ProjectFileGenerator(features, relationships, module)
                }
            ]
        }

        for (const relationship of module.itemsRelationships) {
            const generator = relationships.getGenerator(relationship);
            generator.ef_ProjectFolder(relationship, projectFolder);
        }

        projectFolder.children.push({
            type: 'file',
            name: `${moduleCommonName}DbContextBase.cs`,
            generator: new CG.EfProject_DbContextClassGenerator(features, relationships, module)
        });

        return projectFolder;
    }
}
