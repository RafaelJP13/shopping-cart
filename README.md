# CompreFlow 🛒

A modern fullstack e-commerce platform built with Next.js and NestJS.

---

# 🚀 About the Project

Compre Mais is a fullstack e-commerce application focused on scalability, organization, and clean architecture.

The project aims to simulate a modern online shopping experience with:

- Product browsing
- Shopping cart
- Authentication
- REST API integration
- Modular backend architecture

This repository contains both frontend and backend applications.

---

# 🧰 Technologies

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

## Backend

- NestJS
- Node.js
- TypeScript

## Tools & Concepts

- REST API
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

## 🔐 Environment Variables (Backend)

The backend requires a `.env` file inside the `/backend` directory.

```bash
DATABASE_URL="postgresql://<teste>:<teste>@db:5432/shopping_cart?schema=public"
JWT_SECRET=""
JWT_EXPIRES_IN=""
```

---


# 🔧 Setup

## Navigate to folder project

```bash
docker compose up --build
```
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
- [x] REST API structure
- [x] Frontend with Next.js
- [ ] Authentication
- [ ] Product listing
- [ ] Shopping cart
- [ ] Checkout flow
- [ ] Admin dashboard

---

# 🧠 Learning Goals

This project was created to improve skills in:

- Fullstack development
- Backend architecture with NestJS
- API design
- Scalable project organization
- Modern frontend development with Next.js

---

# 📷 Future Improvements

- Docker support
- CI/CD pipeline
- Unit and integration tests
- AWS deployment
- Payment gateway integration

# 📄 License

This project is licensed under the MIT License.
