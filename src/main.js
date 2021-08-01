import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import "./assets/index.css"
import UploadComponent from "./components/UploadComponent.vue"
import DownloadComponent from "./components/DownloadComponent.vue"
import LoginComponent from "./components/LoginComponent.vue"
import App from "./App.vue"
import store from "./store";
import api from "./api"

const routes = [
    { path: '/', component: LoginComponent, name: "login" },
    { path: '/upload', component: UploadComponent, name: "upload" },
    { path: '/download/:file_id', component: DownloadComponent, name: "download" },
    { path: "/:catchAll(.*)", redirect: "/upload" }
];

const router = createRouter({ routes, history: createWebHistory() })

router.beforeEach(async (to, from) => {
    if (to.path != "/") {
        if (!store.token) {
            return { name: "login", query: { redirect: to.path } }
        }
        try {
            let response = await api.post("sitetokenvalidity")
            if (!response.data.validity) {
                return { name: "login", query: { redirect: to.path } }
            }
        } catch (error) {
            console.log(error);
        }
    }
})
createApp(App).use(router).mount('#app')
