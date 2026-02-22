# Brevis Server

> Backend service for Brevis — a minimalist, privacy-first platform for emotional expression and quiet release.

**Main Project:** https://github.com/me-prakhargupta/brevis  
**Frontend Repo:** https://github.com/me-prakhargupta/brevis-client

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Backend Design Principles](#backend-design-principles)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Clone the repository](#1-clone-the-repository)
  - [Install dependencies](#2-install-dependencies)
  - [Setup environment variables](#3-setup-environment-variables)
  - [Run the server](#4-run-the-server)
- [Authentication](#authentication)
- [Future Improvements](#future-improvements)
- [Key Takeaway](#key-takeaway)
- [Author](#author)
- [Note](#note)

---

## Overview

This is the **server-side application** of Brevis, responsible for handling data flow, API design, and core business logic.

The backend is designed to support a **low-friction, privacy-first experience**, ensuring that users can express freely without unnecessary complexity or identity binding.

---

## Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB (Mongoose)**
- **JWT** (Authentication / Token handling)
- **bcrypt** (Password hashing)
- **dotenv** (Environment configuration)
- **CORS** & **Cookie Parser**

---

## Backend Design Principles

- **Separation of concerns**  
  Controllers, routes, and models are modular and scalable

- **Clean API design**  
  RESTful structure with predictable endpoints

- **Security-first approach**  
  Password hashing (bcrypt) and token-based authentication (JWT)

- **Environment-based configuration**  
  Sensitive data handled via `.env`

- **Scalable structure**  
  Designed to extend features without major refactors

---

## Architecture

```
Client (Next.js)
       ↓
REST API (Express.js)
       ↓
Database (MongoDB)
```

- API acts as the bridge between frontend and database
- Stateless request handling using JWT
- Structured data models via Mongoose

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/me-prakhargupta/brevis-server.git
cd brevis-server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Replace placeholders with your actual values:
- `MONGO_URI`: Your MongoDB connection string
- `JWT_SECRET`: A strong secret key for JWT token signing

### 4. Run the server

```bash
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

## Authentication

- Uses **JWT-based authentication**
- Passwords are securely hashed using **bcrypt**
- Tokens are handled via headers and/or cookies
- Stateless request handling for scalability

---

## Future Improvements

- Rate limiting & API security enhancements
- Logging & monitoring (Winston / Morgan)
- Input validation (Zod / Joi)
- Scalable service-layer abstraction
- Deployment with Docker

---

## Key Takeaway

This backend is built to support a product that prioritizes:

- **Privacy**
- **Simplicity**
- **Low-friction interaction**

...while maintaining clean architecture and scalability.

---

## Author

**Prakhar Gupta**  
Full-Stack Developer (Next.js, Node.js, TypeScript)  
Focused on building backend-driven, production-grade web applications.

---

## Note

This repository contains only the backend service of Brevis and is designed to work with the [client application](https://github.com/me-prakhargupta/brevis-client). For the complete system architecture, see the [main Brevis project](https://github.com/me-prakhargupta/brevis).
