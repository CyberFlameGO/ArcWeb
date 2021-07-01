import { createApp } from 'vue'
import App from './App'
import './assets/global.css'

import router from './router'

createApp(App)
    .use(router)
    .mount('#app')
