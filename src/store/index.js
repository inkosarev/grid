import Vue from 'vue'
import Vuex from 'vuex'
import router from "../router/index"

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
        async query(context, payload) {
            try {
                console.table(payload)
                await context.dispatch(payload.action, payload.payload)
            } catch (e) {
                console.error(e)
            }
        },

        async authenticate(context, payload) {
            let result = await fetch(context.state.api.authenticate, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password
                })
            })

            if (result.ok) {
                result = await result.json()
                context.commit('SET_ACCESS', result.access)
                context.commit('SET_REFRESH', result.refresh)
                context.commit('SET_AUTHENTICATED', true)
                await router.push('/grid')
            }
        },

        async checkOrders(context) {
            let result = await fetch(context.state.api.orders, {
                method: 'HEAD',
                headers: {
                    authorization: `JWT ${context.state.access}`
                }
            })

            if (!result.ok) {
                await context.dispatch('query', {
                    action: 'refreshToken',
                    payload: context.state.refresh
                })
            }

            await context.dispatch('query', {
                action: 'getOrders',
                payload: {
                    limit: 10,
                    offset: 0,
                    search: ''
                }
            })
        },

        async getOrders(context, payload) {
            const params = `?limit=${payload.limit}&offset=${payload.offset}&search=${payload.search}`
            let result = await fetch(context.state.api.orders + params, {
                method: 'GET',
                headers: {
                    authorization: `JWT ${context.state.access}`,
                    'Content-Type': 'application/json'
                }
            })

            result = await result.json()
            context.commit('SET_ORDERS', result.results)
        },

        async refreshToken(context, refresh) {
            let result = await fetch(context.state.api.refreshToken, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    refresh
                })
            })
            result = await result.json()
            context.commit('SET_ACCESS', result.access)
        }
    }
})
