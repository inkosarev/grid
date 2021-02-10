<template>
    <div>
        <form @submit.prevent="onSubmit">
            <label>Email:</label>
            <input type="text" v-model="email">

            <label>Password:</label>
            <input type="password" v-model="password">

            <input type="submit">
        </form>
    </div>
</template>

<script>

export default {
    name: 'Auth',
    data() {
        return {
            email: 'test@zonesmart.ru',
            password: '4815162342test'
        }
    },

    computed: {
        credentials() {
            return {
                email: this.email,
                password: this.password
            }
        }
    },

    async created() {
        const credentials = localStorage.getItem('credentials')
        if (credentials) {
            await this.$store.dispatch('query', {
                action: 'authenticate',
                payload: JSON.parse(credentials)
            })

        }
    },

    methods: {
        async onSubmit() {
            localStorage.setItem('credentials', JSON.stringify(this.credentials))
            await this.$store.dispatch('query', {
                action: 'authenticate',
                payload: this.credentials
            })
        }
    }
}
</script>

<style lang="scss">

</style>
