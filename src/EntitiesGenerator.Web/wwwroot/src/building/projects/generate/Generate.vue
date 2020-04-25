<template extends="../../../shared/components/pages/EditPage.vue">
    <extensions>
        <extension point="breadcrumb">
            <a :href="returnUrl">Back to Project</a>
        </extension>
        <extension point="title">
            {{entity.name}}
        </extension>
        <extension point="toolbar">
            <div class="btn-toolbar justify-content-md-end mb-3 mb-md-0">
                <div class="btn-group">
                    <button class="btn btn-sm btn-outline-primary mr-2"
                            href="javascript:void(0)"
                            :title="saveToDiskLabel"
                            v-bind:disabled="freezed || !entity.generateLocation"
                            @click="saveToDisk">
                        <font-awesome-icon :icon="['fal', 'download']" fixed-width></font-awesome-icon>
                    </button>
                </div>
                <div class="btn-group">
                    <button class="btn btn-sm btn-outline-danger"
                            href="javascript:void(0)"
                            title="Clear Generate Location"
                            v-bind:disabled="freezed"
                            @click="clearGenerateLocation"
                            v-if="entity.generateLocation">
                        <font-awesome-icon :icon="['fal', 'broom']" fixed-width></font-awesome-icon>
                    </button>
                </div>
            </div>
        </extension>
        <extension>
            <div>
                <div class="custom-control custom-switch">
                    <input type="checkbox"
                           class="custom-control-input"
                           id="solutionViewSwitch"
                           v-model="solutionView">
                    <label class="custom-control-label" for="solutionViewSwitch">Solution View</label>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-md-4 col-xl-3">
                    <h3>Solution Explorer</h3>
                    <div class="table-responsive">
                        <solution-node :solution-view="solutionView"
                                       :model="solutionStructure"
                                       @select="select"></solution-node>
                    </div>
                </div>
                <div class="col-md-8 col-xl-9">
                    <template v-if="selectedNode">
                        <h3>{{selectedNode.name}}</h3>
                        <div>
                            <small class="text-muted"><i v-html="selectedNodePath"></i></small>
                        </div>
                        <small v-if="selectedNodeContentAvailable">
                            <prism :language="selectedNode.generator.language">{{selectedNode.generator.generate()}}</prism>
                        </small>
                        <div class="text-muted" v-else>
                            <i>Content not available for this item.</i>
                        </div>
                    </template>
                    <template v-else>
                        <span class="text-muted"><i>No node selected.</i></span>
                    </template>
                </div>
            </div>
        </extension>
    </extensions>
</template>

