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
            <div>
                <div class="custom-control custom-switch">
                    <input type="checkbox"
                           class="custom-control-input"
                           id="abstractModelSwitch"
                           v-bind:disabled="!newMode && !editMode"
                           v-model="entity.abstractModel"
                           @change="dirty()">
                    <label class="custom-control-label" for="abstractModelSwitch">{{displayNames['AbstractModel']}}</label>
                </div>
            </div>
            <section class="mt-4" v-if="!newMode">
                <h3>{{displayNames['FeatureSettings']}}</h3>
                <div>
                    <!--EntityFeatureSetting-->
                    <section class="mt-3">
                        <h4>
                            <span class="custom-control custom-switch">
                                <input type="checkbox"
                                       class="custom-control-input"
                                       id="entityFeatureSetting_Enabled_Switch"
                                       v-bind:disabled="!newMode && !editMode"
                                       v-model="entity.entityFeatureSetting.enabled"
                                       @change="dirty()">
                                <label class="custom-control-label" for="entityFeatureSetting_Enabled_Switch">Entity</label>
                            </span>
                        </h4>
                    </section>

                    <!--ReadableIdEntityFeatureSetting-->
                    <section class="mt-3">
                        <h4>
                            <span class="custom-control custom-switch">
                                <input type="checkbox"
                                       class="custom-control-input"
                                       id="readableIdEntityFeatureSetting_Enabled_Switch"
                                       v-bind:disabled="!newMode && !editMode"
                                       v-model="entity.readableIdEntityFeatureSetting.enabled"
                                       @change="dirty()">
                                <label class="custom-control-label" for="readableIdEntityFeatureSetting_Enabled_Switch">Readable ID Entity</label>
                            </span>
                        </h4>
                        <div class="ml-4 pl-3 border-left" v-if="entity.readableIdEntityFeatureSetting.enabled">
                            <div>
                                <strong>{{displayNames['IdSourcePropertyName']}}:</strong>
                                <template v-if="editMode || newMode">
                                    <single-line-input :placeholder="displayNames['IdSourcePropertyName']"
                                                       placeholder-css-class="text-muted"
                                                       v-model="entity.readableIdEntityFeatureSetting.idSourcePropertyName"
                                                       @input="dirty()"
                                                       class="d-inline-block"></single-line-input>
                                    <div class="small text-danger">
                                        <div v-for="error in entity.errors.readableIdEntityFeatureSetting.idSourcePropertyName">{{error}}</div>
                                    </div>
                                </template>
                                <template v-else>
                                    {{entity.readableIdEntityFeatureSetting.idSourcePropertyName}}
                                </template>
                            </div>
                        </div>
                    </section>

                    <!--TimeTrackedEntityFeatureSetting-->
                    <section class="mt-3">
                        <h4>
                            <span class="custom-control custom-switch">
                                <input type="checkbox"
                                       class="custom-control-input"
                                       id="timeTrackedEntityFeatureSetting_Enabled_Switch"
                                       v-bind:disabled="!newMode && !editMode"
                                       v-model="entity.timeTrackedEntityFeatureSetting.enabled"
                                       @change="dirty()">
                                <label class="custom-control-label" for="timeTrackedEntityFeatureSetting_Enabled_Switch">Time Tracked Entity</label>
                            </span>
                        </h4>
                    </section>

                    <!--OnOffEntityFeatureSetting-->
                    <section class="mt-3">
                        <h4>
                            <span class="custom-control custom-switch">
                                <input type="checkbox"
                                       class="custom-control-input"
                                       id="onOffEntityFeatureSetting_Enabled_Switch"
                                       v-bind:disabled="!newMode && !editMode"
                                       v-model="entity.onOffEntityFeatureSetting.enabled"
                                       @change="dirty()">
                                <label class="custom-control-label" for="onOffEntityFeatureSetting_Enabled_Switch">On Off Entity</label>
                            </span>
                        </h4>
                    </section>

                    <!--CodeBasedEntityFeatureSetting-->
                    <section class="mt-3">
                        <h4>
                            <span class="custom-control custom-switch">
                                <input type="checkbox"
                                       class="custom-control-input"
                                       id="codeBasedEntityFeatureSetting_Enabled_Switch"
                                       v-bind:disabled="!newMode && !editMode"
                                       v-model="entity.codeBasedEntityFeatureSetting.enabled"
                                       @change="dirty()">
                                <label class="custom-control-label" for="codeBasedEntityFeatureSetting_Enabled_Switch">Code Based Entity</label>
                            </span>
                        </h4>
                        <div class="ml-4 pl-3 border-left" v-if="entity.codeBasedEntityFeatureSetting.enabled">
                            <div>
                                <strong>{{displayNames['CodePropertyName']}}:</strong>
                                <template v-if="editMode || newMode">
                                    <single-line-input :placeholder="displayNames['CodePropertyName']"
                                                       placeholder-css-class="text-muted"
                                                       v-model="entity.codeBasedEntityFeatureSetting.codePropertyName"
                                                       @input="dirty()"
                                                       class="d-inline-block"></single-line-input>
                                </template>
                                <template v-else>
                                    {{entity.codeBasedEntityFeatureSetting.codePropertyName}}
                                </template>
                            </div>
                            <div>
                                <div class="custom-control custom-switch">
                                    <input type="checkbox"
                                           class="custom-control-input"
                                           id="codeBasedEntityFeatureSetting_HasCodeGenerator_Switch"
                                           v-bind:disabled="!newMode && !editMode"
                                           v-model="entity.codeBasedEntityFeatureSetting.hasCodeGenerator"
                                           @change="dirty()">
                                    <label class="custom-control-label" for="codeBasedEntityFeatureSetting_HasCodeGenerator_Switch">{{displayNames['HasCodeGenerator']}}</label>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!--NameBasedEntityFeatureSetting-->
                    <section class="mt-3">
                        <h4>
                            <span class="custom-control custom-switch">
                                <input type="checkbox"
                                       class="custom-control-input"
                                       id="nameBasedEntityFeatureSetting_Enabled_Switch"
                                       v-bind:disabled="!newMode && !editMode"
                                       v-model="entity.nameBasedEntityFeatureSetting.enabled"
                                       @change="dirty()">
                                <label class="custom-control-label" for="nameBasedEntityFeatureSetting_Enabled_Switch">Name Based Entity</label>
                            </span>
                        </h4>
                        <div class="ml-4 pl-3 border-left" v-if="entity.nameBasedEntityFeatureSetting.enabled">
                            <div>
                                <strong>{{displayNames['NamePropertyName']}}:</strong>
                                <template v-if="editMode || newMode">
                                    <single-line-input :placeholder="displayNames['NamePropertyName']"
                                                       placeholder-css-class="text-muted"
                                                       v-model="entity.nameBasedEntityFeatureSetting.namePropertyName"
                                                       @input="dirty()"
                                                       class="d-inline-block"></single-line-input>
                                </template>
                                <template v-else>
                                    {{entity.nameBasedEntityFeatureSetting.namePropertyName}}
                                </template>
                            </div>
                        </div>
                    </section>

                    <!--ScopedNameBasedEntityFeatureSetting-->
                    <section class="mt-3">
                        <h4>
                            <span class="custom-control custom-switch">
                                <input type="checkbox"
                                       class="custom-control-input"
                                       id="scopedNameBasedEntityFeatureSetting_Enabled_Switch"
                                       v-bind:disabled="!newMode && !editMode"
                                       v-model="entity.scopedNameBasedEntityFeatureSetting.enabled"
                                       @change="dirty()">
                                <label class="custom-control-label" for="scopedNameBasedEntityFeatureSetting_Enabled_Switch">Scoped Name Based Entity</label>
                            </span>
                        </h4>
                        <div class="ml-4 pl-3 border-left" v-if="entity.scopedNameBasedEntityFeatureSetting.enabled">
                            <div>
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
                            <div>
                                <strong>{{displayNames['NamePropertyName']}}:</strong>
                                <template v-if="editMode || newMode">
                                    <single-line-input :placeholder="displayNames['NamePropertyName']"
                                                       placeholder-css-class="text-muted"
                                                       v-model="entity.scopedNameBasedEntityFeatureSetting.namePropertyName"
                                                       @input="dirty()"
                                                       class="d-inline-block"></single-line-input>
                                </template>
                                <template v-else>
                                    {{entity.scopedNameBasedEntityFeatureSetting.namePropertyName}}
                                </template>
                            </div>
                            <div>
                                <div class="custom-control custom-switch">
                                    <input type="checkbox"
                                           class="custom-control-input"
                                           id="scopedNameBasedEntityFeatureSetting_DeleteRestrict_Switch"
                                           v-bind:disabled="!newMode && !editMode"
                                           v-model="entity.scopedNameBasedEntityFeatureSetting.deleteRestrict"
                                           @change="dirty()">
                                    <label class="custom-control-label" for="scopedNameBasedEntityFeatureSetting_DeleteRestrict_Switch">{{displayNames['DeleteRestrict']}}</label>
                                </div>
                            </div>
                            <div>
                                <div class="custom-control custom-switch">
                                    <input type="checkbox"
                                           class="custom-control-input"
                                           id="scopedNameBasedEntityFeatureSetting_HasSortedChildrenInScope_Switch"
                                           v-bind:disabled="!newMode && !editMode"
                                           v-model="entity.scopedNameBasedEntityFeatureSetting.hasSortedChildrenInScope"
                                           @change="dirty()">
                                    <label class="custom-control-label" for="scopedNameBasedEntityFeatureSetting_HasSortedChildrenInScope_Switch">{{displayNames['HasSortedChildrenInScope']}}</label>
                                </div>
                            </div>
                            <div v-if="entity.scopedNameBasedEntityFeatureSetting.hasSortedChildrenInScope">
                                <strong>{{displayNames['SortedChildrenInScopeCriteriaPropertyName']}}:</strong>
                                <template v-if="editMode || newMode">
                                    <single-line-input :placeholder="displayNames['SortedChildrenInScopeCriteriaPropertyName']"
                                                       placeholder-css-class="text-muted"
                                                       v-model="entity.scopedNameBasedEntityFeatureSetting.sortedChildrenInScopeCriteriaPropertyName"
                                                       @input="dirty()"
                                                       class="d-inline-block"></single-line-input>
                                    <div class="small text-danger">
                                        <div v-for="error in entity.errors.scopedNameBasedEntityFeatureSetting.sortedChildrenInScopeCriteriaPropertyName">{{error}}</div>
                                    </div>
                                </template>
                                <template v-else>
                                    {{entity.scopedNameBasedEntityFeatureSetting.sortedChildrenInScopeCriteriaPropertyName}}
                                </template>
                            </div>
                        </div>
                    </section>

                    <!--ChildEntityFeatureSetting-->
                    <section class="mt-3">
                        <h4>
                            <span class="custom-control custom-switch">
                                <input type="checkbox"
                                       class="custom-control-input"
                                       id="childEntityFeatureSetting_Enabled_Switch"
                                       v-bind:disabled="!newMode && !editMode"
                                       v-model="entity.childEntityFeatureSetting.enabled"
                                       @change="dirty()">
                                <label class="custom-control-label" for="childEntityFeatureSetting_Enabled_Switch">Child Entity</label>
                            </span>
                        </h4>
                        <div class="ml-4 pl-3 border-left" v-if="entity.childEntityFeatureSetting.enabled">
                            <div>
                                <strong>{{displayNames['ParentName']}}:</strong>
                                <template v-if="editMode || newMode">
                                    <single-line-input :placeholder="displayNames['ParentName']"
                                                       placeholder-css-class="text-muted"
                                                       v-model="entity.childEntityFeatureSetting.parentName"
                                                       @input="dirty()"
                                                       class="d-inline-block"></single-line-input>
                                    <div class="small text-danger">
                                        <div v-for="error in entity.errors.childEntityFeatureSetting.parentName">{{error}}</div>
                                    </div>
                                </template>
                                <template v-else>
                                    {{entity.childEntityFeatureSetting.parentName}}
                                </template>
                            </div>
                            <div>
                                <div class="custom-control custom-switch">
                                    <input type="checkbox"
                                           class="custom-control-input"
                                           id="childEntityFeatureSetting_DeleteRestrict_Switch"
                                           v-bind:disabled="!newMode && !editMode"
                                           v-model="entity.childEntityFeatureSetting.deleteRestrict"
                                           @change="dirty()">
                                    <label class="custom-control-label" for="childEntityFeatureSetting_DeleteRestrict_Switch">{{displayNames['DeleteRestrict']}}</label>
                                </div>
                            </div>
                            <div>
                                <div class="custom-control custom-switch">
                                    <input type="checkbox"
                                           class="custom-control-input"
                                           id="childEntityFeatureSetting_HasSortedChildrenInParent_Switch"
                                           v-bind:disabled="!newMode && !editMode"
                                           v-model="entity.childEntityFeatureSetting.hasSortedChildrenInParent"
                                           @change="dirty()">
                                    <label class="custom-control-label" for="childEntityFeatureSetting_HasSortedChildrenInParent_Switch">{{displayNames['HasSortedChildrenInParent']}}</label>
                                </div>
                            </div>
                            <div v-if="entity.childEntityFeatureSetting.hasSortedChildrenInParent">
                                <strong>{{displayNames['SortedChildrenInParentCriteriaPropertyName']}}:</strong>
                                <template v-if="editMode || newMode">
                                    <single-line-input :placeholder="displayNames['SortedChildrenInParentCriteriaPropertyName']"
                                                       placeholder-css-class="text-muted"
                                                       v-model="entity.childEntityFeatureSetting.sortedChildrenInParentCriteriaPropertyName"
                                                       @input="dirty()"
                                                       class="d-inline-block"></single-line-input>
                                    <div class="small text-danger">
                                        <div v-for="error in entity.errors.childEntityFeatureSetting.sortedChildrenInParentCriteriaPropertyName">{{error}}</div>
                                    </div>
                                </template>
                                <template v-else>
                                    {{entity.childEntityFeatureSetting.sortedChildrenInParentCriteriaPropertyName}}
                                </template>
                            </div>
                        </div>
                    </section>

                    <!--PreprocessedEntityFeatureSetting-->
                    <section class="mt-3">
                        <h4>
                            <span class="custom-control custom-switch">
                                <input type="checkbox"
                                       class="custom-control-input"
                                       id="preprocessedEntityFeatureSetting_Enabled_Switch"
                                       v-bind:disabled="!newMode && !editMode"
                                       v-model="entity.preprocessedEntityFeatureSetting.enabled"
                                       @change="dirty()">
                                <label class="custom-control-label" for="preprocessedEntityFeatureSetting_Enabled_Switch">Preprocessed Entity</label>
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
                readableIdEntityFeatureSetting: {
                    idSourcePropertyName: []
                },
                scopedNameBasedEntityFeatureSetting: {
                    scopeName: [],
                    sortedChildrenInScopeCriteriaPropertyName: []
                },
                childEntityFeatureSetting: {
                    parentName: [],
                    sortedChildrenInParentCriteriaPropertyName: []
                }
            }
        }

        get emptyEntityFeatureSetting() {
            return {
                itemId: '_',
                enabled: false
            };
        }

        get emptyReadableIdEntityFeatureSetting() {
            return {
                itemId: '_',
                enabled: false,
                IdSourcePropertyName: null
            };
        }

        get emptyTimeTrackedEntityFeatureSetting() {
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

        get emptyCodeBasedEntityFeatureSetting() {
            return {
                itemId: '_',
                enabled: false,
                codePropertyName: null,
                hasCodeGenerator: false
            };
        }

        get emptyNameBasedEntityFeatureSetting() {
            return {
                itemId: '_',
                enabled: false,
                namePropertyName: null
            };
        }

        get emptyScopedNameBasedEntityFeatureSetting() {
            return {
                itemId: '_',
                enabled: false,
                scopeName: null,
                namePropertyName: null,
                deleteRestrict: false,
                hasSortedChildrenInScope: false,
                sortedChildrenInScopeCriteriaPropertyName: null
            };
        }

        get emptyChildEntityFeatureSetting() {
            return {
                itemId: '_',
                enabled: false,
                parentName: null,
                deleteRestrict: false,
                hasSortedChildrenInParent: false,
                sortedChildrenInParentCriteriaPropertyName: null
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

            for (const settingName of ContentHelper.featureSettingPropertyNames) {
                if (editableItem[settingName]) {
                    editableItem[settingName] = Object.assign({}, editableItem[settingName]);
                }
            }

            this.fillMissingFeatureSettings(editableItem);

            return editableItem;
        }

        convertToSerializableEntity(editableItem) {
            const serializableItem = super.convertToSerializableEntity(editableItem);

            // Nullable strings

            if (serializableItem.codeBasedEntityFeatureSetting) {
                this.normalizeNullableStrings(serializableItem.codeBasedEntityFeatureSetting, [
                    'codePropertyName'
                ]);
            }

            if (serializableItem.nameBasedEntityFeatureSetting) {
                this.normalizeNullableStrings(serializableItem.nameBasedEntityFeatureSetting, [
                    'namePropertyName'
                ]);
            }

            if (serializableItem.scopedNameBasedEntityFeatureSetting) {
                this.normalizeNullableStrings(serializableItem.scopedNameBasedEntityFeatureSetting, [
                    'namePropertyName'
                ]);

                if (!serializableItem.scopedNameBasedEntityFeatureSetting.hasSortedChildrenInScope) {
                    this.normalizeNullableStrings(serializableItem.scopedNameBasedEntityFeatureSetting, [
                        'sortedChildrenInScopeCriteriaPropertyName'
                    ]);
                }
            }

            if (serializableItem.childEntityFeatureSetting && !serializableItem.childEntityFeatureSetting.hasSortedChildrenInParent) {
                this.normalizeNullableStrings(serializableItem.childEntityFeatureSetting, [
                    'sortedChildrenInParentCriteriaPropertyName'
                ]);
            }

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

            editableItem.readableIdEntityFeatureSetting.enabled === true && !editableItem.readableIdEntityFeatureSetting.idSourcePropertyName &&
                editableItem.errors.readableIdEntityFeatureSetting.idSourcePropertyName.push('ID Source Property Name is required.');

            editableItem.scopedNameBasedEntityFeatureSetting.enabled === true && !editableItem.scopedNameBasedEntityFeatureSetting.scopeName &&
                editableItem.errors.scopedNameBasedEntityFeatureSetting.scopeName.push('Scope Name is required.');

            editableItem.scopedNameBasedEntityFeatureSetting.enabled === true && editableItem.scopedNameBasedEntityFeatureSetting.hasSortedChildrenInScope && !editableItem.scopedNameBasedEntityFeatureSetting.sortedChildrenInScopeCriteriaPropertyName &&
                editableItem.errors.scopedNameBasedEntityFeatureSetting.sortedChildrenInScopeCriteriaPropertyName.push('Sorted Children in Scope Property Name is required.');

            editableItem.childEntityFeatureSetting.enabled === true && !editableItem.childEntityFeatureSetting.parentName &&
                editableItem.errors.childEntityFeatureSetting.parentName.push('Parent Name is required.');

            editableItem.childEntityFeatureSetting.enabled === true && editableItem.childEntityFeatureSetting.hasSortedChildrenInParent && !editableItem.childEntityFeatureSetting.sortedChildrenInParentCriteriaPropertyName &&
                editableItem.errors.childEntityFeatureSetting.sortedChildrenInParentCriteriaPropertyName.push('Sorted Children in Parent Property Name is required.');

            return !this.hasError(editableItem.errors) &&
                !this.hasError(editableItem.errors.readableIdEntityFeatureSetting) &&
                !this.hasError(editableItem.errors.scopedNameBasedEntityFeatureSetting) &&
                !this.hasError(editableItem.errors.childEntityFeatureSetting);
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