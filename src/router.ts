// src/router.ts
import { createRouter, createWebHistory } from 'vue-router';
import SecurityDetail from '@/components/SecurityDetail.vue';
import OrdersTable from '@/components/OrdersTable.vue';
import SecurityList from '@/components/SecurityList.vue';
import Login from './views/Login.vue';
import { useAuthStore } from './store/useAuthStore';
const routes = [
  { path: '/', component: Login },
  {path:'/login', component: Login},
  {
    path: '/security',
    name: 'security-list',
    component: SecurityList,
    meta: { requiresAuth: true },
  },
  {
    path: '/security/:symbol',
    name: 'security-detail',
    component: SecurityDetail,
    props: true,
  },
  {
    path: '/orders',
    name: 'OrdersTable',
    component: OrdersTable,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.token) {
    next('/login');
  } else {
    next();
  }
});
export default router;