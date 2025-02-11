import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './store/useAuthStore';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);
app.use(createPinia()); // ✅ Use Pinia instead of Vuex
app.use(router);
app.mount('#app');

const authStore = useAuthStore();
if (authStore.token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.token}`;
}
