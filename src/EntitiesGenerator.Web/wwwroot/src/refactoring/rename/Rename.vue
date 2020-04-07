<template extends="../../shared/components/pages/Page.vue">
    <extensions>
        <extension point="header">
            <h2>Rename</h2>
        </extension>

        <extension>
            <form @submit.prevent="replace">
                <div class="form-group">
                    <input type="text"
                           class="form-control form-control-sm"
                           placeholder="Path"
                           v-model="path"
                           @blur="updatePath">
                </div>
                <div class="form-group">
                    <input type="text"
                           class="form-control form-control-sm"
                           placeholder="Find"
                           v-model="oldText"
                           @blur="find">
                </div>
                <div class="form-group">
                    <input type="text"
                           class="form-control form-control-sm"
                           placeholder="Replace"
                           v-model="newText">
                </div>
                <div class="form-group">
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox"
                               class="custom-control-input"
                               id="recursive"
                               v-model="caseSensitive">
                        <label class="custom-control-label" for="recursive">Case Sensitive</label>
                    </div>
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox"
                               class="custom-control-input"
                               id="recursive"
                               v-model="recursive">
                        <label class="custom-control-label" for="recursive">Recursive</label>
                    </div>
                </div>
                <button type="submit" class="btn btn-sm btn-primary">Replace</button>
            </form>
            <div class="my-3">
                Finding and replacing at path '{{foundPath}}'.
            </div>
            <div class="my-3">
                <div class="table-responsive">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <td>Path</td>
                                <td>File / Folder Name</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="result in findResults">
                                <td>
                                    <a class="mr-2"
                                       :title="result.root + result.path"
                                       href="javascript:void(0)"
                                       @click="copyPathToClipboard(result.root + result.path)">
                                        <span class="fa fa-w fa-folder text-warning"></span>
                                    </a>
                                    {{result.path}}
                                </td>
                                <td>
                                    <template v-if="result.folderName">
                                        <a class="mr-2"
                                           :title="result.absolutePath"
                                           href="javascript:void(0)"
                                           @click="copyPathToClipboard(result.absolutePath)">
                                            <span class="fa fa-w fa-folder text-warning"></span>
                                        </a>
                                        <span v-html="result.formattedFolderName"></span>
                                    </template>
                                    <template v-if="result.fileName">
                                        <a class="mr-2"
                                           :title="result.absolutePath"
                                           href="javascript:void(0)"
                                           @click="copyPathToClipboard(result.absolutePath)">
                                            <span class="fal fa-w fa-file"></span>
                                        </a>
                                        <span v-html="result.formattedFileName"></span>
                                    </template>
                                </td>
                            </tr>
                            <tr v-for="result in replaceResults">
                                <td>
                                    <a class="mr-2"
                                       :title="result.root + result.path"
                                       href="javascript:void(0)"
                                       @click="copyPathToClipboard(result.root + result.path)">
                                        <span class="fa fa-w fa-folder text-warning"></span>
                                    </a>
                                    {{result.path}}
                                </td>
                                <td>
                                    <template v-if="result.newFolderName">
                                        <div>
                                            <a class="mr-2"
                                               :title="result.absolutePath"
                                               href="javascript:void(0)"
                                               @click="copyPathToClipboard(result.absolutePath)">
                                                <span class="fa fa-w fa-folder text-warning"></span>
                                            </a>
                                            <span v-html="result.formattedNewFolderName"></span>
                                        </div>
                                        <div>
                                            <span class="fa fa-w fa-folder text-secondary mr-2"></span>
                                            <span v-html="result.formattedOldFolderName"></span>
                                        </div>
                                    </template>
                                    <template v-if="result.newFileName">
                                        <div>
                                            <a class="mr-2"
                                               :title="result.absolutePath"
                                               href="javascript:void(0)"
                                               @click="copyPathToClipboard(result.absolutePath)">
                                                <span class="fal fa-w fa-file"></span>
                                            </a>
                                            <span v-html="result.formattedNewFileName"></span>
                                        </div>
                                        <div>
                                            <span class="fa fa-w fa-file text-secondary mr-2"></span>
                                            <span v-html="result.formattedOldFileName"></span>
                                        </div>
                                    </template>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </extension>
    </extensions>
</template>

