import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  setInterval(() => {
    const priceUpdate = {
      symbol: "AAPL",
      price: (Math.random() * 1000).toFixed(2),
    };
    ws.send(JSON.stringify(priceUpdate));
  }, 1000);
});

console.log("WebSocket server running on ws://localhost:8080");