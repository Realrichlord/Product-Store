# 🛍️ Product Store

A full-stack product management application built with **React, Vite, Chakra UI, Zustand, Node.js, Express, and MongoDB**.

The application allows users to create, view, edit, and delete products through a responsive interface connected to a RESTful backend API.

## 🚀 Live Demo

**Live Application:**
https://product-store-ln3g.onrender.com

**Backend API:**
https://product-store-api-y62u.onrender.com

## ✨ Features

- Create products
- View all products
- View individual product details
- Edit products
- Delete products with confirmation
- Product image previews
- Form validation
- Loading states
- Error handling
- Responsive design
- Dark mode support
- REST API
- MongoDB data persistence
- Production deployment

## 🧰 Tech Stack

### Frontend

- React
- Vite
- Chakra UI
- Zustand
- React Router
- JavaScript

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- REST API

### Deployment

- GitHub
- Render

## 📁 Project Structure

```text
product-store/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── App.jsx
│   └── vite.config.js
│
├── .gitignore
├── package.json
└── README.md
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Realrichlord/Product-Store.git
```

### 2. Navigate into the project

```bash
cd Product-Store
```

### 3. Install dependencies

```bash
npm install
```

Then install the frontend dependencies:

```bash
cd frontend
npm install
```

Return to the project root when finished.

### 4. Environment Variables

Create a `.env` file in the project root.

```env
MONGO_URI=your_mongodb_connection_string
```

For the frontend production environment:

```env
VITE_API_URL=your_backend_url
```

**Never commit your `.env` file to GitHub.**

## ▶️ Running Locally

From the project root:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

Start the frontend from the `frontend` directory:

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

## 🔌 API Endpoints

| Method | Endpoint            | Description          |
| ------ | ------------------- | -------------------- |
| GET    | `/api/products`     | Get all products     |
| GET    | `/api/products/:id` | Get a single product |
| POST   | `/api/products`     | Create a product     |
| PUT    | `/api/products/:id` | Update a product     |
| DELETE | `/api/products/:id` | Delete a product     |

## 🧠 What I Learned

Building this project helped me practice:

- Building reusable React components
- Managing application state with Zustand
- Creating RESTful APIs with Express
- Connecting Node.js applications to MongoDB
- Working with Mongoose models
- Handling asynchronous API requests
- Form validation and error handling
- Connecting a frontend application to a production API
- Configuring CORS
- Managing environment variables
- Deploying full-stack applications
- Using Git and GitHub for version control

## 📸 Screenshots

### Home Page

![Home Page](frontend/screenshots/home.png)

### Create Product

![Create Product](frontend/screenshots/create-product.png)

### Product Details

![Product Details](frontend/screenshots/product-details.png)

## 🔮 Future Improvements

Possible future improvements include:

- User authentication
- Image upload instead of image URLs
- Product categories
- Search and filtering
- Pagination
- Product ratings and reviews
- Admin dashboard
- Improved performance and code splitting
- Automated testing

## 👨‍💻 Author

**Realrichlord**

GitHub:
https://github.com/Realrichlord