<script>
    import axios from 'axios';
    import Swal from 'sweetalert2';
    import 'prismjs';
    import 'prismjs/themes/prism.css';
    import Prism from 'vue-prism-component';
    import VueConfigHelper from '../../../shared/utilities/VueConfigHelper';

    import EditPageController from '../../../shared/components/pages/EditPageController';
    import SolutionStructureGenerator from './structure-generators/solution-structure-generator';
    import SolutionNode from './SolutionNode.vue';

    export class GeneratePageController extends EditPageController {

        // Static

        static get components() {
            return {
                ...super.components,
                Prism: Prism,
                SolutionNode: SolutionNode
            };
        }

        static get props() {
            return {
                ...super.props,
                preSelection: {
                    type: Array,
                    required: false,
                    default: () => []
                },
                saveGeneratedProjectUrl: {
                    type: String,
                    required: true
                },
                clearGenerateLocationUrl: {
                    type: String,
                    required: true
                }
            };
        }

        static get data() {
            return {
                ...super.data,
                solutionView: true,
                selectedNode: null,
                solutionStructure: {}
            };
        }

        static get computed() {
            return {
                ...super.computed,
                ...VueConfigHelper.getComputed(GeneratePageController)
            };
        }

        static get methods() {
            return {
                ...super.methods,
                ...VueConfigHelper.getMethods(GeneratePageController)
            };
        }

        static getConfig(controllerClass = GeneratePageController) {
            return super.getConfig(controllerClass);
        }

        // Computed

        get $saveToDiskLabel() {
            return this.vm.entity && this.vm.entity.generateLocation ? 'Save to Disk' : 'Specify Generate Location to enable Save to Disk';
        }

        get $selectedNodeContentAvailable() {
            const node = this.vm.selectedNode;
            return node.type !== 'folder' && node.type !== 'solutionFolder' && node.generator;
        }

        get $selectedNodePath() {
            const node = this.vm.selectedNode;
            var path;

            if (node.path === null) {
                path = 'Path not available for this item.';
            } else {
                path = node.path;
            }

            return path;
        }

        // Methods

        $select(node) {
            if (this.vm.selectedNode !== null) {
                this.vm.selectedNode.selected = false;
            }

            this.vm.selectedNode = node;
            this.vm.selectedNode.selected = true;
        }

        $saveToDisk() {
            const structure = getNode(this.vm.solutionStructure);
            const data = {
                projectId: this.vm.entity.id,
                solutionStructure: structure,
                clearOutput: false
            }

            this.vm.freezed = true;
            axios
                .post(this.vm.saveGeneratedProjectUrl, data)
                .then(response => {
                    if (response.data === true) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Project saved to Generate Location.',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    } else {
                        this.showError('There is error saving Project.');
                    }
                    this.vm.freezed = false;
                })
                .catch(error => {
                    this.showError('There is error saving Project.', error);
                    this.vm.freezed = false;
                });

            function getNode(node) {
                const result = {
                    name: node.name
                };

                if (node.children) {
                    result.children = [];
                    for (const childNode of node.children) {
                        if (childNode.type === 'solutionFolder') {
                            for (const grandChildNode of childNode.children) {
                                result.children.push(getNode(grandChildNode));
                            }
                        } else {
                            result.children.push(getNode(childNode));
                        }
                    }
                }

                if (node.generator) {
                    result.content = node.generator.generate();
                }

                return result;
            }
        }

        $clearGenerateLocation() {
            Swal.fire({
                icon: 'error',
                title: 'Clear',
                text: "Are you sure want to clear Generate Location? All custom code will be lost!",
                showCancelButton: true,
                reverseButtons: true,
                focusConfirm: false
            }).then((result) => {
                if (result.value) {
                    const data = {
                        projectId: this.vm.entity.id
                    };

                    this.vm.freezed = true;
                    axios
                        .post(this.vm.clearGenerateLocationUrl, data)
                        .then(response => {
                            if (response.data === true) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Generate Location cleared.',
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            } else {
                                this.showError('There is error clearing Generate Location.');
                            }
                            this.vm.freezed = false;
                        })
                        .catch(error => {
                            this.showError('There is error clearing Generate Location.', error);
                            this.vm.freezed = false;
                        });
                }
            });
        }

        // Internal

        doneInitialDataLoading(responses) {
            super.doneInitialDataLoading(responses);

            const solutionStructure = SolutionStructureGenerator.generateSolutionStructure(this.vm.entity);

            setSelected(solutionStructure);

            var id = 0;
            setId(solutionStructure);

            this.vm.solutionStructure = solutionStructure;

            if (this.vm.preSelection.length > 0) {
                window.setTimeout(() => {
                    var node = this.vm.solutionStructure;

                    $(`#collapse_${node.children[0].id}`).collapse('show');

                    for (const index of this.vm.preSelection) {
                        node = node.children[index];

                        if (node.folderType === 'projectFolder') {
                            $(`#collapse_${node.children[0].id}`).collapse('show');
                        } else {
                            $(`#collapse_${node.id}`).collapse('show');
                        }
                    }

                    this.vm.select(node);
                });
            }

            function setId(node) {
                node.id = id;
                id++;
                if (node.children) {
                    for (const child of node.children) {
                        setId(child);
                    }
                }
            }

            function setSelected(node) {
                node.selected = false;
                if (node.children) {
                    for (const child of node.children) {
                        setSelected(child);
                    }
                }
            }
        }

        convertToWorkEntity(loadedProject) {
            const project = loadedProject;

            project.modules = project.fullModules;
            delete project.fullModules;

            for (const module of project.modules) {
                module.project = project;
                module.items = module.fullItems;
                delete module.fullItems;

                for (const item of module.items) {
                    item.module = module;
                }

                module.itemsRelationships = [
                    ...module.oneToManyItemsRelationships,
                    ...module.manyToManyItemsRelationships
                ];
                delete module.oneToManyItemsRelationships;
                delete module.manyToManyItemsRelationships;

                for (const relationship of module.itemsRelationships) {
                    relationship.module = module;
                    delete relationship.moduleId;

                    relationship.item1 = this.findById(relationship.item1Id, module.items);
                    delete relationship.item1Id;

                    relationship.item2 = this.findById(relationship.item2Id, module.items);
                    delete relationship.item2Id;
                }

                for (const item of module.items) {
                    if (item.scopedNameBasedEntityFeatureSetting !== null) {
                        if (!_.some(module.itemsRelationships,
                            value => value.type === 'OneToMany' && value.item1.name === item.scopedNameBasedEntityFeatureSetting.scopeName && value.item2 === item)) {
                            let scope = _.find(module.items, value => value !== item && value.name === item.scopedNameBasedEntityFeatureSetting.scopeName);
                            if (!scope) {
                                scope = {
                                    name: item.scopedNameBasedEntityFeatureSetting.scopeName
                                };
                            }
                            module.itemsRelationships.push({
                                module: module,
                                item1: scope,
                                item2: item,
                                type: "OneToMany"
                            });
                        }
                    }
                    if (item.childEntityFeatureSetting !== null) {
                        if (!_.some(module.itemsRelationships,
                            value => value.type === 'OneToMany' && value.item1.name === item.childEntityFeatureSetting.parentName && value.item2 === item)) {
                            let parent = _.find(module.items, value => value !== item && value.name === item.childEntityFeatureSetting.parentName);
                            if (!parent) {
                                parent = {
                                    name: item.childEntityFeatureSetting.parentName
                                };
                            }
                            module.itemsRelationships.push({
                                module: module,
                                item1: parent,
                                item2: item,
                                type: "OneToMany"
                            });
                        }
                    }
                }
            }

            return project;
        }
    }

    export default GeneratePageController.getConfig();
</script>