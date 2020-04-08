<template extends="../../../shared/components/pages/ListPage.vue">
    <extensions>
        <extension point="entityTableHeaders">
            <th scope="col" class="text-right w-tight">{{displayNames['Position']}}</th>
            <th scope="col">{{displayNames['Name']}}</th>
            <th scope="col" class="text-center">{{displayNames['IsActive']}}</th>
        </extension>

        <extension point="entityTableCells">
            <td class="text-right">{{entity.position}}</td>
            <td>
                <a :href="viewEntityUrl + '/' + entity.id">{{entity.name}}</a>
            </td>
            <td class="text-center">
                <font-awesome-icon :icon="['fas', 'sun']" fixed-width v-if="entity.isActive"></font-awesome-icon>
                <font-awesome-icon :icon="['fal', 'sun']" fixed-width v-if="!entity.isActive"></font-awesome-icon>
            </td>
        </extension>
    </extensions>
</template>

<script>
    import ListPageController from '../../../shared/components/pages/ListPageController';
    export default ListPageController.getConfig();
</script>