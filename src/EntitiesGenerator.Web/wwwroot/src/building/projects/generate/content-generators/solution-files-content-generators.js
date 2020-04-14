import 'prismjs/components/prism-solution-file';
import 'prismjs/components/prism-git';
import 'prismjs/components/prism-markdown';
import ContentHelper from '../content-helper';

import * as SG from '../structure-generators/structure-generators';
import { ContentGenerator, ProjectSpecificContentGenerator } from './content-generator';

export class SolutionFileGenerator extends ProjectSpecificContentGenerator {
    get language() { return 'solution-file'; }

    generate() {
        const solutionFolderTypeGuid = '2150E333-8FDC-42A3-9474-1A3956D46DE8';
        const projectWithoutOwnNamespaceTypeGuid = '9A19103F-16F7-4668-BE54-9A1E7A4F7556'
        const projectWithOwnNamespaceTypeGuid = 'FAE04EC0-301F-11D3-BF4B-00C04F79EFBC';

        const srcFolderGuid = ContentHelper.newGuid();
        const moduleFolderGuids = {};

        for (const module of this.project.modules) {
            if (module.hasOwnNamespace) {
                moduleFolderGuids[module.name] = ContentHelper.newGuid();
            }
        }

        var foldersSection = `Project("{${solutionFolderTypeGuid}}") = "src", "src", "{${srcFolderGuid}}"
EndProject
`;

        for (const moduleName in moduleFolderGuids) {
            foldersSection += `Project("{${solutionFolderTypeGuid}}") = "${moduleName}", "${moduleName}", "{${moduleFolderGuids[moduleName]}}"
EndProject
`;
        }

        const sections = {
            projectsSection: '',
            projectsNestingSection: ''
        }

        for (const module of this.project.modules) {
            if (module.hasOwnNamespace) {
                sections.projectsNestingSection += `
		{${moduleFolderGuids[module.name]}} = {${srcFolderGuid}}`;
            }

            writeProject(module, SG.CoreProjectSG.getProjectName(module), sections);
            writeProject(module, SG.SmProjectSG.getProjectName(module), sections);
            writeProject(module, SG.EfProjectSG.getProjectName(module), sections);
            writeProject(module, SG.EfSmProjectSG.getProjectName(module), sections);
            writeProject(module, SG.AspProjectSG.getProjectName(module), sections);
            writeProject(module, SG.AspDvProjectSG.getProjectName(module), sections);
        }

        const content = `
Microsoft Visual Studio Solution File, Format Version 12.00
# Visual Studio Version 16
VisualStudioVersion = 16.0.28606.126
MinimumVisualStudioVersion = 10.0.40219.1
${foldersSection}Project("{${solutionFolderTypeGuid}}") = "Solution Items", "Solution Items", "{${ContentHelper.newGuid()}}"
	ProjectSection(SolutionItems) = preProject
		NuGet.config = NuGet.config
		README.md = README.md
	EndProjectSection
EndProject
${sections.projectsSection}Global
	GlobalSection(NestedProjects) = preSolution${sections.projectsNestingSection}
	EndGlobalSection
EndGlobal
`;

        return content;

        function writeProject(module, projectName, sections) {
            const projectTypeGuid = module.hasOwnNamespace ? projectWithOwnNamespaceTypeGuid : projectWithoutOwnNamespaceTypeGuid;

            const projectGuid = ContentHelper.newGuid();
            const projectPath = `src${module.hasOwnNamespace ? '\\' + module.name : ''}\\${projectName}\\${projectName}.csproj`;

            sections.projectsSection += `Project("{${projectTypeGuid}}") = "${projectName}", "${projectPath}", "{${projectGuid}}"
EndProject
`;

            const parentGuid = module.hasOwnNamespace ? moduleFolderGuids[module.name] : srcFolderGuid;
            sections.projectsNestingSection += `
		{${projectGuid}} = {${parentGuid}}`;
        }
    }
}

export class SolutionReadmeGenerator extends ProjectSpecificContentGenerator {
    get language() { return 'markdown'; }

