# Shopora — MERN Stack E-Commerce Store

Shopora is a full-stack e-commerce web application built with the MERN stack as part of the Webora Tec Frontend Development Internship Program. The project focuses on building a clean storefront, managing products, and implementing CRUD (Create, Read, Update, Delete) functionality.

## 🚀 Project Overview

Shopora is a practical development project designed to demonstrate frontend and backend integration using modern web technologies. It includes a React-based user interface and a backend API connected to a database for product management.

## ✨ Features

- **Product Management:** Create, read, update, and delete product records.
- **Product Listing:** Retrieve and display products from the backend API.
- **Product Information:** Store product names, prices, descriptions, and image URLs.
- **Storefront Interface:** Browse products through a dedicated shop page.
- **Product Creation Form:** Add products using a form with input validation and loading/error feedback.
- **State Management:** Use Zustand to manage product data and API operations.
- **Responsive UI:** Build the interface with React and Bootstrap.

*Additional features, including authentication and authorization, may be developed as the project progresses.*

## 🛠️ Tech Stack

**Frontend**
- React
- Vite
- Bootstrap
- Bootstrap Icons
- Zustand
- React Router

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

## 📁 Project Structure

```text
Shopora/
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── stores/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── server/
│   └── ...
├── package.json
└── README.md
```

*The structure above is illustrative; update it to match the repository's actual files and folders.*

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/) or your project's configured package manager
- [MongoDB](https://www.mongodb.com/) or a MongoDB Atlas database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AmanWebHub/Webora_Tec---Advanced-full-stack-E-Store.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Webora_Tec---Advanced-full-stack-E-Store
   ```

3. Install the dependencies using the package manager and commands configured in the project.

4. Configure the required environment variables for the backend, including your MongoDB connection string.

5. Start the backend and frontend using the scripts defined in their respective `package.json` files.

> **Note:** The exact installation and startup commands depend on the current repository configuration. Check the root, client, and server `package.json` files before adding commands here.

## 🔌 Product API

The product API uses the `/api/products` endpoint.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/products` | Retrieve products |
| GET | `/api/products/:id` | Retrieve a specific product |
| POST | `/api/products` | Create a product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

Product records include a name, price, description, and image URL.

## 🎯 Project Objectives

- Practise full-stack development with the MERN stack.
- Connect a React frontend to a REST API.
- Implement CRUD operations using MongoDB and Express.
- Manage frontend state using Zustand.
- Develop reusable React components and responsive layouts.
- Build a project suitable for continued learning and portfolio development.

## 🔮 Planned Improvements

Depending on the project's development stage, future improvements may include:

- User registration and login.
- Authentication and role-based authorization.
- An admin dashboard for product management.
- Product details and editing pages.
- Shopping cart functionality.
- Deployment and production configuration.

## 👨‍💻 Developer

**AmanWebHub**

GitHub: [@AmanWebHub](https://github.com/AmanWebHub)

## 📄 Disclaimer

Shopora is an educational project developed for practical learning and portfolio demonstration. It is not intended to represent a complete production-ready e-commerce platform.

---

*Built as part of the Webora Tec internship learning experience.*
