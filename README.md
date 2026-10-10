# 🌾 KissanConnect - Direct Mandi Marketplace

KissanConnect is a modern digital mandi web application connecting Indian farmers directly with buyers, eliminating middlemen and providing fair prices.

---

## 🚀 Live Deployment Guide

### Option 1: Frontend on Vercel + Backend on Render (Recommended)

#### 1. Deploy Backend on [Render.com](https://render.com)
1. Create a new **Web Service** on Render and connect your GitHub repository.
2. Configure settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
3. Add Environment Variables in Render:
   - `PORT`: `5000`
   - `MONGO_URI`: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/kissanconnect?retryWrites=true&w=majority`
4. Copy your backend URL (e.g. `https://kissanconnect-api.onrender.com`).

#### 2. Deploy Frontend on [Vercel](https://vercel.com)
1. Import your GitHub repository into Vercel.
2. Set **Root Directory** to `frontend`.
3. Framework Preset: **Vite**.
4. In **Environment Variables**, add:
   - `VITE_API_URL`: Your Render backend URL (e.g. `https://kissanconnect-api.onrender.com`)
5. Click **Deploy**. SPA routing and API calls will work seamlessly!

---

### Option 2: Full-Stack on Render (Single Service)

1. Create a **Web Service** on Render with Root Directory left as `/` (root).
2. Configure:
   - **Build Command**: `npm run install-all && npm run build`
   - **Start Command**: `npm start`
3. Environment Variables:
   - `NODE_ENV`: `production`
   - `MONGO_URI`: Your MongoDB connection string

---

## 💻 Local Development Setup

### 1. Backend Setup
```bash
cd backend
npm install
# Set your MONGO_URI in backend/.env
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🛠️ Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS, Lucide React, React Router v7
- **Backend**: Node.js, Express, MongoDB with Mongoose, Bcryptjs, CORS, Dotenv