    generate() {
        const content = `# ${this.project.name}
`;

        return content;
    }
}

export class SolutionNuGetGenerator extends ContentGenerator {
    get language() { return 'xml'; }

    generate() {
        const content = `<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <add key="Motix CI" value="https://www.myget.org/F/motix-ci/api/v3/index.json" />
  </packageSources>
</configuration>
`;

        return content;
    }
}

export class SolutionGitattributesGenerator extends ContentGenerator {
    get language() { return 'git'; }

    generate() {
        const content = `###############################################################################
# Set default behavior to automatically normalize line endings.
###############################################################################
* text=auto

###############################################################################
# Set default behavior for command prompt diff.
#
# This is need for earlier builds of msysgit that does not have it on by
# default for csharp files.
# Note: This is only used by command line
###############################################################################
#*.cs     diff=csharp

###############################################################################
# Set the merge driver for project and solution files
#
# Merging from the command prompt will add diff markers to the files if there
# are conflicts (Merging from VS is not affected by the settings below, in VS
# the diff markers are never inserted). Diff markers may cause the following 
# file extensions to fail to load in VS. An alternative would be to treat
# these files as binary and thus will always conflict and require user
# intervention with every merge. To do so, just uncomment the entries below
###############################################################################
#*.sln       merge=binary
#*.csproj    merge=binary
#*.vbproj    merge=binary
#*.vcxproj   merge=binary
#*.vcproj    merge=binary
#*.dbproj    merge=binary
#*.fsproj    merge=binary
#*.lsproj    merge=binary
#*.wixproj   merge=binary
#*.modelproj merge=binary
#*.sqlproj   merge=binary
#*.wwaproj   merge=binary

###############################################################################
# behavior for image files
#
# image files are treated as binary by default.
###############################################################################
#*.jpg   binary
#*.png   binary
#*.gif   binary

###############################################################################
# diff behavior for common document formats
# 
# Convert binary document formats to text before diffing them. This feature
# is only available from the command line. Turn it on by uncommenting the 
# entries below.
###############################################################################
#*.doc   diff=astextplain
#*.DOC   diff=astextplain
#*.docx  diff=astextplain
#*.DOCX  diff=astextplain
#*.dot   diff=astextplain
#*.DOT   diff=astextplain
#*.pdf   diff=astextplain
#*.PDF   diff=astextplain
#*.rtf   diff=astextplain
#*.RTF   diff=astextplain
`;

        return content;
    }
}

export class SolutionGitignoreGenerator extends ContentGenerator {
    get language() { return 'git'; }

