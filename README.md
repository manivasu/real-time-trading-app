Real-Time Trading App
A Vue.js (TypeScript) application for real-time security pricing and order placement using WebSockets and a mock API backend with JWT authentication.

🚀 Features
* Real-time price updates via WebSockets.
* Secure authentication using JWT.
* Buy securities based on notional amount.
* Order management system with a clean UI.
* Bootstrap styling for a modern look.
* Vue Router for navigation.
* Pinia for state management.

🛠️ Setup Instructions

Ensure you have the following installed:

* Node.js (>= 16.x)
* npm or yarn
* Vue CLI (optional)

🔹 Start the Backend Server
=> npm run start:api
Runs on http://localhost:3000
Provides mock authentication and order, secuirty list APIs.

🔹 Start the Frontend (Vue.js)
=> npm install
=> npm run dev
Runs on http://localhost:5173

⚙️ Environment Variables
Create a .env file in both the client and server directories.

JWT_SECRET=your_secret_key
PORT=5173

🔌 API Endpoints

🔹 Authentication
POST /api/login → User Login (returns JWT)
🔹 Orders
POST /api/orders → Place an order
GET /api/securities → Get all user orders