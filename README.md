# URL Shortener

A full-stack URL Shortening application built with **Express.js**, **MySQL**, and **React**.
It provides a RESTful API to shorten long URLs, manage them, and view statistics, along with a minimal frontend interface.

**Problem Statement Link:** [URL Shortening Service](https://roadmap.sh/projects/url-shortening-service)

---

## 🚀 Features

### Backend (Express.js + MySQL)

-   Shorten long URLs into unique short codes.
-   Redirect users from short URLs to the original long URLs.
-   Update an existing shortened URL.
-   Delete shortened URLs.
-   View statistics (e.g., access count).
-   Input validation (custom + schema-based).
-   Layered architecture (Controllers, Services, Models, Validators).

### Frontend (React + Vite)

-   Simple interface to create short URLs.
-   View and manage shortened URLs.
-   Update/delete URLs via modals.
-   View URL statistics.
-   Client-side validation with helpful UI feedback.
-   Custom 404 and redirect handling pages.

---

## 📂 Project Structure

```
url-shortener/
├── client/                 # React frontend
└── server/                 # Express backend
```

### Server Structure

```
server/
├── controllers/            # Route handlers
│   └── urlControllers.js
├── middlewares/            # Express middlewares
├── models/                 # Sequelize/MySQL models
├── routes/                 # API routes
│   └── urlRoutes.js
├── services/               # Business logic (layer between controller & model)
├── utils/                  # Helper utilities
├── validators/             # Request body schemas
├── server.js               # Server entry point
└── package.json
```

### Client Structure

```
client/
├── public/
├── src/
│   ├── components/
│   │   ├── ShortUrlCard.jsx
│   │   ├── Toast.jsx
│   │   ├── UpdateModal.jsx
│   │   └── UrlInputForm.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Redirect.jsx
│   │   ├── Stats.jsx
│   │   └── NotFound.jsx
│   ├── services/           # Axios API wrapper functions
│   ├── utils/              # Utility/helpers
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
└── package.json
```

---

## 🧰 Prerequisites

-   **Node.js** (v16+)
-   **npm**
-   **MySQL**
-   Optional: **Vite** globally installed for frontend development

---

# 🛠️ Backend Setup (Server)

## 1. Installation

```bash
git clone https://github.com/pinkelephant4/url-shortener.git
cd url-shortener/server
npm install
```

## 2. Environment Configuration

Create a `.env` file inside `/server`:

```env
PORT=8080
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=yourdbname
```

> Make sure your MySQL DB exists, or enable auto-sync in the Sequelize config.

## 3. Running the Server

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

---

## 📡 API Documentation

### Base URL

```
http://localhost:8080/api
```

### Endpoints

| Method | Endpoint                    | Description                            |
| ------ | --------------------------- | -------------------------------------- |
| POST   | `/shorten`                  | Create a new short URL                 |
| GET    | `/shorten/:shortCode`       | Retrieve and redirect to original URL  |
| PUT    | `/shorten/:shortCode`       | Update the original URL                |
| DELETE | `/shorten/:shortCode`       | Delete a shortened URL                 |
| GET    | `/shorten/:shortCode/stats` | View stats (click count, last visited) |

### Response Format

All responses follow:

```json
{
  "success": true,
  "data": { ... }
}
```

or

```json
{
    "success": false,
    "message": "Error message here."
}
```

---

# 🎨 Frontend Setup (Client)

## 1. Installation

```bash
cd url-shortener/client
npm install
```

## 2. Environment Variables

Create a `.env` inside `/client`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## 3. Running the Frontend

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 📦 Dependencies Overview

### Backend

-   **Express.js**
-   **mysql2 / Sequelize** (ORM)
-   **dotenv**
-   **cors**
-   **joi / custom validators**

### Frontend

-   **React**
-   **React Router**
-   **Axios**
-   **Tailwind CSS**

### Dev Tools

-   **Vite**
-   **ESLint**

---

## 📝 Future Enhancements

-   Add authentication (JWT).
-   URL expiration feature.
-   Custom short codes chosen by users.
-   Dashboard with charts for analytics.
-   Dockerization for easy deployment.

---

## 🤝 Contributing

Pull requests are welcome!
Please ensure your code follows ESLint guidelines and project folder structure.
