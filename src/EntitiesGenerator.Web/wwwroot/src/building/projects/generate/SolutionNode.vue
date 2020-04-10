<template>
    <div>
        <div class="text-nowrap" v-if="!hidden">
            <small>
                <a data-toggle="collapse"
                   :href="'#collapse_' + model.id"
                   role="button"
                   aria-expanded="false"
                   :aria-controls="'collapse_' + model.id"
                   v-if="!hidden && ((model.children && model.children.length > 0) || (siblingsAsChildren && siblings.length > 0))">
                    <font-awesome-icon :icon="[expanded ? 'fa' : 'fal', 'caret-right']" fixed-width :transform="{ rotate: expanded ? 45 : 0 }"></font-awesome-icon>
                </a>
                <span v-else class="invisible">
                    <font-awesome-icon :icon="['fal', 'caret-right']" fixed-width></font-awesome-icon>
                </span>
                <template v-if="model.selected">
                    <strong>{{hideExtension ? fileNameWithoutExtension : model.name}}</strong>
                </template>
                <template v-else>
                    <a :class="{ 'text-dark' : model.selected }"
                       href="javascript:void(0)"
                       @click="select(model)">
                        {{hideExtension ? fileNameWithoutExtension : model.name}}
                    </a>
                </template>
            </small>
        </div>
        <template v-if="model.children || siblingsAsChildren">
            <div :class="{ collapse: !hidden }" :id="'collapse_' + model.id">
                <div :class="{ 'pl-3': !hidden }" v-if="model.children">
                    <div v-for="child in model.children">
                        <solution-node :solution-view="solutionView"
                                       :model="child"
                                       @select="select"
                                       v-if="!isChildOfSibling(child)"></solution-node>
                    </div>
                </div>
                <div :class="{ 'pl-3': !hidden }" v-else-if="siblingsAsChildren">
                    <div v-for="sibling in siblings">
                        <solution-node :solution-view="solutionView"
                                       :model="sibling"
                                       @select="select"></solution-node>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome';

    export default {
        name: 'solution-node',
        components: {
            FontAwesomeIcon,
            FontAwesomeLayers,
            FontAwesomeLayersText
        },
        props: {
            solutionView: true,
            model: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                expanded: false
            }
        },
        mounted: function () {
            this.model.component = this;

            const that = this;
            const collapse = $('#collapse_' + this.model.id);
            collapse.on('show.bs.collapse', (event) => { event.stopPropagation(); that.expanded = true; });
            collapse.on('hide.bs.collapse', (event) => { event.stopPropagation(); that.expanded = false; });
        },
        computed: {
            hidden() {
                if ((this.solutionView && this.model.folderType === 'rootFolder') ||
                    (this.solutionView && this.model.folderType === 'projectFolder') ||
                    (!this.solutionView && this.model.type === 'solutionFolder') ||
                    (this.solutionView && this.model.type === 'excludedFile')) {
                    return true;
                }

                return false;
            },
            hideExtension() {
                return this.solutionView && this.model.type === 'file' &&
                    (this.model.fileType === 'solutionFile' || this.model.fileType === 'projectFile');
            },
            fileNameWithoutExtension() {
                return this.model.name.substr(0, this.model.name.lastIndexOf('.'))
            },
            siblingsAsChildren() {
                return this.solutionView && (this.model.fileType === 'solutionFile' || this.model.fileType === 'projectFile');
            },
            siblings() {
                const index = this.model.parent.children.indexOf(this.model);
                const siblings = [...this.model.parent.children];
                siblings.splice(index, 1);

                return siblings;
            }
        },
        methods: {
            select: function (node) {
                this.$emit('select', node);
            },
            isChildOfSibling(node) {
                return this.solutionView &&
                    node.parent &&
                    node.parent.children.findIndex(
                        (value) => value !== node && (value.fileType === 'solutionFile' || value.fileType === 'projectFile')) > -1;
            }
        }
    }
</script>