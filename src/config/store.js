import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import { userKey } from "@/global";

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        isMenuVisible: false,
        isLoginVisible: false,
        user: null || JSON.parse(localStorage.getItem(userKey))
    },
    mutations: {
        toggleMenu(state, isVisible) {
            if(!state.user) {
                state.isMenuVisible = false
                return
            }

            if(isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
        },
        setUser(state, user) {
            if(!user) {
                user = state.user
            }
            state.user = user
            if(user) {
                axios.defaults.headers.common['Authorization'] = `bearer ${user.access_token}`
                state.isMenuVisible = true
                state.isLoginVisible = true
            } else {
                delete axios.defaults.headers.common['Authorization']
                state.isMenuVisible = false
            }
        }
    }
})