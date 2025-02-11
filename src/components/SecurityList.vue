<template>
  <div>
    <Header></Header>

    <div class="card shadow-lg">
      <div class="card-body">
        <h2 class="text-center mb-4"> Watchlist</h2>

        <div class="table-responsive">
          <table class="table table-hover align-middle">
            <thead class="table-primary">
              <tr>
                <th scope="col">Symbol</th>
                <th scope="col">Price (AUD)</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="security in watchlist" :key="security.symbol">
                <td>{{ security.symbol }}</td>
                <td>${{ security.price.toFixed(2) }}</td>
                <td>
                  <router-link
                    :to="{ name: 'security-detail', params: { symbol: security.symbol } }"
                    class="btn btn-sm btn-outline-primary"
                  >
                    View Details
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p v-if="watchlist.length === 0" class="text-center text-muted mt-3">No securities in the watchlist.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useSecuritiesStore } from '../store/index';
import { MockWebSocket } from '../services/WebSocketService';
import axios from 'axios';
import Header from './Header.vue';

const store = useSecuritiesStore();
const ws = new MockWebSocket();

const fetchSecurities = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/securities'); 
    response.data.forEach((security: { symbol: string; price: number }) => {
      store.addToWatchlist(security); 
    });
  } catch (error) {
    console.error('Error fetching securities:', error);
  }
};

onMounted(() => {
  fetchSecurities();
  ws.connect();
  ws.on('priceUpdate', (data: any) => {
    store.updatePrice(data.symbol, data.price); 
  });
});

const watchlist = store.watchlist;
</script>

<style scoped>
</style>
