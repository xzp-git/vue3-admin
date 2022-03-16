import { createApp } from 'vue'
import router from './router'
// 初始化css 重置css默认样式
import 'normalize.css/normalize.css'
import '@/assets/styles/index.scss'
import initSvgIcon from '@/icons/index'

import App from './App.vue'

const app = createApp(App)
app.use(initSvgIcon)
app.use(router)
app.config.globalProperties = { foo: 'aaaa' }
app.mount('#app')
