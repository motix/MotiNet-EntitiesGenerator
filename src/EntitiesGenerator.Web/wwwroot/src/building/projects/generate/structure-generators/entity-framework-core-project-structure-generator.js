// EntityFrameworkCore

import { IdentifierHelper } from '../content-helper';
import AllFeaturesGenerator from '../feature-generators/all-features-generator';
import * as CG from '../content-generators/content-generators';

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
     * @param {Module} module
     */
    generateProjectStructure(features, module) {
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
                    name: projectName + '.csproj',
                    generator: new CG.EfProject_ProjectFileGenerator(features, module)
                },
                {
                    type: 'file',
                    name: moduleCommonName + 'DbContextBase.cs',
                    generator: new CG.EfProject_DbContextClassGenerator(features, module)
                }
            ]
        }

        return projectFolder;
    }
}
