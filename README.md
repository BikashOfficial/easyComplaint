# User/Admin Complaint Management System

A full-stack web application for managing user complaints with separate user and admin portals, JWT authentication, email notifications, and a modern React UI.

---

## Live Demo

Access the deployed application here: [https://easy-complaint-delta.vercel.app/](https://easy-complaint-delta.vercel.app/)

--- 

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Setup & Installation](#setup--installation)
  - [Environment Variables](#environment-variables)
  - [Client Setup](#client-setup)
  - [Server Setup](#server-setup)
- [Usage](#usage)
- [Key Files & Structure](#key-files--structure)
- [Troubleshooting](#troubleshooting)

---

## Overview

This project is a complaint management system with two main roles:
- **Users**: Register, log in, and submit complaints. Track complaint status.
- **Admins**: Register (with organization code), log in, view/manage all complaints, update statuses, and receive notifications.

The system uses JWT authentication, role-based access, and email notifications for complaint updates.

---

## Features
- User and Admin registration/login (with role separation)
- JWT-based authentication
- Complaint submission, tracking, and status updates
- Admin dashboard with filtering and statistics
- Email notifications (using Nodemailer & Gmail)
- Secure password hashing (bcrypt)
- Modern, responsive React UI (with Tailwind CSS)
- Protected routes for user/admin
- Logout clears all session data

---

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, React Context API
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Auth**: JWT (jsonwebtoken), bcrypt
- **Email**: Nodemailer (Gmail SMTP)

---

## Folder Structure
```
userComplain/
├── client/           # React frontend
│   ├── src/
│   │   ├── pages/    # Main pages (Login, Register, Dashboards)
│   │   ├── components/ # Reusable UI components
│   │   ├── contexts/ # React Context for user/admin
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── ...
├── server/           # Node.js backend
│   ├── controllers/  # Route controllers (user/admin)
│   ├── models/       # Mongoose models (User, Complain)
│   ├── routes/       # Express routes
│   ├── utils/        # Utility functions (mailer)
│   ├── middlewares/  # Auth middleware
│   ├── app.js        # Main server entry
│   ├── .env          # Server environment variables
│   └── ...
└── README.md         # Project documentation
```

---

## Setup & Installation

### Prerequisites
- Node.js (v16+ recommended)
- npm
- MongoDB Atlas account (or local MongoDB)
- Gmail account for email notifications

### Environment Variables

#### Server (`server/.env`):
```
PORT=5000
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_connection_string
ORGANIZATION_CODE=your_admin_org_code
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
ADMIN_EMAIL=admin_notification_email
```
- **EMAIL_PASS**: Use a Gmail App Password (not your main password).

#### Client (`client/.env`):
```
VITE_BASE_URL=http://localhost:5000
```

### Client Setup
```bash
cd client
npm install
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Server Setup
```bash
cd server
npm install
npm start
```
Server runs on [http://localhost:5000](http://localhost:5000)

---

## Usage

- **User Registration/Login**: Register as a user, log in, and submit complaints from the user dashboard.
- **Admin Registration/Login**: Register as admin (requires organization code), log in, and manage all complaints from the admin dashboard.
- **Complaint Flow**: Users submit complaints, admins update status, and both receive email notifications.
- **Logout**: Clears all session data from localStorage.

---

## Key Files & Structure

### Client
- `src/pages/Login.jsx`: Handles both user and admin login, role-based tab UI.
- `src/pages/Register.jsx`: Handles registration for both roles.
- `src/pages/DashBoard.jsx`: User dashboard for submitting and tracking complaints.
- `src/pages/AdminDashBoard.jsx`: Admin dashboard for managing complaints.
- `src/components/`: Shared UI components (Header, Footer, Complaint forms, etc.)
- `src/contexts/`: React Context for user/admin state.

### Server
- `controllers/userController.js`: User registration, login, complaint submission.
- `controllers/adminController.js`: Admin registration, login, dashboard, status updates.
- `models/user.js`: User schema (with isAdmin flag).
- `models/complain.js`: Complaint schema.
- `routes/`: Express route definitions.
- `middlewares/auth.js`: JWT authentication middleware.
- `utils/mailer.js`: Nodemailer email utility.
- `app.js`: Main Express app entry point.

---

## API Endpoints

### User Endpoints (`/user`)
| Method | Endpoint         | Description                                 | Auth Required |
|--------|------------------|---------------------------------------------|---------------|
| POST   | `/user/register` | Register a new user                         | No            |
| POST   | `/user/login`    | User login                                  | No            |
| GET    | `/user/profile`  | Get logged-in user's profile                | Yes           |
| POST   | `/user/complaint`| Submit a new complaint                      | Yes           |

### Admin Endpoints (`/admin`)
| Method | Endpoint                | Description                                 | Auth Required |
|--------|-------------------------|---------------------------------------------|---------------|
| POST   | `/admin/register`       | Register a new admin (needs org code)       | No            |
| POST   | `/admin/login`          | Admin login                                 | No            |
| GET    | `/admin/profile`        | Get logged-in admin's profile               | Yes           |
| GET    | `/admin/dashboard`      | Get dashboard stats and complaints          | Yes           |
| PUT    | `/admin/complaint/:id`  | Update status of a complaint                | Yes           |
| DELETE | `/admin/complaint/:id`  | Delete a complaint                          | Yes           |

**Auth Required:** Endpoints marked "Yes" require a JWT token in the `Authorization` header.

---

## Frontend Flows & API Usage

### Authentication
- **Login:**  
  - User: `POST /user/login`  
  - Admin: `POST /admin/login`  
  - The login page has tabs for user/admin. On success, JWT and role are stored in localStorage.

- **Register:**  
  - User: `POST /user/register`  
  - Admin: `POST /admin/register` (requires organization code)  
  - Registration page has tabs for user/admin.

### User Dashboard
- **Profile:**  
  - Fetches user info from `GET /user/profile` (token required).
- **Submit Complaint:**  
  - Uses `POST /user/complaint` with complaint details (token required).
- **View Complaints:**  
  - User sees their submitted complaints (fetched via dashboard logic).

### Admin Dashboard
- **Profile:**  
  - Fetches admin info from `GET /admin/profile` (token required).
- **View All Complaints & Stats:**  
  - Uses `GET /admin/dashboard` (token required, supports filtering by status/priority).
- **Update Complaint Status:**  
  - Uses `PUT /admin/complaint/:id` to change status (Pending, In Progress, Resolved).
- **Delete Complaint:**  
  - Uses `DELETE /admin/complaint/:id`.

### Email Notifications
- Users receive an email when submitting a complaint.
- Admins receive an email when a complaint status is updated.

### Logout
- Clears all session data (token, role, user/admin info) from localStorage.

---

## Example API Usage (Frontend)

- **Login (User):**
  ```js
  fetch('/user/login', { method: 'POST', body: JSON.stringify({ email, password }) })
  ```
- **Register (Admin):**
  ```js
  fetch('/admin/register', { method: 'POST', body: JSON.stringify({ fullName, email, password, companyCode }) })
  ```
- **Submit Complaint:**
  ```js
  fetch('/user/complaint', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify({ title, description, category, priority }) })
  ```
- **Update Complaint Status (Admin):**
  ```js
  fetch(`/admin/complaint/${id}`, { method: 'PUT', headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify({ status }) })
  ```

---
