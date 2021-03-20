import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from './test.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    redirect: {
        name: 'hello'
    }
}, {
    path: '/hello',
    name: 'hello',
    component: Hello
}]

const router = new VueRouter({
    mode: 'history',
    base: 'vaccination-report/pc',
    routes
})

export default router
