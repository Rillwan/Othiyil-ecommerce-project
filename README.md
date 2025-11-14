# Othiyil - E-Commerce Project

Domain: https://www.othiyil.com/

A full-stack MERN application with:

- 🖥️ **Frontend** – React + Vite
- 🛠️ **Backend** – Node.js + Express
- 🗄️ **Database** – MongoDB
- 🚀 **Production Build** – React build served from Express

---

## 📁 Folder Structure

```
project/
   ├── client/           # React frontend
   ├── server/           # Node.js backend
   │     └── client/dist/   # Production build files (from Vite)
   ├── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git remote add origin https://github.com/Rillwan/Othiyil-ecommerce-project.git

cd Othiyil-ecommerce-project
```

---

## 📦 Install Dependencies

### 🔹 Client

```bash
cd client
npm install
```

### 🔹 Server

```bash
cd ../server
npm install
```

---

## ▶️ Run Project (Development)

### Start backend:

```bash
cd server
npm start
```

### Start frontend:

```bash
cd client
npm start
```

Frontend runs on:  
`http://localhost:3000`

Backend runs on:  
`http://localhost:8000`

---

## 🏗️ Build for Production

Inside **client**:

```bash
npm run build
```

Build will be generated automatically inside:

```
server/client/dist/
```

---

## 🚀 Start Production Server

```bash
cd server
npm start
```

---

## 🔧 Environment Variables (.env)

```
PORT=8000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
MONGO_STORAGE_NAME=your_mongo_storage_name
```

---

## 📡 API Endpoints

### Example:

```
POST /api/auth/login
GET /api/products
POST /api/orders
```

---

## 🛠️ Tech Stack

**Frontend:**  
- React  
- Vite  
- React Router  
- Axios  

**Backend:**  
- Node.js  
- Express  
- Mongoose  

**Database:**  
- MongoDB  

**Deployment:**  
- VPS / Hostinger / DigitalOcean / Nginx

---

## 📜 Scripts

### In `server/package.json`

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

### In `client/package.json`

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

---

## 👨‍💻 Author

**Your Name**  
Rillwan.tech
Full-stack MERN Developer  
Portfolio: https://rillwantech.vercel.app/

---

## 📄 License

This project is licensed under the MIT License.
