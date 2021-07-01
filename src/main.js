import { createApp } from 'vue'
import App from './App'
import './assets/global.css'

import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

library.add(faAngleRight)

createApp(App)
    .use(router)
    .use(FontAwesomeIcon)
    .mount('#app')
