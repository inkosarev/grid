<template>
    <table>
        <table-header/>
        <table-row v-for="order in $store.state.orders" :order="order"/>
    </table>
</template>

<script>
import TableRow from '../components/TableRow'

export default {
    name: 'Table',

    components: {
        TableRow
    },
}
</script>

<style lang="scss">

</style>
