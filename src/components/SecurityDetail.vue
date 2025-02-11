<template>
  <div>
    <Header></Header>

    <div class="container-fluid mt-4">
      <div class="row">
        <div class="col-md-6">
          <div class="card shadow-lg">
            <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h2 class="mb-0">{{ security?.symbol }} - {{ security?.name }}</h2>
              <button @click="$router.go(-1)" class="btn btn-light btn-sm">🔙 Back</button>
            </div>

            <div class="card-body">
              <h4 class="text-center">Current Price: <span class="text-success fw-bold">${{ security?.price?.toFixed(2) }}</span></h4>
              <div class="mt-4">
                <BuyForm v-if="security" :security="security" />
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card shadow-lg">
            <div class="card-header bg-secondary text-white text-center">
              <h5 class="mb-0">Orders List</h5>
            </div>
            <div class="card-body">
              <OrdersTable />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!security" class="text-center mt-5">
      <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2 text-muted">Fetching Security Details...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useSecuritiesStore } from '../store/index';
import OrdersTable from './OrdersTable.vue';
import BuyForm from './BuyForm.vue';
import Header from './Header.vue';

const securitiesStore = useSecuritiesStore();
const route = useRoute();
const security = ref<any>(null);

onMounted(() => {
  const symbol = route.params.symbol as string;
  security.value = securitiesStore.watchlist.find((item) => item.symbol === symbol);
});
</script>

<style scoped>
.container-fluid {
  width: 100%;
}

.card {
  border-radius: 10px;
  overflow: hidden;
}

.card-header {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
