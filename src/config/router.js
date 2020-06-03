import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home.vue';
import AdminPages from '@/components/admin/AdminPages.vue';
import Auth from '@/components/auth/Auth.vue'
import Instituicao from '@/components/view/Instituicao.vue';
import Especialidade from '@/components/view/Especialidade.vue';

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
},
{
    name: 'especialidade',
    path: '/Especialidade',
    component: Especialidade
},
{
    name: 'instituicao',
    path: '/instituicao',
    component: Instituicao
},
{
    name: 'medicamento',
    path: '/medicamento',
    component: Home
},
{
    name: 'cid',
    path: '/cid',
    component: AdminPages
},
{
    name: 'receita',
    path: '/receita',
    component: Home
},
{
    name: 'atestado',
    path: '/atestado',
    component: AdminPages
},
{
    name: 'paciente',
    path: '/paciente',
    component: Home
}
]

export default new VueRouter({
    mode: 'history',
    routes
})
