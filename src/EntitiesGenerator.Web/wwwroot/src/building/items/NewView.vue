<template extends="../../shared/components/pages/EditPage.vue">
    <extensions>
        <extension point="breadcrumb">
            <a :href="returnUrl">
                <template v-if="newMode">
                    {{moduleName}}
                </template>
                <template v-else>
                    {{entity.module.name}}
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
                <strong>{{displayNames['DisplayName']}}:</strong>
                <template v-if="editMode || newMode">
                    <single-line-input :placeholder="displayNames['DisplayName']"
                                       placeholder-css-class="text-muted"
                                       v-model="entity.displayName"
                                       @input="dirty()"
                                       class="d-inline-block"></single-line-input>
                    <div class="small text-danger">
                        <div v-for="error in entity.errors.displayName">{{error}}</div>
                    </div>
                </template>
                <template v-else>
                    {{entity.displayName}}
                </template>
            </div>
            <div>
                <div class="custom-control custom-switch">
                    <input type="checkbox"
                           class="custom-control-input"
                           id="parameterListLineBreakSwitch"
                           v-bind:disabled="!newMode && !editMode"
                           v-model="entity.parameterListLineBreak"
                           @change="dirty()">
                    <label class="custom-control-label" for="parameterListLineBreakSwitch">{{displayNames['ParameterListLineBreak']}}</label>
                </div>
            </div>
            <section class="mt-4" v-if="!newMode">
                <h3>{{displayNames['FeatureSettings']}}</h3>
                <div>
                    <section class="mt-3">
                        <h4>
                            <span class="custom-control custom-switch">
                                <input type="checkbox"
                                       class="custom-control-input"
                                       id="entityFeatureSettingEnabledSwitch"
                                       v-bind:disabled="!newMode && !editMode"
                                       v-model="entity.entityFeatureSetting.enabled"
                                       @change="dirty()">
                                <label class="custom-control-label" for="entityFeatureSettingEnabledSwitch">Entity</label>
                            </span>
                        </h4>
                    </section>
                    <section class="mt-3">
                        <h4>
                            <span class="custom-control custom-switch">
                                <input type="checkbox"
                                       class="custom-control-input"
                                       id="timeTrackedEntityFeatureSettingEnabledSwitch"
                                       v-bind:disabled="!newMode && !editMode"
                                       v-model="entity.timeTrackedEntityFeatureSetting.enabled"
                                       @change="dirty()">
                                <label class="custom-control-label" for="timeTrackedEntityFeatureSettingEnabledSwitch">Time Tracked Entity</label>
                            </span>
                        </h4>
                    </section>
                    <section class="mt-3">
                        <h4>
                            <span class="custom-control custom-switch">
                                <input type="checkbox"
                                       class="custom-control-input"
                                       id="codeBasedEntityFeatureSettingEnabledSwitch"
                                       v-bind:disabled="!newMode && !editMode"
                                       v-model="entity.codeBasedEntityFeatureSetting.enabled"
                                       @change="dirty()">
                                <label class="custom-control-label" for="codeBasedEntityFeatureSettingEnabledSwitch">Code Based Entity</label>
                            </span>
                        </h4>
                        <div class="ml-4 pl-3 border-left" v-if="entity.codeBasedEntityFeatureSetting.enabled">
                            <div class="custom-control custom-switch">
                                <input type="checkbox"
                                       class="custom-control-input"
                                       id="codeBasedEntityFeatureSettingHasCodeGeneratorSwitch"
                                       v-bind:disabled="!newMode && !editMode"
                                       v-model="entity.codeBasedEntityFeatureSetting.hasCodeGenerator"
                                       @change="dirty()">
                                <label class="custom-control-label" for="codeBasedEntityFeatureSettingHasCodeGeneratorSwitch">{{displayNames['HasCodeGenerator']}}</label>
                            </div>
                        </div>
                    </section>
                    <section class="mt-3">
                        <h4>
                            <span class="custom-control custom-switch">
                                <input type="checkbox"
                                       class="custom-control-input"
                                       id="nameBasedEntityFeatureSettingEnabledSwitch"
                                       v-bind:disabled="!newMode && !editMode"
                                       v-model="entity.nameBasedEntityFeatureSetting.enabled"
                                       @change="dirty()">
                                <label class="custom-control-label" for="nameBasedEntityFeatureSettingEnabledSwitch">Name Based Entity</label>
                            </span>
                        </h4>
                    </section>
                    <section class="mt-3">
                        <h4>
                            <span class="custom-control custom-switch">
                                <input type="checkbox"
                                       class="custom-control-input"
                                       id="scopedNameBasedEntityFeatureSettingEnabledSwitch"
                                       v-bind:disabled="!newMode && !editMode"
                                       v-model="entity.scopedNameBasedEntityFeatureSetting.enabled"
                                       @change="dirty()">
                                <label class="custom-control-label" for="scopedNameBasedEntityFeatureSettingEnabledSwitch">Scoped Name Based Entity</label>
                            </span>
                        </h4>
                        <div class="ml-4 pl-3 border-left" v-if="entity.scopedNameBasedEntityFeatureSetting.enabled">
                            <strong>{{displayNames['ScopeName']}}:</strong>
                            <template v-if="editMode || newMode">
                                <single-line-input :placeholder="displayNames['ScopeName']"
                                                   placeholder-css-class="text-muted"
                                                   v-model="entity.scopedNameBasedEntityFeatureSetting.scopeName"
                                                   @input="dirty()"
                                                   class="d-inline-block"></single-line-input>
                                <div class="small text-danger">
                                    <div v-for="error in entity.errors.scopedNameBasedEntityFeatureSetting.scopeName">{{error}}</div>
                                </div>
                            </template>
                            <template v-else>
                                {{entity.scopedNameBasedEntityFeatureSetting.scopeName}}
                            </template>
                        </div>
                    </section>
                    <section class="mt-3">
                        <h4>
                            <span class="custom-control custom-switch">
                                <input type="checkbox"
                                       class="custom-control-input"
                                       id="readableIdEntityFeatureSettingEnabledSwitch"
                                       v-bind:disabled="!newMode && !editMode"
                                       v-model="entity.readableIdEntityFeatureSetting.enabled"
                                       @change="dirty()">
                                <label class="custom-control-label" for="readableIdEntityFeatureSettingEnabledSwitch">Readable ID Entity</label>
                            </span>
                        </h4>
                    </section>
                    <section class="mt-3">
                        <h4>
                            <span class="custom-control custom-switch">
                                <input type="checkbox"
                                       class="custom-control-input"
                                       id="onOffEntityFeatureSettingEnabledSwitch"
                                       v-bind:disabled="!newMode && !editMode"
                                       v-model="entity.onOffEntityFeatureSetting.enabled"
                                       @change="dirty()">
                                <label class="custom-control-label" for="onOffEntityFeatureSettingEnabledSwitch">On Off Entity</label>
                            </span>
                        </h4>
                    </section>
                    <section class="mt-3">
                        <h4>
                            <span class="custom-control custom-switch">
                                <input type="checkbox"
                                       class="custom-control-input"
                                       id="preprocessedEntityFeatureSettingEnabledSwitch"
                                       v-bind:disabled="!newMode && !editMode"
                                       v-model="entity.preprocessedEntityFeatureSetting.enabled"
                                       @change="dirty()">
                                <label class="custom-control-label" for="preprocessedEntityFeatureSettingEnabledSwitch">Preprocessed Entity</label>
                            </span>
                        </h4>
                    </section>
                </div>
            </section>
        </extension>
    </extensions>
