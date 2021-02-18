<template lang="pug">
    thead
        tr
            td(colspan='100%')
                h1 Таблица заказов
                button Отправления
                button Экспортировать
        tr
            td(colspan='100%')
                button Фильтр
                input(@input='searchFilter', type='text')
</template>

<script>
export default {
    name: 'TableHeader',

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
</style>
