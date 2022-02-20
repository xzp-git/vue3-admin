import { createApp } from 'vue'
import router from './router'
// 初始化css 重置css默认样式
import 'normalize.css/normalize.css'
// 全局 css
// import '@/assets/styles/index.scss'
import App from './App.vue'

const app = createApp(App)
app.use(router)

app.mount('#app')
