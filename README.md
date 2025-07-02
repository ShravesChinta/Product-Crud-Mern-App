# Product Manager App

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing products, featuring a modern Bootstrap UI.

## Features
- Product CRUD (Create, Read, Update, Delete)
- Responsive UI with [React Bootstrap](https://react-bootstrap.github.io/)
- RESTful API with Express and MongoDB
- Production-ready build and deployment instructions

---

## Project Structure
```
node_project/
├── backend/         # Express API & MongoDB models
├── frontend/        # React app (Vite + Bootstrap)
├── package.json     # Root scripts (optional)
└── README.md        # This file
```

---

## Prerequisites
- Node.js (v18 or v20 recommended)
- npm
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

---

## 1. Setup

### Clone the repository
```bash
git clone <your-repo-url>
cd node_project
```

### Install dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
```

### Configure environment variables
Create a `.env` file in the `backend` directory:
```
MONGO_URI=your_mongodb_connection_string
PORT=8000
```

---

## 2. Development

### Start the backend
```bash
cd backend
npm run dev   # or: node server.js
```

### Start the frontend
```bash
cd frontend
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173) (or the port Vite assigns)
- Backend API: [http://localhost:8000/api/products](http://localhost:8000/api/products)

---

## 3. Production Build & Deployment

### Build the frontend
```bash
cd frontend
npm run build
```

### Serve frontend from backend (for production)
- The backend is set up to serve the React build from `frontend/dist` when `NODE_ENV=production`.
- Start the backend in production mode:
```bash
cd backend
NODE_ENV=production node server.js
```
- Visit [http://localhost:8000](http://localhost:8000)

---

## 4. Deployment Tips
- Use [MongoDB Atlas](https://www.mongodb.com/atlas) for cloud MongoDB.
- Use [Render](https://render.com/), [Heroku](https://heroku.com/), or your own VPS for deployment.
- Use [PM2](https://pm2.keymetrics.io/) to keep your backend running in production.
- Set environment variables securely on your host.

---

## 5. Customization
- UI: Edit React components in `frontend/src/components/`
- API: Edit Express routes/controllers in `backend/`

---

## License
MIT