    generate() {
        const content = `## Ignore Visual Studio temporary files, build results, and
## files generated by popular Visual Studio add-ons.

# User-specific files
*.suo
*.user
*.userosscache
*.sln.docstates

# User-specific files (MonoDevelop/Xamarin Studio)
*.userprefs

# Build results
[Dd]ebug/
[Dd]ebugPublic/
[Rr]elease/
[Rr]eleases/
x64/
x86/
bld/
[Bb]in/
[Oo]bj/
[Ll]og/

# Visual Studio 2015 cache/options directory
.vs/
# Uncomment if you have tasks that create the project's static files in wwwroot
#wwwroot/
# Local test projects
tmp/

# MSTest test Results
[Tt]est[Rr]esult*/
[Bb]uild[Ll]og.*

# NUNIT
*.VisualState.xml
TestResult.xml

# Build Results of an ATL Project
[Dd]ebugPS/
[Rr]eleasePS/
dlldata.c

# DNX
project.lock.json
project.fragment.lock.json
artifacts/

*_i.c
*_p.c
*_i.h
*.ilk
*.meta
*.obj
*.pch
*.pdb
*.pgc
*.pgd
*.rsp
*.sbr
*.tlb
*.tli
*.tlh
*.tmp
*.tmp_proj
*.log
*.vspscc
*.vssscc
.builds
*.pidb
*.svclog
*.scc

# Chutzpah Test files
_Chutzpah*

# Visual C++ cache files
ipch/
*.aps
*.ncb
*.opendb
*.opensdf
*.sdf
*.cachefile
*.VC.db
*.VC.VC.opendb

# Visual Studio profiler
*.psess
*.vsp
*.vspx
*.sap

# TFS 2012 Local Workspace
$tf/

# Guidance Automation Toolkit
*.gpState

# ReSharper is a .NET coding add-in
_ReSharper*/
*.[Rr]e[Ss]harper
*.DotSettings.user

# JustCode is a .NET coding add-in
.JustCode

# TeamCity is a build add-in
_TeamCity*

# DotCover is a Code Coverage Tool
*.dotCover

# NCrunch
_NCrunch_*
.*crunch*.local.xml
nCrunchTemp_*

# MightyMoose
*.mm.*
AutoTest.Net/

# Web workbench (sass)
.sass-cache/

# Installshield output folder
[Ee]xpress/

# DocProject is a documentation generator add-in
DocProject/buildhelp/
DocProject/Help/*.HxT
DocProject/Help/*.HxC
DocProject/Help/*.hhc
DocProject/Help/*.hhk
DocProject/Help/*.hhp
DocProject/Help/Html2
DocProject/Help/html

# Click-Once directory
publish/

# Publish Web Output
*.[Pp]ublish.xml
*.azurePubxml
# TODO: Comment the next line if you want to checkin your web deploy settings
# but database connection strings (with potential passwords) will be unencrypted
#*.pubxml
*.publishproj

# Microsoft Azure Web App publish settings. Comment the next line if you want to
# checkin your Azure Web App publish settings, but sensitive information contained
# in these scripts will be unencrypted
PublishScripts/

# NuGet Packages
*.nupkg
# The packages folder can be ignored because of Package Restore
**/packages/*
# except build/, which is used as an MSBuild target.
!**/packages/build/
# Uncomment if necessary however generally it will be regenerated when needed
#!**/packages/repositories.config
# NuGet v3's project.json files produces more ignoreable files
*.nuget.props
*.nuget.targets

# Microsoft Azure Build Output
csx/
*.build.csdef

# Microsoft Azure Emulator
ecf/
rcf/

# Windows Store app package directories and files
AppPackages/
BundleArtifacts/
Package.StoreAssociation.xml
_pkginfo.txt

# Visual Studio cache files
# files ending in .cache can be ignored
*.[Cc]ache
# but keep track of directories ending in .cache
!*.[Cc]ache/

# Others
ClientBin/
~$*
*~
*.dbmdl
*.dbproj.schemaview
*.jfm
*.pfx
*.publishsettings
node_modules/
orleans.codegen.cs

# Since there are multiple workflows, uncomment next line to ignore bower_components
# (https://github.com/github/gitignore/pull/1529#issuecomment-104372622)
#bower_components/

# RIA/Silverlight projects
Generated_Code/

# Backup & report files from converting an old project file
# to a newer Visual Studio version. Backup files are not needed,
# because we have git ;-)
_UpgradeReport_Files/
Backup*/
UpgradeLog*.XML
UpgradeLog*.htm

# SQL Server files
*.mdf
*.ldf

# Business Intelligence projects
*.rdl.data
*.bim.layout
*.bim_*.settings

# Microsoft Fakes
FakesAssemblies/

# GhostDoc plugin setting file
*.GhostDoc.xml

# Node.js Tools for Visual Studio
.ntvs_analysis.dat

# Visual Studio 6 build log
*.plg

# Visual Studio 6 workspace options file
*.opt

# Visual Studio LightSwitch build output
**/*.HTMLClient/GeneratedArtifacts
**/*.DesktopClient/GeneratedArtifacts
**/*.DesktopClient/ModelManifest.xml
**/*.Server/GeneratedArtifacts
**/*.Server/ModelManifest.xml
_Pvt_Extensions

# Paket dependency manager
.paket/paket.exe
paket-files/

# FAKE - F# Make
.fake/

# JetBrains Rider
.idea/
*.sln.iml

# CodeRush
.cr/

# Python Tools for Visual Studio (PTVS)
__pycache__/
*.pyc`;

        return content;
    }
}
