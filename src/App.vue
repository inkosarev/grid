<template lang="pug">
    #app
        router-view
</template>

<script>
import Order from './models/Order'

export default {
    created() {
        const tempOrders = []
        for (let i = 10; i >= 0; i--) {
            tempOrders.push(new Order({order_id: 1}))
        }
        this.$store.commit('SET_ORDERS', tempOrders)
    }
}
</script>

<style lang="sass">
    *
        font-family: Arial
            box-sizing: border-box

    body
        padding: 50px
        background-color: #f5f8fb
</style>
