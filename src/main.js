import { createApp } from 'vue'
import App from '@/App'

import '@/style/global.css'
import '@/style/highlight.css'
import 'highlight.js/lib/common'

import router from '@/router'
import Highlight from '@highlightjs/vue-plugin'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

library.add(faAngleRight)

createApp(App)
    .use(router)
    .use(Highlight)
    .use(FontAwesomeIcon)
    .mount('#app')
