import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import "./assets/index.css"
import Upload from "./components/Upload.vue"
import Download from "./components/Download.vue"
import App from "./App.vue"

const routes = [
    { path: '/', component: Upload },
    { path: '/download/:file_id', component: Download, name: "download" },
];

const router = createRouter({ routes, history: createWebHistory() })

createApp(App).use(router).mount('#app')
