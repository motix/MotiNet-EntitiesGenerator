//{
//    type:         folder | solutionFolder | file | excludedFile
//    folderType:   rootFolder | projectFolder
//    fileType:     solutionFile | projectFile
//}

import * as SG from './structure-generators';
import * as CG from '../content-generators/content-generators';
import AllFeaturesGenerator from '../feature-generators/all-features-generator';

export default class SolutionStructureGenerator {
    /**
     * @param {Project} project
     */
    static generateSolutionStructure(project) {
        const srcFolder = this.generateSrcStructure(project);

        const solutionFolder = {
            type: 'folder',
            folderType: 'rootFolder',
            name: project.name,
            children: [
                {
                    type: 'file',
                    fileType: 'solutionFile',
                    name: project.name + '.sln',
                    generator: new CG.SolutionFileGenerator(project)
                },
                srcFolder,
                {
                    type: 'solutionFolder',
                    name: 'Solution Items',
                    children: [
                        {
                            type: 'file',
                            name: 'README.md',
                            generator: new CG.SolutionReadmeGenerator(project)
                        },
                        {
                            type: 'file',
                            name: 'NuGet.config',
                            generator: new CG.SolutionNuGetGenerator()
                        }
                    ]
                },
                {
                    type: 'excludedFile',
                    name: '.gitattributes',
                    generator: new CG.SolutionGitattributesGenerator()
                },
                {
                    type: 'excludedFile',
                    name: '.gitignore',
                    generator: new CG.SolutionGitignoreGenerator()
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
    * @param {Project} project
    */
    static generateSrcStructure(project) {
        const srcFolder = {
            type: 'folder',
            name: 'src',
            children: [
            ]
        };

        const features = new AllFeaturesGenerator();
        for (const module of project.modules) {
            const moduleStructure = this.generateModuleStructure(module);
            srcFolder.children = srcFolder.children.concat(moduleStructure);
        }

        srcFolder.children.push(new SG.WebProjectSG().generateProjectStructure(project, features));

        return srcFolder;
    }

    /**
     * @param {Module} module
     */
    static generateModuleStructure(module) {
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

        const features = new AllFeaturesGenerator();

        moduleProjects.push(new SG.CoreProjectSG().generateProjectStructure(module, features));
        moduleProjects.push(new SG.SmProjectSG().generateProjectStructure(module, features));
        moduleProjects.push(new SG.EfProjectSG().generateProjectStructure(module, features));
        moduleProjects.push(new SG.EfSmProjectSG().generateProjectStructure(module, features));
        moduleProjects.push(new SG.AspProjectSG().generateProjectStructure(module, features));
        moduleProjects.push(new SG.AspDvProjectSG().generateProjectStructure(module, features));

        return moduleStructure;
    }
}