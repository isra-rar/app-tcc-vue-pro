import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home.vue';
import AdminPages from '@/components/admin/AdminPages.vue';
import Auth from '@/components/auth/Auth.vue'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
},
{
    name: 'adminPages',
    path: '/admin',
    component: AdminPages
},
{
    name: 'auth',
    path: '/auth',
    component: Auth
}]

export default new VueRouter({
    mode: 'history',
    routes
})
