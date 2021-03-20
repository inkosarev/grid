<template lang="pug">
    div(class="tr")
        div(class="row")
            div
                input(type="checkbox" @change="onChange")
            div(class="td" v-for='(field, key) of order.getRowFields()')
                span(v-if="key === 'count'")
                    button(@click="onExpand") +
                    | {{ field }}
                span(v-else) {{ field }}
        table-row-items(v-if="items_expanded" :items='order.items')
</template>

<script>
import TableRowItems from '../components/TableRowItems'

export default {
    name: 'TableRow',
    components: { TableRowItems },
    props: ['order'],
    data() {
        return {
            items_expanded: false
        }
    },
    methods: {
        // Выбор строки заказа
        onChange(e) {
            if (e.target.checked) {
                this.$store.commit('SELECT_ORDER', this.order.order_id)
            } else {
                this.$store.commit('UNSELECT_ORDER', this.order.order_id)
            }
        },

        onExpand() {
            this.items_expanded = !this.items_expanded
        }
    }
}
</script>

<style lang="sass">
    .row
        height: 60px
        display: flex
        justify-content: space-between
        align-items: center
</style>
