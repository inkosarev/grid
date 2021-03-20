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

        div(v-if="!$store.state.selected_orders.length" class="columns-header" )
            div( class="td" v-for='title of Order.getRowHeader()') {{ title }}
        div(v-else)
            button(@click="refresh") Обновить
            button(@click="remove") Удалить
</template>

<script>
import Order from '../models/Order'

export default {
    name: 'TableHeader',

    data() {
        return {
            Order,
            timeout: null
        }
    },

    methods: {
        // Фильтр поиска
        searchFilter(e) {
            if (this.timeout) clearTimeout(this.timeout)

            this.timeout = setTimeout(() => {
                this.$store.dispatch('query', {
                    action: 'checkOrders',
                    payload: {
                        limit: 10,
                        offset: 0,
                        search: e.target.value
                    }
                })
            }, 1500)
        },

        // Обновление заказов
        refresh() {
            console.log(`Обновляю ${this.$store.state.selected_orders}`)
        },

        // Удаление заказов
        remove() {
            console.log(`Удаляю ${this.$store.state.selected_orders}`)
        }
    }
}
</script>

<style>
    h1 {
        display: inline;
    }

    .columns-header {
        margin: 50px auto;
    }

    .header {
        width: 100%;
    }
</style>
