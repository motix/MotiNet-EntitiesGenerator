<template extends="../../../shared/components/pages/ListPage.vue">
    <extensions>
        <extension point="entityTableHeaders">
            <th scope="col">{{displayNames['Name']}}</th>
            <th scope="col">{{displayNames['Namespace']}}</th>
            <th scope="col">{{displayNames['GenerateLocation']}}</th>
            <th scope="col">{{displayNames['WorkingLocation']}}</th>
        </extension>

        <extension point="entityTableCells">
            <td>
                <a :href="viewEntityUrl + '/' + entity.id">{{entity.name}}</a>
            </td>
            <td>{{entity.namespace}}</td>
            <td>{{entity.generateLocation}}</td>
            <td>{{entity.workingLocation}}</td>
        </extension>
    </extensions>
</template>

<script>
    import ListPageController from '../../../shared/components/pages/ListPageController';
    export default ListPageController.getConfig();
</script>