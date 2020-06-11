import Vue from 'vue'

export const userKey = '__knowlegde_user'
export const baseApiUrl = 'https://tcc-receitasegura-api.herokuapp.com/api'
export const usernameBasic = 'angular'
export const passwordBasic = '@ngul@r0'

export function showError(e) {
    if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({
            msg: e.response.data
        })
    } else if (typeof e === 'string') {
        Vue.toasted.global.defaultError({
            msg: e
        })
    } else {
        Vue.toasted.global.defaultError()
    }
}

export default { baseApiUrl, showError, userKey, usernameBasic, passwordBasic}