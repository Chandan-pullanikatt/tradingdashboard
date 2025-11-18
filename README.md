📊 Trading Dashboard — Full Stack Application
A real-time trading dashboard built with Golang + Gin, React + Vite, and WebSockets, deployed on AWS EC2 and AWS S3.

🚀 Live Deployment
Frontend (AWS S3)
👉 Add your S3 URL here

Backend (AWS EC2)
👉 Add your EC2 backend URL here
Example: http://YOUR_EC2_IP:8080

🛠️ Tech Stack
Frontend
React + Vite

Tailwind CSS

WebSocket client for live price updates

JWT Authentication handling

Hosted on AWS S3

Backend
Golang (Go)

Gin Framework

JWT Authentication

WebSockets for real-time price streaming

In-memory order storage (no database used)

Price simulator using Goroutines

Hosted on AWS EC2

📈 Features
🔹 Real-Time Price Updates
A Goroutine generates price changes every 2 seconds and broadcasts them via WebSockets.

🔹 User Login
Simple JWT-based authentication.
Frontend stores the token in localStorage.

🔹 Place Orders
Users can submit new mock buy/sell orders.

🔹 View Orders
Orders are stored temporarily in memory and returned from the /orders endpoint.

🔹 Secure Routes
The /orders APIs are protected using Gin middleware + JWT.

📡 API Endpoints
Public
Method	Endpoint	Description
GET	/prices	Returns current stock prices
GET	/ws	WebSocket for real-time updates
POST	/auth/login	Returns JWT token

Protected
Method	Endpoint	Description
GET	/orders	Get all user orders
POST	/orders	Create a new order

🧩 Project Structure
css
Copy code
tradingdashboard/
   ├── backend/
   │    ├── auth/
   │    ├── controllers/
   │    ├── models/
   │    ├── routes/
   │    ├── services/
   │    ├── websocket/
   │    ├── mockdata/
   │    └── main.go
   │
   └── frontend/
        ├── public/
        ├── src/
        ├── components/
        └── pages/
⚙️ How to Run Locally
Backend
go
Copy code
cd backend
go mod tidy
go run main.go
Server runs on:
http://localhost:8080

Frontend
arduino
Copy code
cd frontend
npm install
npm run dev
Runs on:
http://localhost:5173

🌐 Deployment
Backend (EC2)
Built Go binary

Reverse proxy with Nginx

Systemd service for auto-restart

Exposed port 8080

Allows WebSockets

Frontend (S3)
npm run build

Uploaded dist/ folder to S3

Public access enabled

CORS allowed

Optional: Connected to CloudFront

📹 Demo Video
https://drive.google.com/file/d/1vBlAiynfnRT6omUhLnhpYQSIh9YYBkaO/view?usp=sharing
👤 Author
Chandan Pullanikatt
GitHub: https://github.com/Chandan-pullanikatt
