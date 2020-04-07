<template extends="./Page.vue">
    <extensions>
        <!-- Header -->
        <extension point="header">
            <div class="row">
                <div class="col-lg-8 col-xl-9">
                    <!-- Breadcrumb -->
                    <div class="small">
                        <extension-point name="breadcrumb">
                        </extension-point>
                    </div>

                    <!-- Title -->
                    <h2>{{title}}</h2>
                </div>
                <div class="col-lg-4 col-xl-3">
                    <!-- Toolbar -->
                    <extension-point name="toolbar">
                        <div class="btn-toolbar justify-content-md-end">
                            <extension-point name="toolbarExtra">
                            </extension-point>
                            <div class="btn-group" v-if="!readOnly && entities.length > 0">
                                <a :href="newEntityUrl" class="btn btn-sm btn-outline-primary" :title="newEntityTitle">
                                    <span class="fal fa-fw fa-plus"></span>
                                </a>
                            </div>
                        </div>
                    </extension-point>
                </div>
            </div>
        </extension>

        <!-- Body -->
        <extension>
            <p v-if="entities.length === 0">
                There is no item in this list.
                <template v-if="!readOnly">
                    Please
                    <a :href="newEntityUrl" class="btn btn-sm btn-primary">create a new one</a>.
                </template>
            </p>
            <div v-else>
                <div v-if="alternateView">
                    <extension-point name="alternateView">
                    </extension-point>
                </div>
                <div class="table-responsive" v-else
                     v-bind:class="{'small': small}">
                    <table class="table table-hover"
                           v-bind:class="{'table-borderless': !small, 'table-sm': small}">
                        <extension-point name="entityTable">
                            <thead>
                                <tr>
                                    <extension-point name="entityTableHeaders">
                                    </extension-point>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="entity in filteredEntities">
                                    <extension-point name="entityTableCells">
                                    </extension-point>
                                </tr>
                            </tbody>
                        </extension-point>
                    </table>
                    <div>
                        Displaying {{filteredEntities.length !== entities.length ? (filteredEntities.length + '/' + entities.length) : entities.length}} item(s)
                    </div>
                </div>
            </div>

            <extension-point>
            </extension-point>
        </extension>
    </extensions>
</template>

<script>
    import ListPageController from './ListPageController';
    export default ListPageController.getConfig();
</script>