<template lang="pug">
    div(class="table")
        table-header
        table-row(v-for="order in $store.state.orders" :order="order" :class="{loading: is_loading }")
</template>

<script>
import TableHeader from '../components/TableHeader'
import TableRow from '../components/TableRow'

export default {
    name: 'Grid',

    components: {
        TableHeader,
        TableRow
    },

    data() {
        return {
            offset: 0,
            is_loading: true
        }
    },

    async created() {
        if (!this.$store.state.authenticated) {
            console.log('/')
            // Редирект на главную если пользователь не аутентифицирован
            await this.$router.push('/')
        } else {
            // Иначе запрос данных заказов
            await this.$store.dispatch('query', {
                action: 'checkOrders',
                payload: {
                    limit: 10,
                    offset: this.offset,
                    search: ''
                }
            })
            this.is_loading = !this.is_loading
        }
    }
}
</script>

<style lang="sass">
    .table
        background-color: #f5f8fb

    .tr
        border-top: 1px solid #f0f0f0
        margin: 10px auto
        background-color: #fff

    .td
        display: inline-block

    .loading
        display: none
</style>
