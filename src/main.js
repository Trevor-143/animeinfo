import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import LazyYoutube from "vue-lazytube"

library.add( fas )

createApp(App)
.use(router)
.component('fa', FontAwesomeIcon)
.component("LazyYoutube", LazyYoutube)
.mount('#app')

// Vue.component('YouTube', YouTube)
