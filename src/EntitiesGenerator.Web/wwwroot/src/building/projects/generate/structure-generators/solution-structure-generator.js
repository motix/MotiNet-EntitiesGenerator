//{
//    type:         folder | solutionFolder | file | excludedFile
//    folderType:   rootFolder | projectFolder
//    fileType:     solutionFile | projectFile
//}

import AllFeaturesGenerator from '../feature-generators/all-features-generator';
import * as SG from './structure-generators';
import * as CG from '../content-generators/content-generators';

export default class SolutionStructureGenerator {
    /**
     * @param {Project} project
     */
    static generateSolutionStructure(project) {
        const features = new AllFeaturesGenerator();
        const srcFolder = this.generateSrcStructure(features, project);

        const solutionFolder = {
            type: 'folder',
            folderType: 'rootFolder',
            name: project.name,
            children: [
                {
                    type: 'file',
                    fileType: 'solutionFile',
                    name: project.name + '.sln',
                    generator: new CG.SolutionFileGenerator(features, project)
                },
                srcFolder,
                {
                    type: 'solutionFolder',
                    name: 'Solution Items',
                    children: [
                        {
                            type: 'file',
                            name: 'README.md',
                            generator: new CG.SolutionReadmeGenerator(features, project)
                        },
                        {
                            type: 'file',
                            name: 'NuGet.config',
                            generator: new CG.SolutionNuGetGenerator(features)
                        }
                    ]
                },
                {
                    type: 'excludedFile',
                    name: '.gitattributes',
                    generator: new CG.SolutionGitattributesGenerator(features)
                },
                {
                    type: 'excludedFile',
                    name: '.gitignore',
                    generator: new CG.SolutionGitignoreGenerator(features)
                }
            ]
        };

        setParent(solutionFolder);
        setPath(solutionFolder);

        return solutionFolder;

        function setParent(node) {
            if (!node.children) {
                return;
            }

            for (const child of node.children) {
                child.parent = node;
                setParent(child);
            }
        }

        function setPath(node) {
            var path = null;

            if (node.type !== 'solutionFolder') {
                if (node.parent) {
                    var parent = node.parent;

                    while (parent.path === null) {
                        parent = parent.parent;
                    }

                    path = parent.path + '/';
                } else {
                    path = '';
                }

                path += node.name;
            }

            node.path = path;

            if (node.children) {
                for (const child of node.children) {
                    setPath(child);
                }
            }
        }
    }

    /**
     * @param {AllFeaturesGenerator} features
     * @param {Project} project
     */
    static generateSrcStructure(features, project) {
        const srcFolder = {
            type: 'folder',
            name: 'src',
            children: [
            ]
        };

        for (const module of project.modules) {
            const moduleStructure = this.generateModuleStructure(features, module);
            srcFolder.children = srcFolder.children.concat(moduleStructure);
        }

        srcFolder.children.push(new SG.WebProjectSG().generateProjectStructure(features, project));

        return srcFolder;
    }

    /**
     * @param {AllFeaturesGenerator} features
     * @param {Module} module
     */
    static generateModuleStructure(features, module) {
        const moduleStructure = [];
        var moduleProjects;

        if (module.hasOwnNamespace) {
            const moduleFolder = {
                type: 'folder',
                name: module.name,
                children: []
            };
            moduleStructure.push(moduleFolder);
            moduleProjects = moduleFolder.children;
        } else {
            moduleProjects = moduleStructure;
        }

        moduleProjects.push(new SG.CoreProjectSG().generateProjectStructure(features, module));
        moduleProjects.push(new SG.SmProjectSG().generateProjectStructure(features, module));
        moduleProjects.push(new SG.EfProjectSG().generateProjectStructure(features, module));
        moduleProjects.push(new SG.EfSmProjectSG().generateProjectStructure(features, module));
        moduleProjects.push(new SG.AspProjectSG().generateProjectStructure(features, module));
        moduleProjects.push(new SG.AspDvProjectSG().generateProjectStructure(features, module));

        return moduleStructure;
    }
}