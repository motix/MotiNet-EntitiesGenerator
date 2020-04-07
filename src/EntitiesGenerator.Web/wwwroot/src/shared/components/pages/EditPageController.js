import Swal from 'sweetalert2';
import _ from 'lodash';
import VueConfigHelper from '../../utilities/VueConfigHelper';
import DataLoader from '../../utilities/DataLoader';
import DataSaver from '../../utilities/DataSaver';
import { SingleLineInput } from 'mn-anytext-vue';

import PageController from './PageController';

/** @typedef {import("../../utilities/DataLoader").DataLoaderMapping} DataLoaderMapping */
/** @typedef {import("../../utilities/DataSaver").DataSaverMapping} DataSaverMapping */

/**
 * @typedef {import("./PageController").PageInstance} PageInstance
 *
 * @typedef {Object} EditPageInstanceProps
 * @property {EditPageController} controller
 * @property {boolean} newMode Non-read-only
 * @property {boolean} readOnly Non-new mode
 * @property {boolean} deleteRight
 * @property {string} apiUrl
 * @property {{}} displayNames
 * @property {string} id Non-new mode
 * @property {string} viewUrl New mode
 * @property {string} returnUrl
 * @property {any} loadedEntity Non-new mode
 * @property {any} entity
 * @property {boolean} freezed Non-new mode
 * @property {boolean} editMode Non-new mode
 * @property {boolean} isDirty
 * @property {boolean} entityReloading Non-new mode
 * @property {boolean} entityReloadingError Non-new mode
 * @property {boolean} entityEditable Non-new mode
 * @property {boolean} entityDeletable Non-new mode
 *
 * @typedef {{edit(): void,
 *            save(): void
 *            revert(): void,
 *            cancel(): void,
 *            trash(): void,
 *            dirty(): void}} EditPageInstanceMethods
 *
 * @typedef {PageInstance & EditPageInstanceProps & EditPageInstanceMethods} EditPageInstance
 */

export default class EditPageController extends PageController {

    // Static

    static get components() {
        return {
            ...super.components,
            SingleLineInput
        };
    }

    static get props() {
        return {
            ...super.props,
            readOnly: {
                type: Boolean,
                default: false
            },
            newMode: {
                type: Boolean,
                default: false
            },
            apiUrl: {
                type: String,
                required: true
            },
            id: {
                type: [String, Number]
                // required: !newMode
            },
            deleteRight: {
                type: Boolean,
                default: true
            },
            displayNames: {
                type: Object,
                required: true
            },
            viewUrl: {
                type: String
                // required: newMode
            },
            returnUrl: {
                type: String,
                required: true
            }
        };
    }

    static get data() {
        return {
            ...super.data,
            loadedEntity: null,
            entity: null,
            freezed: false,
            editMode: false,
            isDirty: false
        };
    }

    static get computed() {
        return {
            ...super.computed,
            ...VueConfigHelper.getComputed(EditPageController)
        };
    }

    static get methods() {
        return {
            ...super.methods,
            ...VueConfigHelper.getMethods(EditPageController)
        };
    }

    static getConfig(controllerClass = EditPageController) {
        return super.getConfig(controllerClass);
    }

    static adjustPropsSpec(vm) {
        super.adjustPropsSpec(vm);

        const readOnly = vm.$options.propsData.readOnly === '' || vm.$options.propsData.readOnly === true;
        const newMode = vm.$options.propsData.newMode === '' || vm.$options.propsData.newMode === true;

        if (readOnly && newMode) {
            throw 'Readonly and new mode cannot be used at the same time.';
        }

        vm.$options.props.id.required = !newMode;
        vm.$options.props.viewUrl.required = newMode;
    }

    // Constructor

    /**
     * @param {EditPageInstance} vm Vue instance
     */
    constructor(vm) {
        super(vm);

        // Just an extra step to help IntelliSense
        this.vm = vm;

        this.entitySaver = new DataSaver();
        this.entityReloader = new DataLoader();
        /** @type {{handleErrors(editableEntity: object, errors: any): void}} */
        this.entityServerValidationErrorHandler = null;
    }

    // Computed

    get $ready() {
        return super.$ready && this.vm.entity !== null && !this.$entityReloading && !this.$entityReloadingError;
    }

    get $entityReloading() {
        return this.entityReloader.loading;
    }

