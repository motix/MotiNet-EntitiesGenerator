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
     * @param {AllFeaturesGenerator} features
     * @param {Module} module
     */
    generateProjectStructure(features, module) {
        const projectName = AspDvProjectSG.getProjectName(module);
        const moduleCommonName = IdentifierHelper.getModuleCommonName(module);
        const viewModelsFolder = this.generateViewModelsFolderStructure(features, module);

        const projectFolder = {
            type: 'folder',
            folderType: 'projectFolder',
            name: projectName,
            children: [
                {
                    type: 'file',
                    fileType: 'projectFile',
                    name: projectName + '.csproj',
                    generator: new CG.AspDvProject_ProjectFileGenerator(features, module)
                },
                viewModelsFolder,
                {
                    type: 'file',
                    name: 'DisplayNames.resx',
                    generator: new CG.AspDvProject_DisplayNamesResxGenerator(features, module)
                },
                {
                    type: 'file',
                    name: moduleCommonName + 'Profile.cs',
                    generator: new CG.AspDvProject_ProfileClassGenerator(features, module)
                },
                {
                    type: 'folder',
                    name: 'DependencyInjection',
                    children: [
                        {
                            type: 'file',
                            name: 'DefaultViewModels' + moduleCommonName + 'BuilderExtensions.cs',
                            generator: new CG.AspDvProject_DependencyInjectionClassGenerator(features, module)
                        }
                    ]
                }
            ]
        }

        return projectFolder;
    }

    /**
     * @param {AllFeaturesGenerator} features
     * @param {Module} module
     */
    generateViewModelsFolderStructure(features, module) {
        const folder = {
            type: 'folder',
            name: '_ViewModels',
            children: []
        };

        for (const item of module.items) {
            folder.children.push({
                type: 'file',
                name: item.name + 'ViewModels.cs',
                generator: new CG.AspDvProject_EntityViewModelsClassGenerator(features, item)
            });

            const unmanagedSubEntities = features.itemUnmanagedSubEntities(item);
            for (const subEntity of unmanagedSubEntities) {
                folder.children.push({
                    type: 'file',
                    name: subEntity + 'ViewModels.cs',
                    generator: new CG.AspDvProject_SubEntityViewModelsClassGenerator(features, item, subEntity)
                });
            }
        }

        return folder;
    }
}
