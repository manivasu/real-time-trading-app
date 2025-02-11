import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

type Security = {
    symbol: string;
    name: string;
    price: number;
  };
const securities = [
    { symbol: "BHP", name: "BHP Group" },
    { symbol: "CBA", name: "Commonwealth Bank" },
    { symbol: "CSL", name: "CSL Limited" },
    { symbol: "WBC", name: "Westpac Banking Corp" },
    { symbol: "NAB", name: "National Australia Bank" },
    { symbol: "ANZ", name: "Australia and New Zealand Banking Group" },
    { symbol: "WOW", name: "Woolworths Group" },
    { symbol: "WES", name: "Wesfarmers" },
    { symbol: "MQG", name: "Macquarie Group" },
    { symbol: "TLS", name: "Telstra Corporation" },
    { symbol: "RIO", name: "Rio Tinto" },
    { symbol: "WPL", name: "Woodside Petroleum" },
    { symbol: "GMG", name: "Goodman Group" },
    { symbol: "SCG", name: "Scentre Group" },
    { symbol: "QAN", name: "Qantas Airways" },
    { symbol: "ORG", name: "Origin Energy" },
    { symbol: "STO", name: "Santos" },
    { symbol: "S32", name: "South32" },
    { symbol: "TCL", name: "Transurban Group" },
    { symbol: "SGP", name: "Stockland" }
];

function getRandomPrice(min: number = 10, max: number = 100): number {
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
  }
  
  function fetchTopASXSecuritiesWithPrices(): Security[] {
    return securities.map(security => ({
      ...security,
      price: getRandomPrice()
    }));
  }

app.get('/api/securities', (req, res) => {
  res.json(fetchTopASXSecuritiesWithPrices());
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});