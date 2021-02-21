<template lang="pug">
    div(class="row")
        div(class="td" v-for='field of order.getRowFields()') {{ field }}
        table-row-items(:items='order.items')
        br
</template>

<script>
import TableRowItems from '../components/TableRowItems'

export default {
    name: 'TableRow',
    components: { TableRowItems },
    props: ['order']
}
</script>

<style lang="sass">
    table
        width: 100%
</style>
