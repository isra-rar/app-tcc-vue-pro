import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home.vue';
import AdminPages from '@/components/admin/AdminPages.vue';
import Auth from '@/components/auth/Auth.vue'
import Instituicao from '@/components/view/Instituicao.vue';
import Especialidade from '@/components/view/Especialidade.vue';
import Medico from '@/components/view/Medico.vue';
import Paciente from '@/components/view/Paciente.vue';
import Usuario from '@/components/view/Usuario.vue';
import Atestado from '@/components/view/Atestado.vue';
import Receita from '@/components/view/Receita.vue'

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
    name: 'usuario',
    path: '/usuario',
    component: Usuario
},
{
    name: 'paciente',
    path: '/paciente',
    component: Paciente
},
{
    name: 'atestado',
    path: '/atestado',
    component: Atestado
},
{
    name: 'receita',
    path: '/receita',
    component: Receita
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