    get $entityReloadingError() {
        return this.entityReloader.error;
    }

    get $entityEditable() {
        return true;
    }

    get $entityDeletable() {
        return true;
    }

    get $cancelReturnUrl() {
        return this.vm.returnUrl;
    }

    get $deleteReturnUrl() {
        return this.vm.returnUrl;
    }

    // Methods

    $edit() {
        this.enterEditMode();
    }

    $save() {
        if (!this.validateEntity(this.vm.entity)) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Invalid Data',
                text: 'There are errors in the information you provided. Please correct and try again.',
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

        let editModeBackup;
        if (!this.vm.newMode) {
            this.vm.freezed = true;
            editModeBackup = this.backupAndResetEditMode();
        }

        this.entitySaver.reset(...this.entitySaveMappings);
        this.entitySaver
            .start()
            .then(responses => {
                this.doneEntitySaving(responses);
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.errors) {
                    this.entityServerValidationError(editModeBackup, error.response.data.errors);
                } else {
                    this.errorEntitySaving(error);
                }
            });
    }

    $cancel() {
        if (!this.vm.isDirty) {
            window.location = this.$cancelReturnUrl;
            return;
        }

        Swal.fire({
            icon: 'warning',
            title: 'Cancel',
            text: "Are you sure want to cancel? All unsaved data will be lost!",
            showCancelButton: true,
            reverseButtons: true,
            focusConfirm: false
        }).then((result) => {
            if (result.value) {
                window.location = this.$cancelReturnUrl;
            }
        });
    }

    $revert() {
        if (!this.vm.isDirty) {
            this.exitEditMode();
            return;
        }

        Swal.fire({
            icon: 'warning',
            title: 'Discard Changes',
            text: "Are you sure want to revert the information to last saved version? All unsaved data will be lost!",
            showCancelButton: true,
            reverseButtons: true,
            focusConfirm: false
        }).then((result) => {
            if (result.value) {
                this.exitEditMode();
                this.vm.isDirty = false;

                this.vm.entity = this.convertToWorkEntity(this.vm.loadedEntity);
            }
        });
    }

    $trash() {
        Swal.fire({
            icon: 'error',
            title: 'Delete',
            text: "Are you sure want to delete the information? All data will be lost!",
            showCancelButton: true,
            reverseButtons: true,
            focusConfirm: false
        }).then((result) => {
            if (result.value) {
                this.vm.freezed = true;

                this.entitySaver.reset(...this.entityDeleteMappings);
                this.entitySaver
                    .start()
                    .then(responses => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Delete Successful',
                            text: 'The information was deleted successfully.'

                        })
                            .then(() => {
                                window.location = this.$deleteReturnUrl;
                            });
                    })
                    .catch(error => {
                        this.showErrorAndReload('There is error deleting the information.', error);
                    });
            }
        });
    }

    $dirty() {
        this.vm.isDirty = true;
    }

    // Internal

    get initialDataLoadMappings() {
        return this.vm.newMode ?
            super.initialDataLoadMappings :
            [
                ...super.initialDataLoadMappings,
                ...this.entityLoadMappings
            ];
    }

    /**
     * @returns {DataLoaderMapping[]} Initial data loader mapping
     */
    get entityLoadMappings() {
        return [{ key: 'entity', url: this.entityGetUrl }];
    }

    get entityGetUrl() {
        return this.vm.apiUrl + '/' + this.vm.id;
    }

    /**
     * @returns {DataSaverMapping[]} Initial data loader mapping
     */
    get entitySaveMappings() {
        const serializableEntity = this.convertToSerializableEntity(this.vm.entity);
        return [{ key: 'entity', url: this.entitySaveUrl, method: this.vm.newMode ? 'post' : 'put', data: serializableEntity }];
    }

    get entitySaveUrl() {
        return this.vm.apiUrl + (this.vm.newMode ? '' : '/' + this.vm.id);
    }

    /**
     * @returns {DataSaverMapping[]} Initial data loader mapping
     */
    get entityDeleteMappings() {
        return [{ key: 'entity', url: this.entityDeleteUrl, method: 'delete' }];
    }

    get entityDeleteUrl() {
        return this.vm.apiUrl + '/' + this.vm.id;
    }

    get emptyEditableEntity() {
        return {
            errors: this.emptyEntityErrors
        };
    }

    get emptyEntityErrors() {
        return {
            general: []
        };
    }

    entityViewUrl(entity) {
        return this.vm.viewUrl + '/' + entity.id;
    }

    doneInitialDataLoading(responses) {
        super.doneInitialDataLoading(responses);

        if (this.vm.newMode) {
            this.vm.entity = this.emptyEditableEntity;
        } else {
            this.vm.loadedEntity = this.initialDataLoader.store.get('entity').data;
            this.vm.entity = this.convertToWorkEntity(this.vm.loadedEntity);
        }
    }

    enterEditMode() {
        this.editModeEntering();
        this.vm.editMode = true;
        this.editModeEntered();
    }

    exitEditMode() {
        this.editModeExiting();
        this.vm.editMode = false;
        this.editModeExited();
    }

    editModeEntering() { }

    editModeEntered() { }

    editModeExiting() { }

    editModeExited() { }

    doneEntitySaving(responses) {
        if (this.vm.newMode) {
            const response = _.find(responses, function (response) {
                return response.key === 'entity';
            });
            window.location = this.entityViewUrl(response.data);
        } else {
            this.entityReloader.reset(...this.entityLoadMappings);
            this.entityReloader
                .start()
                .then(responses => {
                    this.doneEntityReloading(responses);
                })
                .catch(error => {
                    this.errorEntityReloading(error);
                });
        }
    }

    entityServerValidationError(editModeBackup, errors) {
        if (this.entityServerValidationErrorHandler !== null) {
            this.entityServerValidationErrorHandler.handleErrors(this.vm.entity, errors);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Invalid Data',
                text: 'There are errors in the information you provided. Please correct and try again.',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            this.showError('There are unhandled errors in the information you provided. Please contact support to resolve this.');
        }

        if (!this.vm.newMode) {
            this.restoreEditMode(editModeBackup);
            this.vm.freezed = false;
        }
    }

    errorEntitySaving(error) {
        this.showErrorAndReload('There is error saving the information.', error);
    }

    doneEntityReloading(responses) {
        this.vm.loadedEntity = this.entityReloader.store.get('entity').data;
        this.vm.entity = this.convertToWorkEntity(this.vm.loadedEntity);
        this.vm.isDirty = false;
        this.vm.freezed = false;

        Swal.fire({
            icon: 'success',
            title: 'Information saved',
            showConfirmButton: false,
            timer: 1500
        });
    }

    errorEntityReloading(error) {
        this.showError('There is error reloading the infromation.', error);
    }

    backupAndResetEditMode() {
        const result = this.vm.editMode;
        this.exitEditMode();
        return result;
    }

    restoreEditMode(editModeBackup) {
        if (this.vm.editMode !== editModeBackup) {
            editModeBackup ? this.enterEditMode() : this.exitEditMode();
        }
    }

    convertToWorkEntity(loadedEntity) {
        const editableEntity = Object.assign({}, loadedEntity);
        editableEntity.errors = this.emptyEntityErrors;
        return editableEntity;
    }

    convertToSerializableEntity(editableEntity) {
        const serializableEntity = Object.assign({}, editableEntity);
        delete serializableEntity.errors;
        return serializableEntity;
    }

    validateEntity(editableEntity) {
        editableEntity.errors = this.emptyEntityErrors;
        return true;
    }

    hasError(errors) {
        const result = _.some(errors, function (property) {
            return property.length > 0;
        });
        return result;
    }

    normalizeNullableStrings(entity, fieldPaths) {
        for (const fieldPath of fieldPaths) {
            var fieldValue = getFieldValue(entity, fieldPath);
            if (fieldValue === '') {
                setFieldValue(entity, fieldPath, null);
            }
        }

        function getFieldValue(entity, fieldPath) {
            var fieldNames = fieldPath.split('.');
            var fieldValue = entity;

            for (const fieldName of fieldNames) {
                fieldValue = fieldValue[fieldName];
                if (fieldValue === null) {
                    return null;
                }
            }

            return fieldValue;
        }

        function setFieldValue(entity, fieldPath, value) {
            var fieldNames = fieldPath.split('.');
            var lastFieldName = fieldNames[fieldNames.length - 1];
            fieldNames.pop();
            var fieldValue = entity;

            for (const fieldName of fieldNames) {
                fieldValue = fieldValue[fieldName];
            }

            fieldValue[lastFieldName] = value;
        }
    }
}