<script>
    import axios from 'axios';
    import Swal from 'sweetalert2';
    import PageController from '../../shared/components/pages/PageController';
    import VueConfigHelper from '../../shared/utilities/VueConfigHelper';


    export class RenamePageController extends PageController {

        // Static

        static get props() {
            return {
                ...super.props,
                checkPathUrl: {
                    type: String,
                    required: true
                },
                findUrl: {
                    type: String,
                    required: true
                },
                replaceUrl: {
                    type: String,
                    required: true
                }
            };
        }

        static get data() {
            return {
                ...super.data,
                path: null,
                foundPath: null,
                oldText: null,
                newText: null,
                caseSensitive: true,
                recursive: true,
                findResults: [],
                replaceResults: []
            };
        }

        static get methods() {
            return {
                ...super.methods,
                ...VueConfigHelper.getMethods(RenamePageController)
            };
        }

        static getConfig(controllerClass = RenamePageController) {
            return super.getConfig(controllerClass);
        }

        // Methods

        $updatePath() {
            if (!this.vm.path) {
                return;
            }

            const data = {
                path: this.vm.path
            };

            axios
                .post(this.vm.checkPathUrl, data)
                .then(response => {
                    const result = response.data;
                    if (result.found) {
                        this.vm.foundPath = result.path;
                    } else {
                        this.showError('Path \'' + result.path + '\' not found.');
                    }
                })
                .catch(error => {
                    this.showError('There is error checking Path.', error);
                });
        }

        $find() {
            if (!this.vm.foundPath || !this.vm.oldText) {
                return;
            }

            this.vm.findResults = [];
            this.vm.replaceResults = [];

            const data = {
                path: this.vm.foundPath,
                search: this.vm.oldText,
                caseSensitive: this.vm.caseSensitive,
                recursive: this.vm.recursive
            };

            axios
                .post(this.vm.findUrl, data)
                .then(response => {
                    this.processFindResults(response.data);
                })
                .catch(error => {
                    this.showError('There is error finding in Path.', error);
                });
        }

        $replace() {
            if (!this.vm.foundPath || !this.vm.oldText) {
                return;
            }

            this.vm.findResults = [];
            this.vm.replaceResults = [];

            const data = {
                path: this.vm.foundPath,
                search: this.vm.oldText,
                replace: this.vm.newText,
                caseSensitive: this.vm.caseSensitive,
                recursive: this.vm.recursive
            };

            axios
                .post(this.vm.replaceUrl, data)
                .then(response => {
                    this.processReplaceResults(response.data);
                })
                .catch(error => {
                    this.showError('There is error replacing in Path.', error);
                });
        }

        $copyPathToClipboard(path) {
            const copyToClipboard = str => {
                const el = document.createElement('textarea');
                el.value = str;
                el.setAttribute('readonly', '');
                el.style.position = 'absolute';
                el.style.left = '-9999px';
                document.body.appendChild(el);
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);
            };

            copyToClipboard(path);

            Swal.fire({
                icon: 'success',
                title: 'Path copied',
                footer: path,
                showConfirmButton: false,
                timer: 1500
            });
        }

        // Internal

        processFindResults(result) {
            var findResults = [];
            findResults = findResults.concat(process(result.folders, 'folder'));
            findResults = findResults.concat(process(result.files, 'file'));
            this.vm.findResults = findResults;

            function process(items, itemType) {
                const findResults = [];
                var searchReg = new RegExp(result.search, result.caseSensitive ? 'g' : 'ig');

                for (const item of items) {
                    const absolutePath = result.path + item;
                    const slashPosition = item.lastIndexOf('\\');
                    const path = item.substring(0, slashPosition + 1);
                    const itemName = item.substring(slashPosition + 1);
                    const formattedItemName = itemName.replace(searchReg, highlightSearch);
                    const findResult = {
                        root: result.path,
                        absolutePath: absolutePath,
                        relativePath: item,
                        path: path
                    }

                    findResult[itemType + 'Name'] = itemName;
                    findResult['formatted' + itemType.replace(/^\w/, c => c.toUpperCase()) + 'Name'] = formattedItemName;
                    findResults.push(findResult);
                }

                return findResults;
            }

            function highlightSearch(match, offset, string) {
                const value = string.substr(offset, match.length);
                const highlight = '<span class="text-danger"><b>' + value + '</b></span>';
                return highlight;
            }
        }

        processReplaceResults(result) {
            var replaceResults = [];
            replaceResults = replaceResults.concat(process(result.folders, 'folder'));
            replaceResults = replaceResults.concat(process(result.files, 'file'));
            this.vm.replaceResults = replaceResults;

            function process(items, itemType) {
                const replaceResults = [];
                var searchReg = new RegExp(result.search, result.caseSensitive ? 'g' : 'ig');

                for (const item of items) {
                    const absolutePath = result.path + item.newValue;
                    const slashPosition = item.newValue.lastIndexOf('\\');
                    const path = item.newValue.substring(0, slashPosition + 1);
                    const oldItemName = item.oldValue.substring(slashPosition + 1);
                    const newItemName = item.newValue.substring(slashPosition + 1);
                    const itemNameDiff = item.diff.substring(slashPosition + 1);
                    const formattedOldItemName = oldItemName.replace(searchReg, highlightSearch);
                    const formattedNewItemName = itemNameDiff
                        .replace(/</g, '<span class="text-success"|<b|')
                        .replace(/>/g, '</b></span>')
                        .replace(/\|/g, '>');
                    const replaceResult = {
                        root: result.path,
                        absolutePath: absolutePath,
                        relativePath: item.newValue,
                        path: path
                    };

                    itemType = itemType.replace(/^\w/, c => c.toUpperCase());
                    replaceResult['new' + itemType + 'Name'] = newItemName;
                    replaceResult['formattedOld' + itemType + 'Name'] = formattedOldItemName;
                    replaceResult['formattedNew' + itemType + 'Name'] = formattedNewItemName;
                    replaceResults.push(replaceResult);
                }

                return replaceResults;
            }

            function highlightSearch(match, offset, string) {
                const value = string.substr(offset, match.length);
                const highlight = '<span class="text-danger"><b>' + value + '</b></span>';
                return highlight;
            }
        }
    }

    export default RenamePageController.getConfig();
</script>