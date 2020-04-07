<template extendable>
    <div>
        <!-- Data Loading -->
        <div v-if="initialDataLoading" class="my-4 text-center text-muted">
            <font-awesome-icon :icon="['fal', 'spinner']" size="3x" spin></font-awesome-icon>
        </div>
        <div v-else-if="initialDataLoadingError" class="my-4">
            <p class="text-danger">
                There is error loading data.
            </p>
        </div>
        <extension-point name="dataLoading">
        </extension-point>

        <!-- Main -->
        <template v-if="ready">
            <!-- Header -->
            <div class="my-4">
                <extension-point name="header">
                </extension-point>
            </div>

            <!-- Body -->
            <div>
                <extension-point>
                </extension-point>
            </div>
        </template>
    </div>
</template>

<script>
    import PageController from './PageController';
    export default PageController.getConfig();
</script>