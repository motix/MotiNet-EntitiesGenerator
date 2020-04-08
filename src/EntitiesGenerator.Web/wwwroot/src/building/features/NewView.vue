<template extends="../../shared/components/pages/EditPage.vue">
    <extensions>
        <extension point="breadcrumb">
            <a :href="returnUrl">Features</a>
        </extension>
        <extension point="headerInfo">
            <font-awesome-icon :icon="['fas', 'sun']" fixed-width v-if="entity.isActive"></font-awesome-icon>
            <font-awesome-icon :icon="['fal', 'sun']" fixed-width v-if="!entity.isActive"></font-awesome-icon>
            {{activeLabel}}
        </extension>
        <extension point="headerInfoEdit">
            <a href="javascript:void(0)" @click="entity.isActive = !entity.isActive; dirty();">
                <font-awesome-icon :icon="['fas', 'sun']" fixed-width v-if="entity.isActive"></font-awesome-icon>
                <font-awesome-icon :icon="['fal', 'sun']" fixed-width v-if="!entity.isActive"></font-awesome-icon>
                {{activeLabel}}
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
        </extension>
    </extensions>
</template>

<script>
    import _ from 'lodash';
    import VueConfigHelper from '../../shared/utilities/VueConfigHelper';

    import EditPageController from '../../shared/components/pages/EditPageController';

    export class NewViewPageController extends EditPageController {

        // Static

        static get computed() {
            return {
                ...super.computed,
                ...VueConfigHelper.getComputed(NewViewPageController)
            };
        }

        static getConfig(controllerClass = NewViewPageController) {
            return super.getConfig(controllerClass);
        }

        // Constructor

        constructor(vm) {
            super(vm);

            this.entityServerValidationErrorHandler = new FeatureServerValidationErrorHandler();
        }

        // Computed

        get $activeLabel() {
            return this.vm.entity.isActive ? 'Active' : 'Inactive';
        }

        // Internal

        get emptyEditableEntity() {
            return {
                ...super.emptyEditableEntity,
                isActive: true
            }
        }

        get emptyEntityErrors() {
            return {
                ...super.emptyEntityErrors,
                position: [],
                name: []
            }
        }

        validateEntity(editableFeature) {
            super.validateEntity(editableFeature);

            !editableFeature.position && editableFeature.position !== 0 &&
                editableFeature.errors.position.push('Position is required.');

            !editableFeature.name &&
                editableFeature.errors.name.push('Name is required.');

            return !this.hasError(editableFeature.errors);
        }
    }

    export class FeatureServerValidationErrorHandler {
        handleErrors(editableFeature, errors) {
            if (_.isArray(errors)) {    // MotiNet errors
                for (const error of errors) {
                    switch (error.code) {
                        case 'DuplicateFeatureName':
                            editableFeature.errors.name.push(error.description);
                            break;
                        default:
                            editableFeature.errors.general.push(error.description);
                            break;
                    }
                }
            } else {                    // AspNet errors
                _.forIn(errors, function (errorMessages, errorKey) {
                    switch (errorKey) {
                        default:
                            editableFeature.errors.general = _.concat(editableFeature.errors.general, errorMessages);
                            break;
                    }
                });
            }
        }
    }

    export default NewViewPageController.getConfig();
</script>