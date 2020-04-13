// AspNetCore

import { IdentifierHelper } from '../content-helper';
import AllFeaturesGenerator from '../feature-generators/all-features-generator';
import * as CG from '../content-generators/content-generators';

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
     * @param {Module} module
     * @param {AllFeaturesGenerator} features
     */
    generateProjectStructure(module, features) {
        const projectName = AspProjectSG.getProjectName(module);
        const moduleCommonName = IdentifierHelper.getModuleCommonName(module);
        const managersFolder = this.generateManagersFolderStructure(module);

        const projectFolder = {
            type: 'folder',
            folderType: 'projectFolder',
            name: projectName,
            children: [
                {
                    type: 'file',
                    fileType: 'projectFile',
                    name: projectName + '.csproj',
                    generator: new CG.AspProject_ProjectFileGenerator(module)
                },
                managersFolder,
                {
                    type: 'folder',
                    name: 'DependencyInjection',
                    children: [
                        {
                            type: 'file',
                            name: 'AspNet' + moduleCommonName + 'BuilderExtensions.cs',
                            generator: new CG.AspProject_DependencyInjectionClassGenerator(module)
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
    generateManagersFolderStructure(module) {
        const folder = {
            type: 'folder',
            name: '_Managers',
            children: []
        };

        for (const item of module.items) {
            folder.children.push({
                type: 'file',
                name: 'AspNet' + item.name + 'Manager.cs',
                generator: new CG.AspProject_EntityManagerClassGenerator(item)
            });
        }

        return folder;
    }
}
