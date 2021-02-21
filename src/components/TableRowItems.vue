<template lang="pug">
    div
        div(class="td" v-for="title in OrderItem.getRowItemsHeader()") {{ title }}
        table-row-item(v-for="item in items" :item="item")
</template>

<script>
import OrderItem from '../models/OrderItem'
import TableRowItem from './TableRowItem'

export default {
    name: "TableRowItems",
    components: {TableRowItem},
    comments: { TableRowItem },
    props: ['items'],
    data() {
        return {
            OrderItem
        }
    }
}
</script>

<style lang="sass">

</style>
