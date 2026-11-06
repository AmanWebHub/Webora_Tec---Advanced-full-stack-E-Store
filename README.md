# Shopora — MERN Stack E-Commerce Store

Shopora is a full-stack e-commerce web application built with the MERN stack as part of the Webora Tec Frontend Development Internship Program. The project covers a storefront, product management (CRUD), and **authentication and authorization** with role-based access control.

## 🚀 Project Overview

The project was built in three parts:

1. **CRUD:** a REST API and React client for creating, reading, updating and deleting products.
2. **Storefront:** the home page, shop page, product details and admin dashboard.
3. **Authentication and authorization:** user accounts, secure login, and admin-only product management.

## ✨ Features

**Store and products**
- Create, read, update and delete products (name, price, description, image URL).
- Storefront with home, shop and product details pages.
- Admin dashboard for managing products.
- Zustand for state management, Bootstrap for a responsive UI.

**Authentication and authorization**
- User registration and login with hashed passwords (bcrypt).
- Sessions using a JWT stored in an `httpOnly` cookie.
- Two roles: `user` and `admin`.
- Server-side route protection: only admins can create, update or delete products.
- Client-side route guards: the admin pages redirect non-admins, and the login/register pages redirect users who are already logged in.
- Session restored on page refresh.
- Navbar that adapts to login state (Login, or name + Logout, plus a dashboard link for admins).

## 🛠️ Tech Stack

**Frontend:** React, Vite, React Router, Zustand, Bootstrap, Bootstrap Icons

**Backend:** Node.js, Express, MongoDB, Mongoose

**Auth:** bcryptjs (password hashing), jsonwebtoken (JWT), cookie-parser (reading cookies)

## 📁 Project Structure

```text
Shopora/
├── client/
│   ├── src/
│   │   ├── Assets/            # CSS files
│   │   ├── components/        # Navbar, AdminRoute, GuestRoute, product components
│   │   ├── hooks/             # useLogin, useRegister, useNavbar, product hooks
│   │   ├── pages/             # Home, Shop, Login, Register, AdminDashboard, ...
│   │   ├── stores/            # authStore.js, productStore.js (Zustand)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js         # Proxies /api to the backend
│   └── package.json
├── server/
│   ├── config/db.js           # MongoDB connection
│   ├── controllers/           # authController.js, productController.js
│   ├── middleware/            # authMiddleware.js (protect, adminOnly)
│   ├── models/                # userModel.js, productModel.js
│   ├── routes/                # authRoute.js, productRoute.js
│   ├── utils/                 # generateToken.js
│   └── server.js
├── .env                       # Not committed
├── package.json
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- A MongoDB database (a local instance or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AmanWebHub/Webora_Tec---Advanced-full-stack-E-Store.git
   cd Webora_Tec---Advanced-full-stack-E-Store
   ```

2. Install the backend dependencies (from the project root):

   ```bash
   pnpm install
   ```

3. Install the frontend dependencies:

   ```bash
   cd client
   pnpm install
   cd ..
   ```

4. Create a `.env` file in the project root:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=a_long_random_string
   PORT=5000
   NODE_ENV=development
   ```

   Generate a strong `JWT_SECRET` with:

   ```bash
   node -e "import('crypto').then(c => console.log(c.randomBytes(32).toString('hex')))"
   ```

5. Start the backend (from the project root):

   ```bash
   pnpm dev
   ```

6. Start the frontend in a second terminal:

   ```bash
   cd client
   pnpm dev
   ```

7. Open the URL that Vite prints (usually `http://localhost:5173`). The Vite dev server proxies all `/api` requests to the backend on port 5000, so the browser treats the app and API as the same origin and cookies work without extra configuration.

### Creating an admin account

Nobody can register as an admin. This is deliberate, so the register endpoint ignores any `role` sent in the request. To create an admin:

1. Register a normal account through the app.
2. Open the `users` collection in MongoDB (Atlas or Compass).
3. Change that user's `role` from `"user"` to `"admin"`.

The change takes effect immediately, with no need to log in again, because the server reloads the user from the database on every protected request.

## 🔐 Authentication and Authorization

### How it works

**Authentication** answers "who are you?" and **authorization** answers "what are you allowed to do?"

1. **Register:** the password is hashed with bcrypt in a Mongoose `pre("save")` hook before it reaches the database. New accounts always get the `user` role.
2. **Login:** the server finds the user, compares the entered password with the stored hash, and on success signs a JWT containing only the user's `id`.
3. **Session cookie:** the JWT is sent in an `httpOnly` cookie, so JavaScript on the page cannot read it. The browser attaches it automatically to every request.
4. **`protect` middleware (authentication):** verifies the token's signature, then loads the user from the database and attaches it to `req.user`. The role is read from the database on each request, not from the token, so role changes and deleted accounts take effect immediately.
5. **`adminOnly` middleware (authorization):** runs after `protect` and allows the request only if `req.user.role === "admin"`.
6. **Logout:** the server overwrites the cookie with an expired, empty one.

### Cookie settings

