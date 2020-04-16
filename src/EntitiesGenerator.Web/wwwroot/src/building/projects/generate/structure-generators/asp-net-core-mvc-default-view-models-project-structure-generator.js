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
                }
            ]
        }

        if (module.items.length > 0) {
            const viewModelsFolder = this.generateViewModelsFolderStructure(features, module);
            projectFolder.children.push(viewModelsFolder);
        }

        projectFolder.children.push(
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
            });

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

        const entities = features.moduleEntityNames(module);

        for (const entity of entities) {
            folder.children.push({
                type: 'file',
                name: `${entity.name}ViewModels.cs`,
                generator: entity.isUnmanagedSubEntity === true ?
                    new CG.AspDvProject_SubEntityViewModelsClassGenerator(features, entity.item, entity.name) :
                    new CG.AspDvProject_EntityViewModelsClassGenerator(features, entity.item)
            });
        }

        return folder;
    }
}
