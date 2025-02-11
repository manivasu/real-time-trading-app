<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-3">
    <a class="navbar-brand fw-bold" href="#">Real Time Trading App</a>   
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
      <div class="dropdown ms-auto">
        <img src="https://i.pravatar.cc/40" class="rounded-circle" width="30" height="30" alt="User Avatar" />
        <button @click="handleLogout">🚪 Logout</button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from "../store/useAuthStore";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const router = useRouter();
const handleLogout = () => {
  authStore.logout();
  router.push("/login"); // Redirect to login page
};
</script>
<style scoped>
.navbar {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
.dropdown-toggle {
  border: none;
  background: none;
}
</style>
