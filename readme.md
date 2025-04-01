# Next.js + Express.js Authentication App

This project is a fullstack authentication system using **Next.js** for the frontend and **Node.js with Express** for the backend. The application allows users to login, register, change passwords and view a list of registered users, with authentication tokens stored in cookies.

## Tech Stack

### 🔹 Frontend
- Next.js
- React
- TypeScript
- TailwindCSS
- React Icons
- Context API
- Axios
- Nookies

### 🔹 Backend
- Node.js
- Express.js
- MongoDB ([How to create a MongoDB database?](https://www.mongodb.com/resources/products/platform/mongodb-atlas-tutorial))
- JWT (JSON Web Token) for authentication
- bcrypt for encrypt passwords
- cors to allow cross-origin requests
- dotenv to manage environment variables

---

## How to run the project

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/lucas-candiago/login-api
cd login-api
```

### 2️⃣ Configure Environment Variables
Create a **.env** file in the backend directory and add the following variables:
```env
MONGO_URI=mongodb+srv://seuusuario:suasenha@cluster.mongodb.net/dbname
JWT_SECRET=seuSegredoJWT
```
In the frontend directory, create a **.env** and add:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/users/
```

### 3️⃣ Install dependencies
#### Backend
```bash
cd backend
npm install
```
#### Frontend
```bash
cd frontend
npm install
```

### 4️⃣ Run the application
#### Backend
```bash
npm run dev
```
#### Frontend
```bash
npm run dev
```
Access the frontend at **http://localhost:3000** and the backend at **http://localhost:5000**.

---

## Authentication Features
✅ User registration  
✅ Login with email and password  
✅ Password change with auth token  
✅ List registered users  
✅ Store Auth token in cookies  
✅ Protect routes with JWT  
