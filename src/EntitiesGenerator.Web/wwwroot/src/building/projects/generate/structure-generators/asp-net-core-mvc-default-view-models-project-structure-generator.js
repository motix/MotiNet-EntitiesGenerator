// AspNetCore.Mvc.DefaultViewModels

import { IdentifierHelper } from '../content-helper';
import AllFeaturesGenerator from '../feature-generators/all-features-generator';
import * as CG from '../content-generators/content-generators';

export class AspDvProjectSG {
    /**
     * @param {Module} module
     */
    static getProjectName(module) {
        return `${IdentifierHelper.getModuleRootNamespace(module)}.AspNetCore.Mvc.DefaultViewModels`;
    }

    /**
     * @param {Module} module
     */
    static getDefaultNamespace(module) {
        return `${IdentifierHelper.getModuleRootNamespace(module)}.Mvc`;
    }

    /**
     * @param {Module} module
     * @param {AllFeaturesGenerator} features
     */
    generateProjectStructure(module, features) {
        const projectName = AspDvProjectSG.getProjectName(module);
        const moduleCommonName = IdentifierHelper.getModuleCommonName(module);
        const viewModelsFolder = this.generateViewModelsFolderStructure(module, features);

        const projectFolder = {
            type: 'folder',
            folderType: 'projectFolder',
            name: projectName,
            children: [
                {
                    type: 'file',
                    fileType: 'projectFile',
                    name: projectName + '.csproj',
                    generator: new CG.AspDvProject_ProjectFileGenerator(module)
                },
                viewModelsFolder,
                {
                    type: 'file',
                    name: 'DisplayNames.resx',
                    generator: new CG.AspDvProject_DisplayNamesResxGenerator(module)
                },
                {
                    type: 'file',
                    name: moduleCommonName + 'Profile.cs',
                    generator: new CG.AspDvProject_ProfileClassGenerator(module)
                },
                {
                    type: 'folder',
                    name: 'DependencyInjection',
                    children: [
                        {
                            type: 'file',
                            name: 'DefaultViewModels' + moduleCommonName + 'BuilderExtensions.cs',
                            generator: new CG.AspDvProject_DependencyInjectionClassGenerator(module)
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
    generateViewModelsFolderStructure(module, features) {
        const folder = {
            type: 'folder',
            name: '_ViewModels',
            children: []
        };

        for (const item of module.items) {
            folder.children.push({
                type: 'file',
                name: item.name + 'ViewModels.cs',
                generator: new CG.AspDvProject_EntityViewModelsClassGenerator(item)
            });

            const unmanagedSubEntities = features.itemUnmanagedSubEntities(item);
            for (const subEntity of unmanagedSubEntities) {
                folder.children.push({
                    type: 'file',
                    name: subEntity + 'ViewModels.cs',
                    generator: new CG.AspDvProject_SubEntityViewModelsClassGenerator(item, subEntity)
                });
            }
        }

        return folder;
    }
}
