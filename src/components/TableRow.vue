<template lang="pug">
    div
        tr
            td(v-for='field of order.getRowFields()') {{ field }}
        table-row-item(:items='order.items')
</template>

<script>
import TableRowItem from '../components/TableRowItem'
export default {
    name: 'TableRow',
    components: {TableRowItem},
    props: ['order']
}
</script>

<style lang="sass">
    table
        width: 100%
</style>
