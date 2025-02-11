<template>

          <div v-if="orders.length">
            <table class="table table-hover text-center">
              <thead class="table-dark">
                <tr>
                  <th>Symbol</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in orders" :key="order.symbol + order.quantity">
                  <td>{{ order.symbol }}</td>
                  <td>{{ order.quantity }}</td>
                  <td>${{ order.price.toFixed(2) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <div v-else class="text-center text-muted mt-3">
            <p class="lead">No orders found. Start trading now!</p>
          </div>
   
  </template>
  
  <script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useSecuritiesStore } from '../store/index'; 
  
  const store = useSecuritiesStore();
  const { orders } = storeToRefs(store); 
  </script>
  
  <style scoped>
  .card {
    max-width: 700px;
    margin: auto;
  }
  </style>
  