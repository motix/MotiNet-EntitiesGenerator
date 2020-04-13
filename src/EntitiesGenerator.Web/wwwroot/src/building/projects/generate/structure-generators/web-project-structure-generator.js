// Web

import { IdentifierHelper } from '../content-helper';
import AllFeaturesGenerator from '../feature-generators/all-features-generator';
import * as CG from '../content-generators/content-generators';

export class WebProjectSG {
    /**
     * @param {Project} project
     */
    static getProjectName(project) {
        return `${project.namespace === null ? project.name : project.namespace}.Web`;
    }

    /**
     * @param {Project} project
     */
    static getDefaultNamespace(module) {
        return WebProjectSG.getProjectName(project);
    }

    /**
     * @param {Project} project
     * @param {AllFeaturesGenerator} features
     */
    generateProjectStructure(project, features) {
        const projectName = WebProjectSG.getProjectName(project);

        const projectFolder = {
            type: 'folder',
            folderType: 'projectFolder',
            name: projectName,
            children: [
                {
                    type: 'file',
                    fileType: 'projectFile',
                    name: projectName + '.csproj'
                },
                {
                    type: 'folder',
                    name: 'Data'
                },
                {
                    type: 'file',
                    name: 'Startup.cs'
                }
            ]
        }

        return projectFolder;
    }
}
