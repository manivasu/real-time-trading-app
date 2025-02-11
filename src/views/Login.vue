<template>
    <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div class="card p-4 shadow-lg" style="width: 350px;">
        <div class="card-body">
          <h2 class="text-center mb-4">Login</h2>
          <form @submit.prevent="login">
            <div class="mb-3">
              <label class="form-label">Username</label>
              <input v-model="username" type="text" class="form-control" placeholder="Enter username" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input v-model="password" type="password" class="form-control" placeholder="Enter password" required />
            </div>
            <button type="submit" class="btn btn-primary w-100">Login</button>
          </form>
          <p v-if="errorMessage" class="text-danger text-center mt-3">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import axios from "axios";
  
  const username = ref("");
  const password = ref("");
  const errorMessage = ref("");
  const router = useRouter();
  
  const login = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        username: username.value,
        password: password.value,
      });
  
      const { token } = response.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      router.push("/security");
    } catch (error) {
      errorMessage.value = "Invalid username or password";
    }
  };
  </script>
  