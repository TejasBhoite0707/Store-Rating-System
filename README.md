# Store Rating Platform

A full-stack web application that allows users to rate stores based on role-based access control.

---

# 🚀 Tech Stack

## Frontend

* React.js
* Tailwind CSS
* React Router DOM
* Axios
* React Hook Form
* Zod
* React Hot Toast

## Backend

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL
* JWT Authentication

---

# ✨ Features

## 🔐 Authentication & Authorization

* User Signup/Login
* JWT Authentication
* Protected Routes
* Role-Based Access Control (RBAC)

---

# 👨‍💼 Admin Features

* Dashboard Analytics
* Create Users
* Create Stores
* View All Users
* View All Stores
* Search & Sorting
* Reusable Table Component

---

# 👤 User Features

* Signup/Login
* Search Stores
* Submit Ratings
* Modify Ratings
* View Submitted Rating
* Logout Functionality

---

# 🏪 Store Owner Features

* Dashboard Analytics
* Average Store Rating
* View Users Who Rated Store

---

# 📂 Project Structure

```bash
ROXILERMERNSTACK/
│
├── Backend/
│
└── Frontend/
```

---

# ⚙️ Backend Setup

## Navigate to Backend

```bash
cd Backend
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create `.env`

```env
DATABASE_URL="postgresql://postgres:Tejas@8043@localhost:5432/store_rating_db"

JWT_SECRET="super_secret_jwt_key"

PORT=5000
```

## Run Prisma Migration

```bash
npx prisma migrate dev --name init
```

## Generate Prisma Client

```bash
npx prisma generate
```

## Start Backend Server

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# 💻 Frontend Setup

## Navigate to Frontend

```bash
cd Frontend
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create `.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

## Start Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🛠️ Backend Architecture

```bash
Backend/
│
├── src/
│   ├── config/
│   ├── constants/
│   ├── controllers/
│   ├── middleware/
│   ├── prisma/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validations/
│   ├── app.js
│   └── index.js
```

---

# 🎨 Frontend Architecture

```bash
Frontend/
│
├── src/
│   ├── api/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── App.jsx
│   └── main.jsx
```

---

# 🗄️ Database Design

## Tables

* Users
* Stores
* Ratings

## Relationships

* One Store Owner → Many Stores
* One User → Many Ratings
* One Store → Many Ratings

---

# 🔒 Validation Rules

## Name

* Minimum 20 characters
* Maximum 60 characters

## Password

* 8–16 characters
* At least one uppercase letter
* At least one special character

## Address

* Maximum 400 characters

## Email

* Standard email validation

---

# 📈 Frontend Improvements

* Reusable Table Component
* Dynamic Sorting
* Responsive Dashboard
* Empty States
* Error Boundaries
* Toast Notifications
* Loading UI

---

# 📌 Future Improvements

* Pagination
* Dark Mode
* Email Verification
* Forgot Password
* Docker Deployment
* Unit Testing

---

# 👨‍💻 Author

Tejas Bhoite

Full Stack Developer