| Option | Value | Why |
|---|---|---|
| `httpOnly` | `true` | Hides the token from client-side JavaScript |
| `secure` | `true` in production | Sends the cookie over HTTPS only |
| `sameSite` | `strict` | Stops other sites from triggering requests with the cookie |
| `maxAge` | 7 days | Matches the token's expiry |

### Security decisions

- Passwords are never stored in plain text, and the password field is excluded from queries by default (`select: false`).
- Login returns the same message ("Invalid email or password") whether the email or the password is wrong, so attackers cannot discover which emails have accounts.
- API responses are built by hand and never include the password hash.
- Client-side guards are only for user experience. The real enforcement is on the server, which rejects unauthorised requests no matter what the interface shows.

## 🔌 API Reference

### Auth API

Base path: `/api/auth`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/register` | Public | Create an account and log in |
| POST | `/login` | Public | Log in and receive the session cookie |
| POST | `/logout` | Public | Clear the session cookie |
| GET | `/me` | Logged in | Return the current user |

**Register**

```http
POST /api/auth/register
Content-Type: application/json

{ "name": "Test User", "email": "test@example.com", "password": "secret123" }
```

| Status | Meaning |
|---|---|
| 201 | Account created, cookie set |
| 400 | Missing required fields |
| 409 | Email already registered |

**Login**

```http
POST /api/auth/login
Content-Type: application/json

{ "email": "test@example.com", "password": "secret123" }
```

| Status | Meaning |
|---|---|
| 200 | Logged in, cookie set |
| 400 | Missing email or password |
| 401 | Invalid email or password |

Successful responses return the user without the password:

```json
{
  "success": true,
  "data": { "_id": "...", "name": "Test User", "email": "test@example.com", "role": "user" },
  "message": "Logged in successfully"
}
```

**Current user**

`GET /api/auth/me` returns `200` with the user, or `401` if there is no valid session.

### Product API

Base path: `/api/products`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/products` | Public | List all products |
| POST | `/api/products` | **Admin** | Create a product |
| PUT | `/api/products/:id` | **Admin** | Update a product |
| DELETE | `/api/products/:id` | **Admin** | Delete a product |

Protected routes return:

| Status | Meaning |
|---|---|
| 401 | Not logged in, or the token is invalid or expired |
| 403 | Logged in, but not an admin |

Product records contain a name, price, description and image URL.

## 🧭 Frontend Routes

| Path | Access | Page |
|---|---|---|
| `/` | Public | Home |
| `/shop` | Public | Shop |
| `/products/:id` | Public | Product details |
| `/cart` | Public | Cart |
| `/login`, `/register` | Guests only (logged-in users are redirected) | Login, Register |
| `/admin` | Admin only | Admin dashboard |
| `/products/new` | Admin only | Create product |
| `/products/:id/edit` | Admin only | Edit product |

Route guards are implemented as React Router layout routes (`AdminRoute` and `GuestRoute`) that render `<Outlet />` when access is allowed. Both wait for the session check (`isCheckingAuth`) to finish before redirecting, so refreshing a page never sends a logged-in user to the wrong place.

## 🧪 Testing Performed

The API was tested manually with Postman, and the interface was tested in the browser.

| Test | Expected result |
|---|---|
| Register a new user | 201, cookie set, password hashed in the database, role `user` |
| Register the same email again | 409 |
| Login with correct credentials | 200, cookie set |
| Login with wrong password or unknown email | 401, identical message |
| `GET /api/auth/me` logged out / logged in / after logout | 401 / 200 / 401 |
| `POST /api/products` logged out | 401 |
| `POST /api/products` as a regular user | 403 |
| `POST /api/products` as an admin | 201 |
| `GET /api/products` logged out | 200 |
| Visit `/admin` logged out | Redirected to `/login` |
| Visit `/admin` as a regular user | Redirected to `/` |
| Refresh `/admin` as an admin | Dashboard loads, no redirect |
| Visit `/login` while logged in | Redirected away |
| Navbar in each state | Shows Login, or name and Logout, plus a dashboard link for admins |

## ⚠️ Known Limitations

This is an educational project. The following improvements are planned for a production version:

- Tokens last 7 days, and logout only clears the cookie in the browser. A token stolen before logout stays valid until it expires. Short-lived access tokens with refresh tokens, or a token version stored on the user, would address this.
- There is no rate limiting on login attempts. `express-rate-limit` would help against brute-force attacks.
- If the session expires while a page is open, the user only finds out when a request fails.
- Password rules are minimal (6 characters minimum).
- There is no email verification or password reset.

## 🔮 Planned Improvements

- Rate limiting and stronger password rules.
- Refresh tokens and server-side token invalidation.
- Shopping cart functionality.
- Deployment and production configuration.

## 👨‍💻 Developer

**AmanWebHub**

GitHub: [@AmanWebHub](https://github.com/AmanWebHub)

## 📄 Disclaimer

Shopora is an educational project developed for practical learning and portfolio demonstration. It is not intended to represent a complete production-ready e-commerce platform.

---

*Built as part of the Webora Tec internship learning experience.*