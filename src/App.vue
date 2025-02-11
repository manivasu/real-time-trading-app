
<template>
  <div>
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import SecurityList from './components/SecurityList.vue';
import OrdersTable from './components/OrdersTable.vue';
import Header from './components/Header.vue';

export default {
  components: {
    SecurityList,
    OrdersTable,
  },
};
</script>

<style>
/* Add your styles here */
</style>