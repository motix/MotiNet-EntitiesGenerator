<template extends="../../../shared/components/pages/ListPage.vue">
    <extensions>
        <extension point="entityTableHeaders">
            <th scope="col">{{displayNames['Name']}}</th>
        </extension>

        <extension point="entityTableCells">
            <td>
                <a :href="viewEntityUrl + '/' + entity.id">{{entity.name}}</a>
            </td>
        </extension>
    </extensions>
</template>

<script>
    import ListPageController from '../../../shared/components/pages/ListPageController';
    export default ListPageController.getConfig();
</script>