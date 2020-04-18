<template extends="../../shared/components/pages/EditPage.vue">
    <extensions>
        <extension point="breadcrumb">
            <a :href="returnUrl">Projects</a>
        </extension>
        <extension point="headerInfoValidationErrors">
            <div v-for="error in entity.errors.general">{{error}}</div>
        </extension>
        <extension point="title">
            {{entity.name}}
        </extension>
        <extension point="titleEdit">
            <single-line-input :placeholder="displayNames['Name']"
                               placeholder-css-class="text-muted"
                               v-model="entity.name"
                               @input="dirty()"></single-line-input>
        </extension>
        <extension point="titleValidationErrors">
            <div v-for="error in entity.errors.name">{{error}}</div>
        </extension>
        <extension point="toolbarExtra">
            <div class="btn-group mr-2" v-if="!newMode">
                <a class="btn btn-sm btn-outline-primary"
                   :href="generateUrl"
                   title="Generate"
                   v-bind:disabled="freezed">
                    <font-awesome-icon :icon="['fal', 'cauldron']" fixed-width></font-awesome-icon>
                </a>
            </div>
        </extension>
        <extension>
            <div>
                <strong>{{displayNames['Namespace']}}:</strong>
                <template v-if="editMode || newMode">
                    <single-line-input :placeholder="displayNames['Namespace']"
                                       placeholder-css-class="text-muted"
                                       v-model="entity.namespace"
                                       @input="dirty()"
                                       class="d-inline-block"></single-line-input>
                </template>
                <template v-else>
                    <template v-if="entity.namespace">
                        {{entity.namespace}}
                    </template>
                    <template v-else>
                        <i class="text-muted">None</i>
                    </template>
                </template>
            </div>
            <div>
                <strong>{{displayNames['GenerateLocation']}}:</strong>
                <template v-if="editMode || newMode">
                    <single-line-input :placeholder="displayNames['GenerateLocation']"
                                       placeholder-css-class="text-muted"
                                       v-model="entity.generateLocation"
                                       @input="dirty()"
                                       class="d-inline-block"></single-line-input>
                </template>
                <template v-else>
                    <template v-if="entity.generateLocation">
                        {{entity.generateLocation}}
                    </template>
                    <template v-else>
                        <i class="text-muted">None</i>
                    </template>
                </template>
            </div>
            <div>
                <strong>{{displayNames['WorkingLocation']}}:</strong>
                <template v-if="editMode || newMode">
                    <single-line-input :placeholder="displayNames['WorkingLocation']"
                                       placeholder-css-class="text-muted"
                                       v-model="entity.workingLocation"
                                       @input="dirty()"
                                       class="d-inline-block"></single-line-input>
                </template>
                <template v-else>
                    <template v-if="entity.workingLocation">
                        {{entity.workingLocation}}
                    </template>
                    <template v-else>
                        <i class="text-muted">None</i>
                    </template>
                </template>
            </div>
            <section class="mt-4" v-if="!newMode">
                <div class="row">
                    <div class="col-lg-8 col-xl-9">
                        <h3>{{displayNames['Modules']}}</h3>
                    </div>
                    <div class="col-lg-4 col-xl-3">
                        <div class="btn-toolbar justify-content-md-end mb-3 mb-md-0" v-if="entity.modules.length > 0">
                            <div class="btn-group">
                                <a class="btn btn-sm btn-outline-primary"
                                   :href="newModuleUrl"
                                   title="New Module"
                                   v-bind:disabled="freezed">
                                    <font-awesome-icon :icon="['fal', 'plus']" fixed-width></font-awesome-icon>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <p v-if="entity.modules.length === 0">
                    There is no module in this project.
                    <template>
                        Please
                        <a class="btn btn-sm btn-primary"
                           :href="newModuleUrl">
                            add a new one
                        </a>.
                    </template>
                </p>
                <div v-else class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col" class="text-right w-tight">{{displayNames['Position']}}</th>
                                <th scope="col">{{displayNames['Name']}}</th>
                                <th scope="col" class="text-center">{{displayNames['HasOwnNamespace']}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(module, index) in entity.modules">
                                <td class="text-right">{{module.position}}</td>
                                <td>
                                    <a :href="viewModuleUrl + '/' + module.id">{{module.name}}</a>
                                </td>
                                <td class="text-center">
                                    <font-awesome-icon :icon="['fal', 'check-square']" fixed-width v-if="module.hasOwnNamespace"></font-awesome-icon>
                                    <font-awesome-icon :icon="['fal', 'square']" fixed-width v-if="!module.hasOwnNamespace"></font-awesome-icon>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </extension>
    </extensions>
</template>

<script>
    import EditPageController from '../../shared/components/pages/EditPageController';

    export class NewViewPageController extends EditPageController {

        // Static

        static get props() {
            return {
                ...super.props,
                newModuleUrl: {
                    type: String
                    // required: !newMode
                },
                viewModuleUrl: {
                    type: String
                    // required: !newMode
                },
                generateUrl: {
                    type: String,
                    // required: !newMode
                }
            };
        }

        static getConfig(controllerClass = NewViewPageController) {
            return super.getConfig(controllerClass);
        }

        static adjustPropsSpec(vm) {
            super.adjustPropsSpec(vm);

            const newMode = vm.$options.propsData.newMode === '' || vm.$options.propsData.newMode === true;
            vm.$options.props.newModuleUrl.required = !newMode;
            vm.$options.props.viewModuleUrl.required = !newMode;
            vm.$options.props.generateUrl.required = !newMode;
        }

        // Constructor

        constructor(vm) {
            super(vm);

            this.entityServerValidationErrorHandler = new ProjectServerValidationErrorHandler();
        }

        // Internal

        get emptyEntityErrors() {
            return {
                ...super.emptyEntityErrors,
                name: []
            }
        }

        convertToWorkEntity(loadedProject) {
            const editableProject = super.convertToWorkEntity(loadedProject);

            return editableProject;
        }

        convertToSerializableEntity(editableProject) {
            const serializableProject = super.convertToSerializableEntity(editableProject);

            // Nullable strings
            this.normalizeNullableStrings(serializableProject, [
                'namespace',
                'generateLocation',
                'workingLocation'
            ]);

            delete serializableProject.modules;

            return serializableProject;
        }

        validateEntity(editableProject) {
            super.validateEntity(editableProject);

            !editableProject.name &&
                editableProject.errors.name.push('Name is required.');

            return !this.hasError(editableProject.errors);
        }
    }

    export class ProjectServerValidationErrorHandler {
        handleErrors(editableProject, errors) {
            if (_.isArray(errors)) {    // MotiNet errors
                for (const error of errors) {
                    switch (error.code) {
                        case 'DuplicateProjectName':
                            editableProject.errors.name.push(error.description);
                            break;
                        default:
                            editableProject.errors.general.push(error.description);
                            break;
                    }
                }
            } else {                    // AspNet errors
                _.forIn(errors, function (errorMessages, errorKey) {
                    switch (errorKey) {
                        default:
                            editableProject.errors.general = _.concat(editableProject.errors.general, errorMessages);
                            break;
                    }
                });
            }
        }
    }

    export default NewViewPageController.getConfig();
</script>