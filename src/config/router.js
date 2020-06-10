import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home.vue';
import AdminPages from '@/components/admin/AdminPages.vue';
import Auth from '@/components/auth/Auth.vue'
import Instituicao from '@/components/view/Instituicao.vue';
import Especialidade from '@/components/view/Especialidade.vue';
import Medico from '@/components/view/Medico.vue'

import { userKey } from '@/global'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/home',
    component: Home
},
{
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
    meta: { requiresAdmin: true }
},
{
    name: 'auth',
    path: '/',
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
    name: 'medico',
    path: '/medico',
    component: Medico
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

 const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if(to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json)
        user && user.tipousuario == 1 ? next() : next({ path: '/' })
    } else {
        next()
    }
})

export default router