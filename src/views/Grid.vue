<template lang="pug">
    table
        table-header
        table-row(v-for='order in $store.state.orders', :order='order')
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
            offset: 0
        }
    },

    async created() {
        if (!this.$store.state.authenticated) {
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
        }
    }
}
</script>

<style lang="scss">
    table {
        border: 1px solid #000;
    }
</style>
