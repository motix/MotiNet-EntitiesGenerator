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
            <section v-if="!newMode">
                <h3>{{displayNames['FeatureSettings']}}</h3>
                <div>
                    Features
                </div>
            </section>
        </extension>
    </extensions>
</template>

<script>
    import _ from 'lodash';

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
            return {
                ...super.emptyEditableEntity,
                moduleId: this.vm.moduleId
            }
        }

        get emptyEntityErrors() {
            return {
                ...super.emptyEntityErrors,
                position: [],
                name: []
            }
        }

        convertToWorkEntity(loadedItem) {
            const editableItem = super.convertToWorkEntity(loadedItem);

            return editableItem;
        }

        convertToSerializableEntity(editableItem) {
            const serializableItem = super.convertToSerializableEntity(editableItem);

            delete serializableItem.module;

            return serializableItem;
        }

        validateEntity(editableItem) {
            super.validateEntity(editableItem);

            !editableItem.position && editableItem.position !== 0 &&
                editableItem.errors.position.push('Position is required.');

            !editableItem.name &&
                editableItem.errors.name.push('Name is required.');

            return !this.hasError(editableItem.errors);
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