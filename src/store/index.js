import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'
import Order from '../models/Order'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        api: {
            authenticate: 'https://zonesmart.su/api/v1/auth/jwt/create/',
            refreshToken: 'https://zonesmart.su/api/v1/auth/jwt/refresh/',
            orders: 'https://zonesmart.su/api/v1/zonesmart/order/'
        },
        authenticated: false,
        access: null,
        refresh: null,
        orders: []
    },
    mutations: {
        SET_ACCESS(state, access) {
            state.access = access ?? ''
        },

        SET_REFRESH(state, refresh) {
            state.refresh = refresh ?? ''
        },

        SET_ORDERS(state, orders) {
            state.orders = orders ?? []
        },

        SET_AUTHENTICATED(state, authenticated) {
            state.authenticated = authenticated || false
        }
    },
    actions: {
        // Безопасный запрос
        async query(context, payload) {
            try {
                console.table(payload)
                await context.dispatch(payload.action, payload.payload)
            } catch (e) {
                console.error(e)
            }
        },

        // Аутентификация
        async authenticate(context, payload) {
            let result = await axios({
                url: context.state.api.authenticate,
                method: 'POST',
                data: {
                    email: payload.email,
                    password: payload.password
                }
            })

            if (result.statusText === 'OK') {
                context.commit('SET_ACCESS', result.data.access)
                context.commit('SET_REFRESH', result.data.refresh)
                context.commit('SET_AUTHENTICATED', true)
                await router.push('/grid')
            }
        },

        // Проверка доступности данных заказов или их получение
        async checkOrders(context, payload) {
            let result = await axios({
                url: context.state.api.orders,
                method: 'HEAD',
                headers: {
                    authorization: `JWT ${context.state.access}`
                }
            })

            if (result.statusText !== 'OK') {
                await context.dispatch('query', {
                    action: 'refreshToken',
                    payload: context.state.refresh
                })
            }

            await context.dispatch('query', {
                action: 'getOrders',
                payload
            })
        },

        // Запрос данных заказов
        async getOrders(context, payload) {
            console.warn(payload)
            const params = `?limit=${payload.limit}&offset=${payload.offset}&search=${payload.search}`
            let result = await axios({
                url: context.state.api.orders + params,
                method: 'GET',
                headers: {
                    authorization: `JWT ${context.state.access}`
                }
            })
            const orders = result.data.results.map(order => {
                return new Order(order)
            })
            context.commit('SET_ORDERS', orders)
        },

        // Обновление токена
        async refreshToken(context, refresh) {
            let result = await axios({
                url: context.state.api.refreshToken,
                methods: 'POST',
                data: { refresh }
            })
            context.commit('SET_ACCESS', result.data.access)
        }
    }
})
