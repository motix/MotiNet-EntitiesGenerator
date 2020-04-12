//{
//    type:         folder | solutionFolder | file | excludedFile
//    folderType:   rootFolder | projectFolder
//    fileType:     solutionFile | projectFile
//}

import ContentHelper from './content-helper';
import * as ContentGenerators from './content-generator/content-generators';
import { ContentGenerator } from './content-generator/content-generator';

export default class SolutionStructureGenerator {
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
                    generator: new ContentGenerators.SolutionFileGenerator(project)
                },
                srcFolder,
                {
                    type: 'solutionFolder',
                    name: 'Solution Items',
                    children: [
                        {
                            type: 'file',
                            name: 'README.md',
                            generator: new ContentGenerators.SolutionReadmeGenerator(project)
                        },
                        {
                            type: 'file',
                            name: 'NuGet.config',
                            generator: new ContentGenerators.SolutionNuGetGenerator()
                        }
                    ]
                },
                {
                    type: 'excludedFile',
                    name: '.gitattributes',
                    generator: new ContentGenerators.SolutionGitattributesGenerator()
                },
                {
                    type: 'excludedFile',
                    name: '.gitignore',
                    generator: new ContentGenerators.SolutionGitignoreGenerator()
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

    static generateSrcStructure(project) {
        const srcFolder = {
            type: 'folder',
            name: 'src',
            children: [
            ]
        };

        for (const module of project.modules) {
            const moduleStructure = this.generateModuleStructure(module);
            srcFolder.children = srcFolder.children.concat(moduleStructure);
        }

        srcFolder.children.push(this.generate_WebProject_Structure(project));

        return srcFolder;
    }

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

        moduleProjects.push(this.generate_CoreProject_Structure(module));
        moduleProjects.push(this.generate_SealedModelsProject_Structure(module));
        moduleProjects.push(this.generate_EntityFrameworkCoreProject_Structure(module));
        moduleProjects.push(this.generate_EntityFrameworkCoreSealedModelsProject_Structure(module));
        moduleProjects.push(this.generate_AspNetCoreProject_Structure(module));
        moduleProjects.push(this.generate_AspNetCoreMvcDefaultViewModelsProject_Structure(module));

        return moduleStructure;
    }

    // Core

    static generate_CoreProject_Structure(module) {
        const projectName = ContentHelper.get_CoreProject_Name(module);
        const moduleName = ContentHelper.getModuleName(module);
        const validationRequired = ContentHelper.moduleValidationRequired(module);
        const entitiesFolder = this.generate_CoreProject_EntitiesFolder_Structure(module);

        const projectFolder = {
            type: 'folder',
            folderType: 'projectFolder',
            name: projectName,
            children: [
                {
                    type: 'file',
                    fileType: 'projectFile',
                    name: projectName + '.csproj',
                    generator: new ContentGenerators.CoreProject_ProjectFileGenerator(module)
                },
                entitiesFolder
            ]
        };

        if (validationRequired) {
            projectFolder.children.push(
                {
                    type: 'file',
                    name: moduleName + 'ErrorDescriber.cs',
                    generator: new ContentGenerators.CoreProject_ErrorDescriberClassGenerator(module)
                },
                {
                    type: 'folder',
                    name: 'Resources',
                    children: [
                        {
                            type: 'file',
                            name: moduleName + 'ErrorDescriberResources.cs',
                            generator: new ContentGenerators.CoreProject_ErrorDescriberResourcesClassGenerator(module)
                        },
                        {
                            type: 'file',
                            name: moduleName + 'ErrorDescriberResources.resx',
                            generator: new ContentGenerators.CoreProject_ErrorDescriberResourcesResxGenerator(module)
                        }
                    ]
                }
            );
        }

        projectFolder.children.push(
            {
                type: 'file',
                name: moduleName + 'Builder.cs',
                generator: new ContentGenerators.CoreProject_BuilderClassGenerator(module)
            },
            {
                type: 'folder',
                name: 'DependencyInjection',
                children: [
                    {
                        type: 'file',
                        name: moduleName + 'ServiceCollectionExtensions.cs',
                        generator: new ContentGenerators.CoreProject_DependencyInjectionClassGenerator(module)
                    }
                ]
            }
        );

        return projectFolder;
    }

    static generate_CoreProject_EntitiesFolder_Structure(module) {
        const folder = {
            type: 'folder',
            name: '_Entities',
            children: []
        };

        for (const item of module.items) {
            const validationRequired = ContentHelper.entityValidationRequired(item);

            const itemFolder = {
                type: 'folder',
                name: '_' + item.name,
                children: [
                    {
                        type: 'file',
                        name: 'I' + item.name + 'Manager.cs',
                        generator: new ContentGenerators.CoreProject_EntityManagerInterfaceGenerator(item)
                    },
                    {
                        type: 'file',
                        name: 'I' + item.name + 'Store.cs',
                        generator: new ContentGenerators.CoreProject_EntityStoreInterfaceGenerator(item)
                    },
                    {
                        type: 'file',
                        name: 'I' + item.name + 'Accessor.cs',
                        generator: new ContentGenerators.CoreProject_EntityAccessorInterfaceGenerator(item)
                    },
                    {
                        type: 'file',
                        name: item.name + 'Manager.cs',
                        generator: new ContentGenerators.CoreProject_EntityManagerClassGenerator(item)
                    }
                ]
            };

            if (validationRequired) {
                itemFolder.children.push({
                    type: 'file',
                    name: item.name + 'Validator.cs',
                    generator: new ContentGenerators.CoreProject_EntityValidatorClassGenerator(item)
                });
            }

            folder.children.push(itemFolder);
        }

        return folder;
    }

    // SealedModels

    static generate_SealedModelsProject_Structure(module) {
        const projectName = ContentHelper.get_SealedModelsProject_Name(module);
        const moduleName = ContentHelper.getModuleName(module);
        const entitiesFolder = this.generate_SealedModelsProject_EntitiesFolder_Structure(module);
        const accessorsFolder = this.generate_SealedModelsProject_AccessorsFolder_Structure(module);

        const projectFolder = {
            type: 'folder',
            folderType: 'projectFolder',
            name: projectName,
            children: [
                {
                    type: 'file',
                    fileType: 'projectFile',
                    name: projectName + '.csproj',
                    generator: new ContentGenerators.SealedModelsProject_ProjectFileGenerator(module)
                },
                entitiesFolder,
                accessorsFolder,
                {
                    type: 'folder',
                    name: 'DependencyInjection',
                    children: [
                        {
                            type: 'file',
                            name: 'SealedModels' + moduleName + 'BuilderExtensions.cs',
                            generator: new ContentGenerators.SealedModelsProject_DependencyInjectionClassGenerator(module)
                        }
                    ]
                }
            ]
        }

        return projectFolder;
    }

    static generate_SealedModelsProject_EntitiesFolder_Structure(module) {
        const folder = {
            type: 'folder',
            name: '_Entities',
            children: []
        };

        for (const item of module.items) {
            const itemFolder = {
                type: 'file',
                name: item.name + '.cs',
                generator: new ContentGenerators.SealedModelsProject_EntityClassGenerator(item)
            };

            folder.children.push(itemFolder);
        }

        return folder;
    }

    static generate_SealedModelsProject_AccessorsFolder_Structure(module) {
        const folder = {
            type: 'folder',
            name: '_Accessors',
            children: []
        };

        for (const item of module.items) {
            const itemFolder = {
                type: 'file',
                name: item.name + 'Accessor.cs',
                generator: new ContentGenerators.SealedModelsProject_EntityAccessorClassGenerator(item)
            };

            folder.children.push(itemFolder);
        }

        return folder;
    }

    // EntityFrameworkCore

    static generate_EntityFrameworkCoreProject_Structure(module) {
        const projectName = ContentHelper.get_EntityFrameworkCoreProject_Name(module);
        const moduleName = ContentHelper.getModuleName(module);

        const projectFolder = {
            type: 'folder',
            folderType: 'projectFolder',
            name: projectName,
            children: [
                {
                    type: 'file',
                    fileType: 'projectFile',
                    name: projectName + '.csproj',
                    generator: new ContentGenerators.EntityFrameworkCoreProject_ProjectFileGenerator(module)
                },
                {
                    type: 'file',
                    name: moduleName + 'DbContextBase.cs',
                    generator: new ContentGenerators.EntityFrameworkCoreProject_DbContextClassGenerator(module)
                }
            ]
        }

        return projectFolder;
    }

    // EntityFrameworkCore.SealModels

    static generate_EntityFrameworkCoreSealedModelsProject_Structure(module) {
        const projectName = ContentHelper.get_EntityFrameworkCoreSealedModelsProject_Name(module);
        const moduleName = ContentHelper.getModuleName(module);
        const storesFolder = this.generate_EntityFrameworkCoreSealedModelsProject_StoresFolder_Structure(module);

        const projectFolder = {
            type: 'folder',
            folderType: 'projectFolder',
            name: projectName,
            children: [
                {
                    type: 'file',
                    fileType: 'projectFile',
                    name: projectName + '.csproj',
                    generator: new ContentGenerators.EntityFrameworkCoreSealedModelsProject_ProjectFileGenerator(module)
                },
                {
                    type: 'file',
                    name: moduleName + 'DbContextBase.cs',
                    generator: new ContentGenerators.EntityFrameworkCoreSealedModelsProject_DbContextClassGenerator(module)
                },
                storesFolder,
                {
                    type: 'folder',
                    name: 'DependencyInjection',
                    children: [
                        {
                            type: 'file',
                            name: 'EntityFrameworkCore' + moduleName + 'BuilderExtensions.cs',
                            generator: new ContentGenerators.EntityFrameworkCoreSealedModelsProject_DependencyInjectionClassGenerator(module)
                        }
                    ]
                }
            ]
        }

        return projectFolder;
    }

    static generate_EntityFrameworkCoreSealedModelsProject_StoresFolder_Structure(module) {
        const folder = {
            type: 'folder',
            name: '_Stores',
            children: []
        };

        for (const item of module.items) {
            const itemFolder = {
                type: 'file',
                name: item.name + 'Store.cs',
                generator: new ContentGenerators.EntityFrameworkCoreSealedModelsProject_EntityStoreClassGenerator(item)
            };

            folder.children.push(itemFolder);
        }

        return folder;
    }

    // AspNetCore

    static generate_AspNetCoreProject_Structure(module) {
        const projectName = ContentHelper.get_AspNetCoreProject_Name(module);
        const moduleName = ContentHelper.getModuleName(module);
        const managersFolder = this.generate_AspNetCoreProject_ManagersFolder_Structure(module);

        const projectFolder = {
            type: 'folder',
            folderType: 'projectFolder',
            name: projectName,
            children: [
                {
                    type: 'file',
                    fileType: 'projectFile',
                    name: projectName + '.csproj',
                    generator: new ContentGenerators.AspNetCoreProject_ProjectFileGenerator(module)
                },
                managersFolder,
                {
                    type: 'folder',
                    name: 'DependencyInjection',
                    children: [
                        {
                            type: 'file',
                            name: 'AspNet' + moduleName + 'BuilderExtensions.cs',
                            generator: new ContentGenerators.AspNetCoreProject_DependencyInjectionClassGenerator(module)
                        }
                    ]
                }
            ]
        }

        return projectFolder;
    }

    static generate_AspNetCoreProject_ManagersFolder_Structure(module) {
        const folder = {
            type: 'folder',
            name: '_Managers',
            children: []
        };

        for (const item of module.items) {
            const itemFolder = {
                type: 'file',
                name: 'AspNet' + item.name + 'Manager.cs',
                generator: new ContentGenerators.AspNetCoreProject_EntityManagerClassGenerator(item)
            };

            folder.children.push(itemFolder);
        }

        return folder;
    }

    // AspNetCore.Mvc.DefaultViewModels

    static generate_AspNetCoreMvcDefaultViewModelsProject_Structure(module) {
        const projectName = ContentHelper.get_AspNetCoreMvcDefaultViewModelsProject_Name(module);
        const moduleName = ContentHelper.getModuleName(module);
        const viewModelsFolder = this.generate_AspNetCoreMvcDefaultViewModelsProject_ViewModelsFolder_Structure(module);

        const projectFolder = {
            type: 'folder',
            folderType: 'projectFolder',
            name: projectName,
            children: [
                {
                    type: 'file',
                    fileType: 'projectFile',
                    name: projectName + '.csproj',
                    generator: new ContentGenerators.AspNetCoreMvcDefaultViewModelsProject_ProjectFileGenerator(module)
                },
                viewModelsFolder,
                {
                    type: 'file',
                    name: 'DisplayNames.resx',
                    generator: new ContentGenerators.AspNetCoreMvcDefaultViewModelsProject_DisplayNamesResxGenerator(module)
                },
                {
                    type: 'file',
                    name: moduleName + 'Profile.cs',
                    generator: new ContentGenerators.AspNetCoreMvcDefaultViewModelsProject_ProfileClassGenerator(module)
                },
                {
                    type: 'folder',
                    name: 'DependencyInjection',
                    children: [
                        {
                            type: 'file',
                            name: 'DefaultViewModels' + moduleName + 'BuilderExtensions.cs',
                            generator: new ContentGenerators.AspNetCoreMvcDefaultViewModelsProject_DependencyInjectionClassGenerator(module)
                        }
                    ]
                }
            ]
        }

        return projectFolder;
    }

    static generate_AspNetCoreMvcDefaultViewModelsProject_ViewModelsFolder_Structure(module) {
        const folder = {
            type: 'folder',
            name: '_ViewModels',
            children: []
        };

        for (const item of module.items) {
            const itemFolder = {
                type: 'file',
                name: item.name + 'ViewModels.cs',
                generator: new ContentGenerators.AspNetCoreMvcDefaultViewModelsProject_EntityViewModelsClassGenerator(item)
            };

            folder.children.push(itemFolder);
        }

        return folder;
    }

    // Web

    static generate_WebProject_Structure(project) {
        const projectName = ContentHelper.get_WebProject_Name(project);

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