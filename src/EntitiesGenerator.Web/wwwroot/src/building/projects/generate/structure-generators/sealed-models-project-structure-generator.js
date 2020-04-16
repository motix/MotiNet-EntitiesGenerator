// SealedModels

import { IdentifierHelper } from '../content-helper';
import AllFeaturesGenerator from '../feature-generators/all-features-generator';
import * as CG from '../content-generators/content-generators';

export class SmProjectSG {
    /**
     * @param {Module} module
     */
    static getProjectName(module) {
        return `${IdentifierHelper.getModuleRootNamespace(module)}.SealedModels`;
    }

    /**
     * @param {Module} module
     */
    static getDefaultNamespace(module) {
        return IdentifierHelper.getModuleRootNamespace(module);
    }

    /**
     * @param {AllFeaturesGenerator} features
     * @param {Module} module
     */
    generateProjectStructure(features, module) {
        const projectName = SmProjectSG.getProjectName(module);
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
                    generator: new CG.SmProject_ProjectFileGenerator(features, module)
                }
            ]
        }

        if (module.items.length > 0) {
            const entitiesFolder = this.generateEntitiesFolderStructure(features, module);
            const accessorsFolder = this.generateAccessorsFolderStructure(features, module);

            projectFolder.children.push(entitiesFolder, accessorsFolder);
        }

        projectFolder.children.push({
            type: 'folder',
            name: 'DependencyInjection',
            children: [
                {
                    type: 'file',
                    name: 'SealedModels' + moduleCommonName + 'BuilderExtensions.cs',
                    generator: new CG.SmProject_DependencyInjectionClassGenerator(features, module)
                }
            ]
        });

        return projectFolder;
    }

    /**
     * @param {AllFeaturesGenerator} features
     * @param {Module} module
     */
    generateEntitiesFolderStructure(features, module) {
        const folder = {
            type: 'folder',
            name: '_Entities',
            children: []
        };

        const entities = features.moduleEntityNames(module);

        for (const entity of entities) {
            folder.children.push({
                type: 'file',
                name: `${entity.name}.cs`,
                generator: entity.isUnmanagedSubEntity === true ?
                    new CG.SmProject_SubEntityClassGenerator(features, entity.item, entity.name) :
                    new CG.SmProject_EntityClassGenerator(features, entity.item)
            });
        }

        return folder;
    }

    /**
     * @param {AllFeaturesGenerator} features
     * @param {Module} module
     */
    generateAccessorsFolderStructure(features, module) {
        const folder = {
            type: 'folder',
            name: '_Accessors',
            children: []
        };

        for (const item of module.items) {
            folder.children.push({
                type: 'file',
                name: item.name + 'Accessor.cs',
                generator: new CG.SmProject_EntityAccessorClassGenerator(features, item)
            });
        }

        return folder;
    }
}
