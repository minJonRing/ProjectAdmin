import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import Vant from 'vant'
import 'vant/lib/index.css'


import router from './router/index'
import store from './store/index'

createApp(App).use(router).use(store).use(Vant).use(ElementPlus, { size: 'small', zIndex: 3000 }).mount('#app')
