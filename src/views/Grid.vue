<template>
    <div>
        <p v-for="order in $store.state.orders"> {{order}} </p>
    </div>
</template>

<script>
export default {
    name: 'Auth',

    async created() {
        if (!this.$store.state.authenticated) {
            await this.$router.push('/')
        } else {
            await this.$store.dispatch('query', {
                action: 'checkOrders'
            })
        }
    }
}
</script>

<style lang="scss">

</style>
