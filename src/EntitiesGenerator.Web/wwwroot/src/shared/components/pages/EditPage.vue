<template extends="./Page.vue">
    <extensions>
        <!-- Data Loading -->
        <extension point="dataLoading">
            <div v-if="entityReloading" class="my-4 text-center text-muted">
                <font-awesome-icon :icon="['fal', 'spinner']" size="3x" spin></font-awesome-icon>
            </div>
            <div v-else-if="entityReloadingError" class="my-4">
                <p class="text-danger">
                    There is error reloading data.
                </p>
            </div>
        </extension>

        <!-- Header -->
        <extension point="header">
            <div class="row">
                <div class="col-lg-8 col-xl-9">
                    <!-- Breadcrumb -->
                    <div class="small">
                        <extension-point name="breadcrumb">
                        </extension-point>
                    </div>

                    <!-- Header Info -->
                    <div class="small">
                        <template v-if="newMode || editMode">
                            <div>
                                <extension-point name="headerInfoEdit">
                                </extension-point>
                            </div>
                            <div class="text-danger">
                                <extension-point name="headerInfoValidationErrors">
                                </extension-point>
                            </div>
                        </template>
                        <div v-else>
                            <extension-point name="headerInfo">
                            </extension-point>
                        </div>
                    </div>

                    <!-- Title -->
                    <h2>
                        <template v-if="newMode || editMode">
                            <extension-point name="titleEdit">
                            </extension-point>
                        </template>
                        <template v-else>
                            <extension-point name="title">
                            </extension-point>
                        </template>
                    </h2>
                    <div class="small text-danger" v-if="newMode || editMode">
                        <extension-point name="titleValidationErrors">
                        </extension-point>
                    </div>
                </div>
                <div class="col-lg-4 col-xl-3">
                    <!-- Toolbar -->
                    <extension-point name="toolbar">
                        <div class="btn-toolbar justify-content-md-end mb-3 mb-md-0" v-if="!readOnly">
                            <extension-point name="toolbarExtra">
                            </extension-point>
                            <div class="btn-group" v-if="entityEditable || (entityDeletable && deleteRight)">
                                <button class="btn btn-sm btn-outline-primary"
                                        title="Edit"
                                        v-bind:disabled="freezed"
                                        v-if="!newMode && entityEditable && !editMode"
                                        @click="edit()">
                                    <font-awesome-icon :icon="['fal', 'edit']" fixed-width></font-awesome-icon>
                                </button>
                                <button class="btn btn-sm btn-primary"
                                        title="Save"
                                        v-bind:disabled="freezed || !isDirty"
                                        v-if="newMode || editMode"
                                        @click="save()">
                                    <font-awesome-icon :icon="['fal', 'save']" fixed-width></font-awesome-icon>
                                </button>
                                <button class="btn btn-sm"
                                        v-bind:class="{ 'btn-warning': isDirty, 'btn-outline-warning': !isDirty }"
                                        title="Discard Changes"
                                        v-bind:disabled="freezed"
                                        v-if="editMode"
                                        @click="revert()">
                                    <font-awesome-icon :icon="['fal', 'undo']" fixed-width></font-awesome-icon>
                                </button>
                                <button class="btn btn-sm"
                                        v-bind:class="{ 'btn-warning': isDirty, 'btn-outline-warning': !isDirty }"
                                        title="Cancel"
                                        v-bind:disabled="freezed"
                                        v-if="newMode"
                                        @click="cancel()">
                                    <font-awesome-icon :icon="['fal', 'times']" fixed-width></font-awesome-icon>
                                </button>
                                <button class="btn btn-sm btn-outline-danger"
                                        title="Delete"
                                        v-bind:disabled="freezed"
                                        v-if="!newMode && entityDeletable && deleteRight"
                                        @click="trash()">
                                    <font-awesome-icon :icon="['fal', 'trash-alt']" fixed-width></font-awesome-icon>
                                </button>
                            </div>
                        </div>
                    </extension-point>
                </div>
            </div>

            <!-- Header Extra -->
            <div class="small">
                <template v-if="newMode || editMode">
                    <div>
                        <extension-point name="headerExtraEdit">
                        </extension-point>
                    </div>
                    <div class="text-danger">
                        <extension-point name="headerExtraValidationErrors">
                        </extension-point>
                    </div>
                </template>
                <div v-else>
                    <extension-point name="headerExtra">
                    </extension-point>
                </div>
            </div>
        </extension>

        <!-- Body -->
        <extension>
            <extension-point>
            </extension-point>
        </extension>
    </extensions>
</template>

<script>
    import EditPageController from './EditPageController';
    export default EditPageController.getConfig();
</script>