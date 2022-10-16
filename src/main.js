import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { appAxios } from './utils/appAxios'
import './assets/styles/main.css'

const app = createApp(App)

app.use(router)
app.config.globalProperties.$appAxios = appAxios

app.mount('#app')
