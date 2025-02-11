import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

app.use(cors());
app.use(express.json()); 
const users = [
  { id: 1, name: "John Doe", email: "john@example.com", password: "password" },
  { id: 2, name: "Jane Doe", email: "jane@example.com", password: bcrypt.hashSync("password123", 10) }
];

const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return; 
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    (req as any).user = decoded;
    next(); 
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
    return; 
  }
};

app.post("/api/auth/login", (req: any, res: any) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const user = users.find((u) => u.name === username && u.password === password);

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user.id, username: user.name }, SECRET_KEY, { expiresIn: "1h" });

    return res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

type Security = {
  symbol: string;
  name: string;
  price?: number;
};

const topASXSecurities: Security[] = [
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
  return topASXSecurities.map(security => ({
    ...security,
    price: getRandomPrice()
  }));
}
app.get('/api/securities',authenticateToken, (req: Request, res: Response) => {
  const securities = fetchTopASXSecuritiesWithPrices();
  res.json(securities);
});

app.get('/api/orders', authenticateToken, (req: Request, res: Response) => {
  res.json({ message: "Protected orders data", orders: [] });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
