import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import Vueaxios from 'vue-axios';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';
createApp(App)
  .use(store)
  .use(Vueaxios, axios)
  .use(ElementPlus)
  .use(router)
  .mount('#app');
