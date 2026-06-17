import { createApp } from 'vue'
import axios from 'axios'
import router from './router.js'
import App from './App.vue'
import store from './state.js'

const myApp = createApp(App);
window.axios = axios;
window.store = store;  // ← ДОБАВИТЬ ЭТУ СТРОКУ

myApp.use(store)
myApp.use(router)
myApp.mount('#app');