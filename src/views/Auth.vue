<template lang="pug">
        form(@submit.prevent='onSubmit')
            h1 вход
            input(type='text', v-model='email', placeholder='Email или телефон')
            input(type='password', v-model='password', placeholder='Пароль')
            input(type='submit', value='войти' :disabled="disabled")
</template>

<script>

export default {
    name: 'Auth',
    data() {
        return {
            email: JSON.parse(localStorage.getItem('credentials')).email,
            password: JSON.parse(localStorage.getItem('credentials')).password
        }
    },

    computed: {
        // Активность кнопки отправки аутентификационных данных
        disabled() {
            return !(this.email.length && this.password.length)
        },
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
        if (credentials && !this.disabled) {
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

<style lang="sass">
    form
        margin: 100px auto
        align-items: center
        display: flex
        flex-direction: column
        width: 320px
        height: 350px
        justify-content: space-around
        box-shadow: 0px 0px 30px #777
        border-radius: 5px
        background-color: #fff

        *
            width: 240px
            height: 40px
            border-radius: 5px
            border: none

        h1
            text-transform: capitalize
            text-align: center
            margin: 0

        input
            border: 1px solid #dbdce0
            padding: 10px

        input[type=password]::after
            z-index: 999
            width: 40px
            height: 40px
            background-color: #000

        input[type=submit]
            background-color: #3cc8ae
            color: #fff
            text-transform: uppercase

</style>
