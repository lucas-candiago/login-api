# Next.js + Express.js Authentication App

Este projeto consiste em um sistema de autenticação fullstack, utilizando **Next.js** para o frontend e **Node.js com Express** para o backend. A aplicação permite login, visualização de usuários, registro e troca de senha, armazenando tokens de autenticação via cookies.

## Tecnologias Utilizadas

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
- MongoDB ([como criar o banco de dados](https://www.mongodb.com/resources/products/platform/mongodb-atlas-tutorial))
- JWT (JSON Web Token) para autenticação
- bcrypt para hash de senhas
- cors para permitir requisições de domínios diferentes
- dotenv para uso de arquivos .env

---

## Como Rodar o Projeto

### 1️⃣ Clonar o Repositório
```bash
git clone https://github.com/lucas-candiago/login-api
cd login-api
```

### 2️⃣ Configurar as Variáveis de Ambiente
Crie um arquivo **.env** no backend e adicione as seguintes variáveis:
```env
PORT=5000
MONGO_URI=mongodb+srv://seuusuario:suasenha@cluster.mongodb.net/dbname
JWT_SECRET=seuSegredoJWT
```
No frontend, crie um **.env** e adicione:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/users/
```

### 3️⃣ Instalar Dependências
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

### 4️⃣ Rodar a Aplicação
#### Backend
```bash
npm run dev
```
#### Frontend
```bash
npm run dev
```
Acesse o frontend via **http://localhost:3000** e o backend via **http://localhost:5000**.

---

## 🔒 Funcionalidades de Autenticação
✅ Cadastro de usuários  
✅ Login com e-mail e senha  
✅ Troca de senha autenticada  
✅ Lista de usuários cadastrados  
✅ Token de autenticação salvo via cookies  
✅ Proteção de rotas com JWT
