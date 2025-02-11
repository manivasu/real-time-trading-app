import { defineStore } from 'pinia';

export const useSecuritiesStore = defineStore('securities', {
  state: () => ({
    watchlist: [] as Array<{ symbol: string; price: number }>,
    orders: [] as Array<{ symbol: string; quantity: number; price: number }>,
  }),
  actions: {
    addToWatchlist(security: { symbol: string; price: number }) {
      this.watchlist.push(security);
    },
    updatePrice(symbol: string, price: number) {
      const security = this.watchlist.find(item => item.symbol === symbol);
      if (security) {
        security.price = price;
      }
    },
    placeOrder(order: { symbol: string; quantity: number; price: number }) {
      this.orders.push(order);
    },
  },
});