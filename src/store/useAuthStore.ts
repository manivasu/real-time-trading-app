import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any,
    token: localStorage.getItem('token') || null, // Persist token
  }),
  actions: {
    async login(credentials: { email: string; password: string }) {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', credentials);
        this.token = response.data.token ;
        this.user = response.data.user;
        localStorage.setItem('token', this.token); // Store in localStorage
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    },
  },
});
