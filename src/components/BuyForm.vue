<template>
    <div class="buy-form text-center">
      <label class="form-label fw-bold">Enter Notional Amount ($):</label>
      <input 
        v-model="notional" 
        type="number" 
        min="1" 
        class="form-control mb-2" 
        placeholder="Enter Amount"
        @input="validateInput"
      />
  
      <p v-if="quantity > 0" class="text-success fw-bold">
        Quantity: {{ quantity }}
      </p>
      <p v-else class="text-danger">Enter a valid amount to calculate quantity.</p>
  
      <button 
        @click="buySecurity" 
        class="btn btn-primary btn-lg shadow-sm d-flex align-items-center justify-content-center gap-2 mt-3"
        :disabled="quantity <= 0 || isBuying"
      >
        <span v-if="isBuying" class="spinner-border spinner-border-sm"></span>
        <i v-else class="bi bi-cart-plus"></i> Buy Now
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useSecuritiesStore } from '../store/index';
  
  const props = defineProps<{ security: { symbol: string; price: number } }>();
  const securitiesStore = useSecuritiesStore();
  const notional = ref<number>(0);
  const isBuying = ref(false);
  
  const securityPrice = computed(() => props.security?.price ?? 1);
  const quantity = computed(() => notional.value ? Math.floor(notional.value / securityPrice.value) : 0);
  
  const validateInput = () => {
    if (notional.value < 0) {
      notional.value = 0;
    }
  };
  
  const buySecurity = async () => {
    if (!props.security) return;
    if (quantity.value <= 0) {
      alert("Notional amount is too low to buy any shares.");
      return;
    }
  
    isBuying.value = true; // Show loading state
  
    securitiesStore.placeOrder({
      symbol: props.security.symbol,
      quantity: quantity.value,
      price: securityPrice.value,
    });
    setTimeout(() => {
      notional.value = 0; // Reset input after a small delay
      isBuying.value = false; // Stop loading state
    }, 500);
  };
  </script>
  
  <style scoped>
  .buy-form {
    max-width: 400px;
    margin: auto;
    padding: 20px;
  }
  </style>
  