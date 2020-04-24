//{
//    type:         folder | solutionFolder | file | excludedFile
//    folderType:   rootFolder | projectFolder
//    fileType:     solutionFile | projectFile
//}

import * as SG from './structure-generators';
import * as CG from '../content-generators/content-generators';
import AllFeaturesGenerator from '../feature-generators/all-features-generator';
import AllRelationshipsGenerator from '../relationship-generators/all-relationships-generator';

export default class SolutionStructureGenerator {
    /**
     * @param {Project} project
     */
    static generateSolutionStructure(project) {
        const features = new AllFeaturesGenerator();
        const relationships = new AllRelationshipsGenerator();
        const srcFolder = this.generateSrcStructure(features, relationships, project);

        const solutionFolder = {
            type: 'folder',
            folderType: 'rootFolder',
            name: project.name,
            children: [
                {
                    type: 'file',
                    fileType: 'solutionFile',
                    name: project.name + '.sln',
                    generator: new CG.SolutionFileGenerator(features, relationships, project)
                },
                srcFolder,
                {
                    type: 'solutionFolder',
                    name: 'Solution Items',
                    children: [
                        {
                            type: 'file',
                            name: 'README.md',
                            generator: new CG.SolutionReadmeGenerator(features, relationships, project)
                        },
                        {
                            type: 'file',
                            name: 'NuGet.config',
                            generator: new CG.SolutionNuGetGenerator(features, relationships)
                        }
                    ]
                },
                {
                    type: 'excludedFile',
                    name: '.gitattributes',
                    generator: new CG.SolutionGitattributesGenerator(features, relationships)
                },
                {
                    type: 'excludedFile',
                    name: '.gitignore',
                    generator: new CG.SolutionGitignoreGenerator(features, relationships)
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
     * @param {AllRelationshipsGenerator} relationships
     * @param {Project} project
     */
    static generateSrcStructure(features, relationships, project) {
        const srcFolder = {
            type: 'folder',
            name: 'src',
            children: [
            ]
        };

        for (const module of project.modules) {
            const moduleStructure = this.generateModuleStructure(features, relationships, module);
            srcFolder.children = srcFolder.children.concat(moduleStructure);
        }

        srcFolder.children.push(new SG.WebProjectSG().generateProjectStructure(features, relationships, project));

        return srcFolder;
    }

    /**
     * @param {AllFeaturesGenerator} features
     * @param {AllRelationshipsGenerator} relationships
     * @param {Module} module
     */
    static generateModuleStructure(features, relationships, module) {
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

        moduleProjects.push(new SG.CoreProjectSG().generateProjectStructure(features, relationships, module));
        moduleProjects.push(new SG.SmProjectSG().generateProjectStructure(features, relationships, module));
        moduleProjects.push(new SG.EfProjectSG().generateProjectStructure(features, relationships, module));
        moduleProjects.push(new SG.EfSmProjectSG().generateProjectStructure(features, relationships, module));
        moduleProjects.push(new SG.AspProjectSG().generateProjectStructure(features, relationships, module));
        moduleProjects.push(new SG.AspDvProjectSG().generateProjectStructure(features, relationships, module));

        return moduleStructure;
    }
}