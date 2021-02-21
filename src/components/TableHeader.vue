<template lang="pug">
    div(class="header")
        div
            div(class="td" colspan='100%')
                h1 Таблица заказов
                button Отправления
                button Экспортировать
        div
            div(class="td" colspan='100%')
                button Фильтр
                input(@input='searchFilter', type='text')
        div
            div(class="td" v-for='title of Order.getRowHeader()') {{ title }}
</template>

<script>
import Order from '../models/Order'

export default {
    name: 'TableHeader',

    data() {
        return {
            Order
        }
    },

    methods: {
        searchFilter(e) {
            console.log(e.target.value)
            setTimeout(() => {
                this.$store.dispatch('query', {
                    action: 'checkOrders',
                    payload: {
                        limit: 10,
                        offset: 0,
                        search: e.target.value
                    }
                })
            }, 1000)
        }
    }
}
</script>

<style>
    h1 {
        display: inline;
    }

    .header {
        width: 100%;
    }
</style>
