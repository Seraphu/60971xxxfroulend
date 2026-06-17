import { createRouter, createWebHistory } from 'vue-router'
import Homepage from './components/Homepage'
import Signin from './components/Signin'

const routes = [
    {
        path: '/',
        component: Homepage
    },
    {
        path: '/signin',
        component: Signin,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;