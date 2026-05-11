# CompreFlow 🛒

A modern Retail Execution + Pricing Intelligence + Sales Intelligence platform built with React.js, React Native and NestJS.

---

# 🚀 About the Project

Compre Mais is a Pricing and Salesforce application focused on scalability, organization, and clean architecture.

The project aims to simulate a modern Pricing and Salesforce experience with:

- Product browsing
- Shopping cart
- Authentication
- GraphQL integration
- Modular backend architecture

This repository contains both frontend and backend applications.

---

# 🧰 Technologies

## Frontend

- React
- TypeScript
- Tailwind CSS

## Backend

- NestJS
- Node.js
- TypeScript

## Tools & Concepts

- GraphQL
- ESLint
- Prettier
- Modular Architecture
- Git & GitHub

---

# 📁 Project Structure

```bash
compre-mais/
├── backend/       # NestJS API
├── frontend/      # Next.js application
├── infra/         # Infra
```

---

# ⚙️ Getting Started

## Clone the repository

```bash
git clone https://github.com/RafaelJP13/compre-mais.git
```

---


# 🔧 Setup

The backend requires a `.env` file inside the `/backend` directory.

```bash
DATABASE_URL="postgresql://<teste>:<teste>@db:5432/shopping_cart?schema=public"
JWT_SECRET=""
JWT_EXPIRES_IN=""
```

After that runs the command

```bash
docker compose up --build
```

---

## 👤 Default User (Seed)

After running the docker compose, a default user will be created for testing purposes:

```json
{
  "name": "Platform Owner",
  "email": "owner@test.com",
  "password": "123456"
}
```

---

Backend will run on:

```bash
http://localhost:3000
```
Frontend will run on:

```bash
http://localhost:5173
```

---

# 📌 Features

- [x] NestJS backend initialization
- [x] Frontend with React.js
- [x] Login & Logout
- [x] Admin Dashboard
- [x] Authentication
- [x] Unit Tests
- [x] CI & CD
- [ ] Permission-Based Access Control (PBAC) 
- [ ] REST API for easy stuffs
- [ ] JWT in HttpOnly cookies
- [ ] Company Dashboard
- [ ] GraphQL for dashboards, aggregations, complex frontend querying
- [ ] Internal users crud
- [ ] Company crud
- [ ] Employers Company crud 
      

---

# 🧠 Learning Goals

This project was created to improve skills in:

- Fullstack development
- Backend architecture with NestJS
- API design
- Scalable project organization
- Modern frontend development with React.js

---

## 🔗 Learn More

👉 [Visit Compre Flow](https://institucional-compre-flow.vercel.app/)

---

# 📷 Future Improvements

- Docker support
- CI/CD pipeline
- Unit and integration tests
- AWS deployment
- Payment gateway integration

# 📄 License

This project is licensed under the GNU General Public License v3.0.
