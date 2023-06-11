import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Particles from "particles.vue3";
import "@/util/axios.config";

createApp(App)
    .use(ElementPlus)
    .use(Particles)
    .use(store)
    .use(router)
    .mount('#app')
// 防止localStorage被修改
window.addEventListener('storage', function(e) {
    localStorage.setItem(e.key, e.oldValue)
});
// 防止sessionStorage被修改
window.addEventListener('storage', function(e) {
    this.sessionStorage.setItem(e.key, e.oldValue)
});