import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home'
import Viewer from './components/Viewer'

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
    ]
})
