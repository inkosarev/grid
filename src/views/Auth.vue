<template lang="pug">
        form(@submit.prevent='onSubmit')
            label Email:
            input(type='text', v-model='email')
            label Password:
            input(type='password', v-model='password')
            input(type='submit')
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
        // Аутентификационные данные
        credentials() {
            return {
                email: this.email,
                password: this.password
            }
        }
    },

    async created() {
        // Попытка аутентификации с хранимыми учетными данными
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
            // Аутентификация с данными формы
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