</template>

<script>
    import ContentHelper from '../projects/generate/content-helper';

    import EditPageController from '../../shared/components/pages/EditPageController';

    export class NewViewPageController extends EditPageController {

        // Static

        static get props() {
            return {
                ...super.props,
                moduleId: {
                    type: String
                    // required: newMode
                },
                moduleName: {
                    type: String
                    // required: newMode
                },
            };
        }

        static getConfig(controllerClass = NewViewPageController) {
            return super.getConfig(controllerClass);
        }

        static adjustPropsSpec(vm) {
            super.adjustPropsSpec(vm);

            const newMode = vm.$options.propsData.newMode === '' || vm.$options.propsData.newMode === true;
            vm.$options.props.moduleId.required = newMode;
            vm.$options.props.moduleName.required = newMode;
        }

        // Constructor

        constructor(vm) {
            super(vm);

            this.entityServerValidationErrorHandler = new ItemServerValidationErrorHandler();
        }

        // Internal

        get emptyEditableEntity() {
            const entity = {
                ...super.emptyEditableEntity,
                moduleId: this.vm.moduleId
            }

            this.fillMissingFeatureSettings(entity);

            return entity;
        }

        get emptyEntityErrors() {
            return {
                ...super.emptyEntityErrors,
                position: [],
                name: [],
                displayName: [],
                scopedNameBasedEntityFeatureSetting: {
                    scopeName: []
                }
            }
        }

        get emptyEntityFeatureSetting() {
            return {
                itemId: '_',
                enabled: false
            };
        }

        get emptyTimeTrackedEntityFeatureSetting() {
            return {
                itemId: '_',
                enabled: false
            };
        }

        get emptyCodeBasedEntityFeatureSetting() {
            return {
                itemId: '_',
                enabled: false,
                hasCodeGenerator: true
            };
        }

        get emptyNameBasedEntityFeatureSetting() {
            return {
                itemId: '_',
                enabled: false
            };
        }

        get emptyScopedNameBasedEntityFeatureSetting() {
            return {
                itemId: '_',
                enabled: false,
                scopeName: null
            };
        }

        get emptyReadableIdEntityFeatureSetting() {
            return {
                itemId: '_',
                enabled: false
            };
        }

        get emptyOnOffEntityFeatureSetting() {
            return {
                itemId: '_',
                enabled: false
            };
        }

        get emptyPreprocessedEntityFeatureSetting() {
            return {
                itemId: '_',
                enabled: false
            };
        }

        convertToWorkEntity(loadedItem) {
            const editableItem = super.convertToWorkEntity(loadedItem);

            this.fillMissingFeatureSettings(editableItem);

            return editableItem;
        }

        convertToSerializableEntity(editableItem) {
            const serializableItem = super.convertToSerializableEntity(editableItem);

            delete serializableItem.module;
            this.removeDisabledFeatureSettings(serializableItem);

            return serializableItem;
        }

        validateEntity(editableItem) {
            super.validateEntity(editableItem);

            !editableItem.position && editableItem.position !== 0 &&
                editableItem.errors.position.push('Position is required.');

            !editableItem.name &&
                editableItem.errors.name.push('Name is required.');

            !editableItem.displayName &&
                editableItem.errors.displayName.push('Display Name is required.');

            editableItem.scopedNameBasedEntityFeatureSetting.enabled === true && !editableItem.scopedNameBasedEntityFeatureSetting.scopeName &&
                editableItem.errors.scopedNameBasedEntityFeatureSetting.scopeName.push('Scope Name is required.');

            return !this.hasError(editableItem.errors);
        }

        fillMissingFeatureSettings(item) {
            for (const settingName of ContentHelper.featureSettingPropertyNames) {
                if (item[settingName]) {
                    item[settingName].enabled = true;
                    item[settingName].itemId = '_';
                    delete item[settingName].item;
                } else {
                    const emptySettingPropertyName = `empty${_.upperFirst(settingName)}`;
                    item[settingName] = this[emptySettingPropertyName];
                }
            }
        }

        removeDisabledFeatureSettings(item) {
            for (const settingName of ContentHelper.featureSettingPropertyNames) {
                if (item[settingName].enabled === false) {
                    delete item[settingName];
                }
            }
        }
    }

    export class ItemServerValidationErrorHandler {
        handleErrors(editableItem, errors) {
            if (_.isArray(errors)) {    // MotiNet errors
                for (const error of errors) {
                    switch (error.code) {
                        case 'DuplicateItemName':
                            editableItem.errors.name.push(error.description);
                            break;
                        default:
                            editableItem.errors.general.push(error.description);
                            break;
                    }
                }
            } else {                    // AspNet errors
                _.forIn(errors, function (errorMessages, errorKey) {
                    switch (errorKey) {
                        default:
                            editableItem.errors.general = _.concat(editableItem.errors.general, errorMessages);
                            break;
                    }
                });
            }
        }
    }

    export default NewViewPageController.getConfig();
</script>