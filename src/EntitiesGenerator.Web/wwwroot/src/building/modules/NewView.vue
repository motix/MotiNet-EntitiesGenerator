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
                                <th scope="col" class="text-center">{{displayNames['ModelOnly']}}</th>
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
                                    <font-awesome-icon :icon="['fal', 'check-square']" fixed-width v-if="item.modelOnly"></font-awesome-icon>
                                    <font-awesome-icon :icon="['fal', 'square']" fixed-width v-else></font-awesome-icon>
                                </td>
                                <td class="text-center">
                                    <font-awesome-icon :icon="['fal', 'check-square']" fixed-width v-if="item.parameterListLineBreak"></font-awesome-icon>
                                    <font-awesome-icon :icon="['fal', 'square']" fixed-width v-else></font-awesome-icon>
                                </td>
                                <td class="text-center">
                                    <font-awesome-icon :icon="['fal', 'check-square']" fixed-width v-if="item.abstractModel"></font-awesome-icon>
                                    <font-awesome-icon :icon="['fal', 'square']" fixed-width v-else></font-awesome-icon>
                                </td>
                                <td>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            <section class="mt-4" v-if="!newMode">
                <h3>{{displayNames['ItemsRelationships']}}</h3>
                <div class="table-responsive small">
                    <table class="table table-hover table-sm">
                        <thead>
                            <tr>
                                <th scope="col" class="text-right w-tight">{{displayNames['Position']}}</th>
                                <th scope="col" class="text-right w-tight">{{displayNames['Item1']}}</th>
                                <th scope="col" class="w-tight">{{displayNames['Item1PropertyName']}}</th>
                                <th scope="col" class="text-right w-tight">{{displayNames['Item2']}}</th>
                                <th scope="col" class="w-tight">{{displayNames['Item2PropertyName']}}</th>
                                <th scope="col" class="text-center w-tight">{{displayNames['Type']}}</th>
                                <th scope="col">Relationship Settings</th>
                                <th scope="col" class="w-tight"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="entity.itemsRelationships.length === 0">
                                <td colspan="8">
                                    There is no items relationship in this module. Please add a new one.
                                </td>
                            </tr>
                            <tr v-for="relationship in entity.itemsRelationships" v-else>
                                <td class="text-right">
                                    <template v-if="relationship.editMode">
                                        <single-line-input :placeholder="displayNames['Position']"
                                                           placeholder-css-class="text-muted"
                                                           v-model="relationship.position"
                                                           @convert-input="(target, args) => target.converter.toNumber(args)"
                                                           @convert-output="(target, args) => target.converter.fromNumber(args)"
                                                           @input="dirtyItemsRelationship(relationship)"
                                                           class="d-inline-block"></single-line-input>
                                    </template>
                                    <template v-else>
                                        {{relationship.position}}
                                    </template>
                                </td>
                                <td class="text-right text-nowrap">
                                    <code>{{relationship.item1.name}}</code>
                                </td>
                                <td class="text-nowrap">
                                    <template v-if="relationship.editMode">
                                        <single-line-input :placeholder="displayNames['Item1PropertyName']"
                                                           placeholder-css-class="text-muted"
                                                           v-model="relationship.item1PropertyName"
                                                           @input="dirtyItemsRelationship(relationship)"></single-line-input>
                                    </template>
                                    <template v-else-if="relationship.item1PropertyName === null">
                                        <code>.<span class="text-info">{{item1AutoPropertyName(relationship)}}</span></code>
                                    </template>
                                    <template v-else>
                                        <code>.<span class="text-primary">{{relationship.item1PropertyName}}</span></code>
                                    </template>
                                </td>
                                <td class="text-right text-nowrap">
                                    <code>{{relationship.item2.name}}</code>
                                </td>
                                <td class="text-nowrap">
                                    <template v-if="relationship.editMode">
                                        <single-line-input :placeholder="displayNames['Item2PropertyName']"
                                                           placeholder-css-class="text-muted"
                                                           v-model="relationship.item2PropertyName"
                                                           @input="dirtyItemsRelationship(relationship)"></single-line-input>
                                    </template>
                                    <template v-else-if="relationship.item2PropertyName === null">
                                        <code>.<span class="text-info">{{item2AutoPropertyName(relationship)}}</span></code>
                                    </template>
                                    <template v-else>
                                        <code>.<span class="text-primary">{{relationship.item2PropertyName}}</span></code>
                                    </template>
                                </td>
                                <td class="text-center">{{relationship.type}}</td>
                                <td>
                                    <template v-if="relationship.type === 'OneToMany'">
                                        <div class="custom-control custom-switch">
                                            <input type="checkbox"
                                                   class="custom-control-input"
                                                   :id="`itemsRelationship_${relationship.id}_ParentNullable_Switch`"
                                                   v-bind:disabled="!relationship.editMode"
                                                   v-model="relationship.parentNullable"
                                                   @change="dirtyItemsRelationship(relationship)">
                                            <label class="custom-control-label"
                                                   :for="`itemsRelationship_${relationship.id}_ParentNullable_Switch`">{{displayNames['ParentNullable']}}</label>
                                        </div>
                                        <div class="custom-control custom-switch">
                                            <input type="checkbox"
                                                   class="custom-control-input"
                                                   :id="`itemsRelationship_${relationship.id}_DeleteRestrict_Switch`"
                                                   v-bind:disabled="!relationship.editMode"
                                                   v-model="relationship.deleteRestrict"
                                                   @change="dirtyItemsRelationship(relationship)">
                                            <label class="custom-control-label"
                                                   :for="`itemsRelationship_${relationship.id}_DeleteRestrict_Switch`">{{displayNames['DeleteRestrict']}}</label>
                                        </div>
                                        <div class="custom-control custom-switch">
                                            <input type="checkbox"
                                                   class="custom-control-input"
                                                   :id="`itemsRelationship_${relationship.id}_HasSortedChildrenInParent_Switch`"
                                                   v-bind:disabled="!relationship.editMode"
                                                   v-model="relationship.hasSortedChildrenInParent"
                                                   @change="dirtyItemsRelationship(relationship)">
                                            <label class="custom-control-label"
                                                   :for="`itemsRelationship_${relationship.id}_HasSortedChildrenInParent_Switch`">{{displayNames['HasSortedChildrenInParent']}}</label>
                                        </div>
                                        <div v-if="relationship.hasSortedChildrenInParent">
                                            <strong>{{displayNames['SortedChildrenInParentCriteriaPropertyName']}}:</strong>
                                            <template v-if="relationship.editMode">
                                                <single-line-input :placeholder="displayNames['SortedChildrenInParentCriteriaPropertyName']"
                                                                   placeholder-css-class="text-muted"
                                                                   v-model="relationship.sortedChildrenInParentCriteriaPropertyName"
                                                                   @input="dirtyItemsRelationship(relationship)"></single-line-input>
                                            </template>
                                            <template v-else-if="relationship.sortedChildrenInParentCriteriaPropertyName === null">
                                                <i class="text-muted">None</i>
                                            </template>
                                            <template v-else>
                                                {{relationship.sortedChildrenInParentCriteriaPropertyName}}
                                            </template>
                                        </div>
                                    </template>
                                    <template v-if="relationship.type === 'ManyToMany'">
                                        <div class="custom-control custom-switch">
                                            <input type="checkbox"
                                                   class="custom-control-input"
                                                   :id="`itemsRelationship_${relationship.id}_HasSortedItem2sInItem1_Switch`"
                                                   v-bind:disabled="!relationship.editMode"
                                                   v-model="relationship.hasSortedItem2sInItem1"
                                                   @change="dirtyItemsRelationship(relationship)">
                                            <label class="custom-control-label"
                                                   :for="`itemsRelationship_${relationship.id}_HasSortedItem2sInItem1_Switch`">{{displayNames['HasSortedItem2sInItem1']}}</label>
                                        </div>
                                        <div v-if="relationship.hasSortedItem2sInItem1">
                                            <strong>{{displayNames['SortedItem2sInItem1CriteriaPropertyName']}}:</strong>
                                            <template v-if="relationship.editMode">
                                                <single-line-input :placeholder="displayNames['SortedItem2sInItem1CriteriaPropertyName']"
                                                                   placeholder-css-class="text-muted"
                                                                   v-model="relationship.sortedItem2sInItem1CriteriaPropertyName"
                                                                   @input="dirtyItemsRelationship(relationship)"></single-line-input>
                                            </template>
                                            <template v-else-if="relationship.sortedItem2sInItem1CriteriaPropertyName === null">
                                                <i class="text-muted">None</i>
                                            </template>
                                            <template v-else>
                                                {{relationship.sortedItem2sInItem1CriteriaPropertyName}}
                                            </template>
                                        </div>
                                        <div class="custom-control custom-switch">
                                            <input type="checkbox"
                                                   class="custom-control-input"
                                                   :id="`itemsRelationship_${relationship.id}_HasSortedItem1sInItem2_Switch`"
                                                   v-bind:disabled="!relationship.editMode"
                                                   v-model="relationship.hasSortedItem1sInItem2"
                                                   @change="dirtyItemsRelationship(relationship)">
                                            <label class="custom-control-label"
                                                   :for="`itemsRelationship_${relationship.id}_HasSortedItem1sInItem2_Switch`">{{displayNames['HasSortedItem1sInItem2']}}</label>
                                        </div>
                                        <div v-if="relationship.hasSortedItem1sInItem2">
                                            <strong>{{displayNames['SortedItem1sInItem2CriteriaPropertyName']}}:</strong>
                                            <template v-if="relationship.editMode">
                                                <single-line-input :placeholder="displayNames['SortedItem1sInItem2CriteriaPropertyName']"
                                                                   placeholder-css-class="text-muted"
                                                                   v-model="relationship.sortedItem1sInItem2CriteriaPropertyName"
                                                                   @input="dirtyItemsRelationship(relationship)"></single-line-input>
                                            </template>
                                            <template v-else-if="relationship.sortedItem1sInItem2CriteriaPropertyName === null">
                                                <i class="text-muted">None</i>
                                            </template>
                                            <template v-else>
                                                {{relationship.sortedItem1sInItem2CriteriaPropertyName}}
                                            </template>
                                        </div>
                                    </template>
                                </td>
                                <td class="text-right">
                                    <div class="btn-group">
                                        <button class="btn btn-sm btn-outline-primary"
                                                title="Edit"
                                                v-bind:disabled="freezed"
                                                v-if="!relationship.editMode"
                                                @click="editItemsRelationship(relationship)">
                                            <font-awesome-icon :icon="['fal', 'edit']" fixed-width></font-awesome-icon>
                                        </button>
                                        <button class="btn btn-sm btn-primary"
                                                title="Save"
                                                v-bind:disabled="freezed || !relationship.isDirty"
                                                v-if="relationship.editMode"
                                                @click="saveItemsRelationship(relationship)">
                                            <font-awesome-icon :icon="['fal', 'save']" fixed-width></font-awesome-icon>
                                        </button>
                                        <button class="btn btn-sm"
                                                v-bind:class="{ 'btn-warning': relationship.isDirty, 'btn-outline-warning': !relationship.isDirty }"
                                                title="Discard Changes"
                                                v-bind:disabled="freezed"
                                                v-if="relationship.editMode"
                                                @click="revertItemsRelationship(relationship)">
                                            <font-awesome-icon :icon="['fal', 'undo']" fixed-width></font-awesome-icon>
                                        </button>
                                        <button class="btn btn-sm btn-outline-danger"
                                                title="Remove"
                                                v-bind:disabled="freezed"
                                                @click="removeItemsRelationship(relationship)">
                                            <font-awesome-icon :icon="['fal', 'trash-alt']" fixed-width></font-awesome-icon>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-right">
                                    <single-line-input :placeholder="displayNames['Position']"
                                                       placeholder-css-class="text-muted"
                                                       v-model="newItemsRelationship.position"
                                                       @convert-input="(target, args) => target.converter.toNumber(args)"
                                                       @convert-output="(target, args) => target.converter.fromNumber(args)"
                                                       class="d-inline-block"></single-line-input>
                                </td>
                                <td>
                                    <select class="custom-select custom-select-sm"
                                            v-model="newItemsRelationship.item1">
                                        <option v-for="item in entity.items" v-bind:value="item">{{item.name}}</option>
                                    </select>
                                </td>
                                <td>
                                    <single-line-input :placeholder="displayNames['Item1PropertyName']"
                                                       placeholder-css-class="text-muted"
                                                       v-model="newItemsRelationship.item1PropertyName"></single-line-input>
                                </td>
                                <td>
                                    <select class="custom-select custom-select-sm"
                                            v-model="newItemsRelationship.item2">
                                        <option v-for="item in entity.items" v-bind:value="item">{{item.name}}</option>
                                    </select>
                                </td>
                                <td>
                                    <single-line-input :placeholder="displayNames['Item2PropertyName']"
                                                       placeholder-css-class="text-muted"
                                                       v-model="newItemsRelationship.item2PropertyName"></single-line-input>
                                </td>
                                <td>
                                    <select class="custom-select custom-select-sm"
                                            v-model="newItemsRelationship.type">
                                        <option v-for="type in itemsRelationshipTypes" v-bind:value="type">{{type}}</option>
                                    </select>
                                </td>
                                <td></td>
                                <td class="text-right">
                                    <div class="btn-group">
                                        <button class="btn btn-sm btn-outline-primary"
                                                title="Add"
                                                v-bind:disabled="freezed || !newItemsRelationshipValidated"
                                                @click="addItemsRelationship">
                                            <font-awesome-icon :icon="['fal', 'plus']" fixed-width></font-awesome-icon>
                                        </button>
                                    </div>
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
    import pluralize from 'pluralize';
    import axios from 'axios';
    import Swal from 'sweetalert2';
    import TypeList from '../shared/type-lists';
    import VueConfigHelper from '../../shared/utilities/VueConfigHelper';

    import EditPageController from '../../shared/components/pages/EditPageController';

    export class NewViewPageController extends EditPageController {

        // Static

        static get props() {
            const props = {
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
                },
                addItemsRelationshipUrl: {
                    type: String
                    // required: !newMode
                },
                removeItemsRelationshipUrl: {
                    type: String
                    // required: !newMode
                }
            };

            _.each(TypeList.itemsRelationshipTypes,
                value => props[`update${value}ItemsRelationshipUrl`] = {
                    type: String
                    // required: !newMode
                });

            return props;
        }

        static get data() {
            return {
                ...super.data,
                itemsRelationshipTypes: [...TypeList.itemsRelationshipTypes],
                newItemsRelationship: null
            };
        }

        static get computed() {
            return {
                ...super.computed,
                ...VueConfigHelper.getComputed(NewViewPageController)
            };
        }

        static get methods() {
            return {
                ...super.methods,
                ...VueConfigHelper.getMethods(NewViewPageController)
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
            vm.$options.props.addItemsRelationshipUrl.required = !newMode;
            vm.$options.props.removeItemsRelationshipUrl.required = !newMode;
            _.each(TypeList.itemsRelationshipTypes,
                value => vm.$options.props[`update${value}ItemsRelationshipUrl`].required = !newMode);
        }

        // Constructor

        constructor(vm) {
            super(vm);

            this.entityServerValidationErrorHandler = new ModuleServerValidationErrorHandler();
        }

        // Computed

        get $newItemsRelationshipValidated() {
            return (this.vm.newItemsRelationship.position || this.vm.newItemsRelationship.position === 0) &&
                this.vm.newItemsRelationship.item1 &&
                this.vm.newItemsRelationship.item2 &&
                this.vm.newItemsRelationship.type;
        }

        // Methods

        $item1AutoPropertyName(relationship) {
            switch (relationship.type) {
                case 'OneToMany':
                    return pluralize(relationship.item2.name);
                    break;
                case 'ManyToMany':
                    return pluralize(relationship.item2.name);
                    break;
                default:
                    return null;
            }
        }

        $item2AutoPropertyName(relationship) {
            switch (relationship.type) {
                case 'OneToMany':
                    return relationship.item1.name;
                    break;
                case 'ManyToMany':
                    return pluralize(relationship.item1.name);
                    break;
                default:
                    return null;
            }
        }

        $addItemsRelationship() {
            // Nullable strings

            this.normalizeNullableStrings(this.vm.newItemsRelationship, [
                'item1PropertyName',
                'item2PropertyName'
            ]);

            const data = {
                position: this.vm.newItemsRelationship.position,
                item1Id: this.vm.newItemsRelationship.item1.id,
                item2Id: this.vm.newItemsRelationship.item2.id,
                item1PropertyName: this.vm.newItemsRelationship.item1PropertyName,
                item2PropertyName: this.vm.newItemsRelationship.item2PropertyName,
                type: `${this.vm.newItemsRelationship.type}ItemsRelationship`
            };

            this.vm.freezed = true;
            axios
                .post(this.vm.addItemsRelationshipUrl, data)
                .then(response => {
                    response.data.items = this.vm.loadedEntity.items;
                    this.vm.loadedEntity = response.data;
                    this.vm.entity = this.convertToWorkEntity(this.vm.loadedEntity);
                    this.vm.newItemsRelationship = this.emptyItemsRelationship;

                    Swal.fire({
                        icon: 'success',
                        title: 'Items Relationship added.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.vm.freezed = false;
                })
                .catch(error => {
                    this.showError('There is error adding Items Relationship.', error);
                    this.vm.freezed = false;
                });
        }

        $editItemsRelationship(itemsRelationship) {
            itemsRelationship.backup = Object.assign({}, itemsRelationship);
            itemsRelationship.editMode = true;
        }

        $saveItemsRelationship(itemsRelationship) {
            // Nullable strings

            this.normalizeNullableStrings(itemsRelationship, [
                'item1PropertyName',
                'item2PropertyName'
            ]);

            if (itemsRelationship.type === 'OneToMany') {
                this.normalizeNullableStrings(itemsRelationship, [
                    'sortedChildrenInParentCriteriaPropertyName'
                ]);

                if (!itemsRelationship.hasSortedChildrenInParent) {
                    itemsRelationship.sortedChildrenInParentCriteriaPropertyName = null;
                }
            } else if (itemsRelationship.type === 'ManyToMany') {
                this.normalizeNullableStrings(itemsRelationship, [
                    'sortedItem2sInItem1CriteriaPropertyName',
                    'sortedItem1sInItem2CriteriaPropertyName'
                ]);

                if (!itemsRelationship.hasSortedItem2sInItem1) {
                    itemsRelationship.sortedItem2sInItem1CriteriaPropertyName = null;
                }
                if (!itemsRelationship.hasSortedItem1sInItem2) {
                    itemsRelationship.sortedItem1sInItem2CriteriaPropertyName = null;
                }
            }

            const data = Object.assign({}, itemsRelationship);

            data.moduleId = data.module.id;
            delete data.module;
            data.item1Id = data.item1.id;
            delete data.item1;
            data.item2Id = data.item2.id;
            delete data.item2;
            delete data.type;
            delete data.editMode;
            delete data.isDirty;
            delete data.backup;

            this.vm.freezed = true;
            axios
                .post(this.vm[`update${itemsRelationship.type}ItemsRelationshipUrl`], data)
                .then(response => {
                    response.data.items = this.vm.loadedEntity.items;
                    this.vm.loadedEntity = response.data;
                    this.vm.entity = this.convertToWorkEntity(this.vm.loadedEntity);
                    this.vm.newItemsRelationship = this.emptyItemsRelationship;

                    Swal.fire({
                        icon: 'success',
                        title: 'Items Relationship updated.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.vm.freezed = false;
                })
                .catch(error => {
                    this.showError('There is error updating Items Relationship.', error);
                    this.vm.freezed = false;
                });
        }

        $revertItemsRelationship(itemsRelationship) {
            if (!itemsRelationship.isDirty) {
                itemsRelationship.editMode = false;
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
                    const index = itemsRelationship.module.itemsRelationships.indexOf(itemsRelationship);
                    this.vm.$set(itemsRelationship.module.itemsRelationships, index, itemsRelationship.backup);
                }
            });
        }

        $removeItemsRelationship(itemsRelationship) {
            Swal.fire({
                icon: 'error',
                title: 'Remove',
                text: "Are you sure want to remove Items Relationship?",
                showCancelButton: true,
                reverseButtons: true,
                focusConfirm: false
            }).then((result) => {
                if (result.value) {
                    const url = this.vm.removeItemsRelationshipUrl + '/' + itemsRelationship.id;

                    this.vm.freezed = true;
                    axios
                        .post(url)
                        .then(response => {
                            response.data.items = this.vm.loadedEntity.items;
                            this.vm.loadedEntity = response.data;
                            this.vm.entity = this.convertToWorkEntity(this.vm.loadedEntity);

                            Swal.fire({
                                icon: 'success',
                                title: 'Items Relationship removed.',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            this.vm.freezed = false;
                        })
                        .catch(error => {
                            this.showError('There is error removing Items Relationship.', error);
                            this.vm.freezed = false;
                        });
                }
            });
        }

        $dirtyItemsRelationship(itemsRelationship) {
            itemsRelationship.isDirty = true;
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

        get emptyItemsRelationship() {
            return {
                position: null,
                item1: null,
                item2: null,
                item1ProperyName: null,
                item2ProperyName: null,
                type: null
            };
        }

        doneInitialDataLoading(responses) {
            super.doneInitialDataLoading(responses);

            this.vm.newItemsRelationship = this.emptyItemsRelationship;
        }

        convertToWorkEntity(loadedModule) {
            const editableModule = super.convertToWorkEntity(loadedModule);

            editableModule.itemsRelationships = [
                ...editableModule.oneToManyItemsRelationships,
                ...editableModule.manyToManyItemsRelationships
            ];
            delete editableModule.oneToManyItemsRelationships;
            delete editableModule.manyToManyItemsRelationships;
            editableModule.itemsRelationships = _.sortBy(editableModule.itemsRelationships, 'position');

            for (const relationship of editableModule.itemsRelationships) {
                this.vm.$set(relationship, 'module', editableModule);
                delete relationship.moduleId;

                this.vm.$set(relationship, 'item1', this.findById(relationship.item1Id, editableModule.items));
                delete relationship.item1Id;

                this.vm.$set(relationship, 'item2', this.findById(relationship.item2Id, editableModule.items));
                delete relationship.item2Id;

                this.vm.$set(relationship, 'editMode', false);
                this.vm.$set(relationship, 'isDirty', false);
            }

            return editableModule;
        }

        convertToSerializableEntity(editableModule) {
            const serializableModule = super.convertToSerializableEntity(editableModule);

            delete serializableModule.project;
            delete serializableModule.items;
            delete serializableModule.itemsRelationships;

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