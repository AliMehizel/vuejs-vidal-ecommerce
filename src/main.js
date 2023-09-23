import './assets/main.css'

import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)


app.use(createPinia())
app.provide('router', router);
app.provide('route', router.currentRoute);
app.use(router)

app.mount('#app')
