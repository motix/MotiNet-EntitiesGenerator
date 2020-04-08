<template extends="../../../shared/components/pages/EditPage.vue">
    <extensions>
        <extension point="breadcrumb">
            <a :href="returnUrl">Back to Project</a>
        </extension>
        <extension point="title">
            {{entity.name}}
        </extension>
    </extensions>
</template>

<script>
    import EditPageController from '../../../shared/components/pages/EditPageController';

    export class GeneratePageController extends EditPageController {

        // Static

        static getConfig(controllerClass = GeneratePageController) {
            return super.getConfig(controllerClass);
        }

        convertToWorkEntity(loadedProject) {
            super.convertToWorkEntity(loadedProject);
            const editableProject = loadedProject;

            editableProject.modules = editableProject.fullModules;
            delete editableProject.fullModules;
            for (const editableModule of editableProject.modules) {
                editableModule.project = editableProject;
                editableModule.items = editableModule.fullItems;
                delete editableModule.fullItems;
                for (const editableItem of editableModule.items) {
                    editableItem.module = editableModule;
                }
            }

            return editableProject;
        }
    }

    export default GeneratePageController.getConfig();
</script>