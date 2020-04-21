<template extends="../../shared/components/pages/EditPage.vue">
    <extensions>
        <extension point="breadcrumb">
            <a :href="returnUrl">
                <template v-if="newMode">
                    {{projectName}}
                </template>
                <template v-else>
                    {{entity.project.name}}
                </template>
            </a>
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
        <extension>
            <div>
                <strong>{{displayNames['Position']}}:</strong>
                <template v-if="editMode || newMode">
                    <single-line-input :placeholder="displayNames['Position']"
                                       placeholder-css-class="text-muted"
                                       v-model="entity.position"
                                       @convert-input="(target, args) => target.converter.toNumber(args)"
                                       @convert-output="(target, args) => target.converter.fromNumber(args)"
                                       @input="dirty()"
                                       class="d-inline-block"></single-line-input>
                    <div class="small text-danger">
                        <div v-for="error in entity.errors.position">{{error}}</div>
                    </div>
                </template>
                <template v-else>
                    {{entity.position}}
                </template>
            </div>
            <div>
                <div class="custom-control custom-switch">
                    <input type="checkbox"
                           class="custom-control-input"
                           id="hasOwnNamespaceSwitch"
                           v-bind:disabled="!newMode && !editMode"
                           v-model="entity.hasOwnNamespace"
                           @change="dirty()">
                    <label class="custom-control-label" for="hasOwnNamespaceSwitch">{{displayNames['HasOwnNamespace']}}</label>
                </div>
            </div>
            <div>
                <div class="custom-control custom-switch">
                    <input type="checkbox"
                           class="custom-control-input"
                           id="hasCoreOptionsSwitch"
                           v-bind:disabled="!newMode && !editMode"
                           v-model="entity.hasCoreOptions"
                           @change="dirty()">
                    <label class="custom-control-label" for="hasCoreOptionsSwitch">{{displayNames['HasCoreOptions']}}</label>
                </div>
            </div>
            <div>
                <div class="custom-control custom-switch">
                    <input type="checkbox"
                           class="custom-control-input"
                           id="hasEntityFrameworkCoreSealedModelsOptionsSwitch"
                           v-bind:disabled="!newMode && !editMode"
                           v-model="entity.hasEntityFrameworkCoreSealedModelsOptions"
                           @change="dirty()">
                    <label class="custom-control-label" for="hasEntityFrameworkCoreSealedModelsOptionsSwitch">{{displayNames['HasEntityFrameworkCoreSealedModelsOptions']}}</label>
                </div>
            </div>
            <div>
                <div class="custom-control custom-switch">
                    <input type="checkbox"
                           class="custom-control-input"
                           id="hasAspNetCoreOptionsSwitch"
                           v-bind:disabled="!newMode && !editMode"
                           v-model="entity.hasAspNetCoreOptions"
                           @change="dirty()">
                    <label class="custom-control-label" for="hasAspNetCoreOptionsSwitch">{{displayNames['HasAspNetCoreOptions']}}</label>
                </div>
            </div>
            <section class="mt-4" v-if="!newMode">
                <div class="row">
                    <div class="col-lg-8 col-xl-9">
                        <h3>{{displayNames['Items']}}</h3>
                    </div>
                    <div class="col-lg-4 col-xl-3">
                        <div class="btn-toolbar justify-content-md-end mb-3 mb-md-0" v-if="entity.items.length > 0">
                            <div class="btn-group">
                                <a class="btn btn-sm btn-outline-primary"
                                   :href="newItemUrl"
                                   title="New Item"
                                   v-bind:disabled="freezed">
                                    <font-awesome-icon :icon="['fal', 'plus']" fixed-width></font-awesome-icon>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <p v-if="entity.items.length === 0">
                    There is no item in this module.
                    <template>
                        Please
                        <a class="btn btn-sm btn-primary"
                           :href="newItemUrl">
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
                                <th scope="col">{{displayNames['DisplayName']}}</th>
                                <th scope="col" class="text-center">{{displayNames['ParameterListLineBreak']}}</th>
                                <th scope="col" class="text-center">{{displayNames['AbstractModel']}}</th>
                                <th scope="col">{{displayNames['FeatureSettings']}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in entity.items">
                                <td class="text-right">{{item.position}}</td>
                                <td>
                                    <a :href="viewItemUrl + '/' + item.id">{{item.name}}</a>
                                </td>
                                <td>{{item.displayName}}</td>
                                <td class="text-center">
                                    <font-awesome-icon :icon="['fal', 'check-square']" fixed-width v-if="item.parameterListLineBreak"></font-awesome-icon>
                                    <font-awesome-icon :icon="['fal', 'square']" fixed-width v-if="!item.parameterListLineBreak"></font-awesome-icon>
                                </td>
                                <td class="text-center">
                                    <font-awesome-icon :icon="['fal', 'check-square']" fixed-width v-if="item.abstractModel"></font-awesome-icon>
                                    <font-awesome-icon :icon="['fal', 'square']" fixed-width v-if="!item.abstractModel"></font-awesome-icon>
                                </td>
                                <td>
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
                projectId: {
                    type: String
                    // required: newMode
                },
                projectName: {
                    type: String
                    // required: newMode
                },
                newItemUrl: {
                    type: String
                    // required: !newMode
                },
                viewItemUrl: {
                    type: String
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
            vm.$options.props.projectId.required = newMode;
            vm.$options.props.projectName.required = newMode;
            vm.$options.props.newItemUrl.required = !newMode;
            vm.$options.props.viewItemUrl.required = !newMode;
        }

        // Constructor

        constructor(vm) {
            super(vm);

            this.entityServerValidationErrorHandler = new ModuleServerValidationErrorHandler();
        }

        // Internal

        get emptyEditableEntity() {
            return {
                ...super.emptyEditableEntity,
                projectId: this.vm.projectId
            }
        }

        get emptyEntityErrors() {
            return {
                ...super.emptyEntityErrors,
                position: [],
                name: []
            }
        }

        convertToWorkEntity(loadedModule) {
            const editableModule = super.convertToWorkEntity(loadedModule);

            return editableModule;
        }

        convertToSerializableEntity(editableModule) {
            const serializableModule = super.convertToSerializableEntity(editableModule);

            delete serializableModule.project;
            delete serializableModule.items;

            return serializableModule;
        }

        validateEntity(editableModule) {
            super.validateEntity(editableModule);

            !editableModule.position && editableModule.position !== 0 &&
                editableModule.errors.position.push('Position is required.');

            !editableModule.name &&
                editableModule.errors.name.push('Name is required.');

            return !this.hasError(editableModule.errors);
        }
    }

    export class ModuleServerValidationErrorHandler {
        handleErrors(editableModule, errors) {
            if (_.isArray(errors)) {    // MotiNet errors
                for (const error of errors) {
                    switch (error.code) {
                        case 'DuplicateModuleName':
                            editableModule.errors.name.push(error.description);
                            break;
                        default:
                            editableModule.errors.general.push(error.description);
                            break;
                    }
                }
            } else {                    // AspNet errors
                _.forIn(errors, function (errorMessages, errorKey) {
                    switch (errorKey) {
                        default:
                            editableModule.errors.general = _.concat(editableModule.errors.general, errorMessages);
                            break;
                    }
                });
            }
        }
    }

    export default NewViewPageController.getConfig();
</script>