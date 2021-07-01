import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home'
import Viewer from '@/components/Viewer'
import Error404 from '@/views/error/Error404'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/:id',
            name: 'Viewer',
            component: Viewer
        },
        {
            path: '/:pathMatch(.*)*',
            name: '404',
            component: Error404
        }
    ]
})
