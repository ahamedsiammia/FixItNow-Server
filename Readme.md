# 🔧 FixItNow Backend API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![SSLCommerz](https://img.shields.io/badge/SSLCommerz-Payment-green?style=for-the-badge)

A scalable and production-ready backend API for **FixItNow**, a modern home service marketplace where customers can easily find trusted technicians, book home services, make secure online payments, and leave reviews after successful job completion.

The backend follows a **RESTful API architecture**, modular code structure, secure authentication, role-based authorization, and industry best practices to ensure scalability, maintainability, and performance.

---

# 📑 Table of Contents

- Project Overview
- Features
- AI Chatbot
- Tech Stack
- User Roles
- Project Structure
- API Endpoints

---

# 🚀 Project Overview

FixItNow connects customers with professional home service providers.

Customers can browse available services, hire experienced technicians, securely pay online through **SSLCommerz**, monitor booking progress, and submit reviews after successful service completion.

Technicians can manage their professional profiles, create services, update availability, and handle customer bookings.

Administrators manage users, service categories, bookings, and overall platform activities.

---

## Backend Live url 
https://fix-it-now-weld.vercel.app

## Frontend Live url 
https://fix-it-now-frontend-liard.vercel.app

# ✨ Features

## 🔐 Authentication & Authorization

- JWT Authentication
- Secure Password Hashing (bcrypt)
- Role Based Authorization
- Protected Routes
- Current User Profile API
- Refresh Token Support
- Cookie-based Authentication

---

## 👤 Customer Features

- Register & Login
- Browse Services
- Search Services
- Filter Services
- View Technician Profiles
- Book Home Services
- Track Booking Status
- Secure Online Payment
- View Payment History
- Leave Reviews
- Update Profile

---

## 🛠 Technician Features

- Register & Login
- Create Technician Profile
- Manage Skills
- Manage Experience
- Manage Pricing
- Manage Services
- Set Availability
- Accept Bookings
- Decline Bookings
- Start Job
- Complete Job

---

## 👨‍💼 Admin Features

- Dashboard Overview
- View All Users
- Ban / Unban Users
- Manage Categories
- Manage Bookings
- Platform Monitoring
- User Management

---

## 📂 Service Features

- Service Categories
- Search Services
- Filter by Category
- Filter by Location
- Filter by Rating
- Filter by Price
- Pagination
- Sorting

---

## 📅 Booking Features

- Create Booking
- View Booking
- Booking History
- Cancel Booking
- Booking Status Tracking

Booking Status

- REQUESTED
- ACCEPTED
- DECLINED
- PAID
- IN_PROGRESS
- COMPLETED
- CANCELLED

---

## 💳 Payment Features

Payment Gateway

**SSLCommerz**

Features

- Secure Online Payment
- Payment Session
- Payment Verification
- Success Callback
- Failed Callback
- Cancel Callback
- Transaction Tracking
- Payment History

---

## ⭐ Review Features

- Technician Ratings
- Customer Reviews
- Review History
- Average Rating

---

## 🛡 Security Features

- JWT Authentication
- bcrypt Password Hashing
- Input Validation
- Global Error Handler
- Role Authorization
- Secure Cookies
- CORS Configuration
- Environment Variables
- Structured Error Responses

---

# 🤖 AI Chatbot

FixItNow includes an **AI-powered chatbot** that helps users quickly find information and navigate the platform.

### AI Features

- Instant Customer Support
- Smart Home Service Recommendations
- Booking Guidance
- Platform Navigation Assistance
- Frequently Asked Questions
- Natural Language Conversations
- Quick Response Generation
- User Friendly Interaction

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js
- TypeScript

## Database

- PostgreSQL
- Prisma ORM

## Authentication

- JWT
- bcrypt

## Payment Gateway

- SSLCommerz

## AI

- AI Chatbot Assistant

## Deployment

- Vercel

---

# 👥 User Roles

## 👤 Customer

- Browse Services
- Book Technicians
- Make Payments
- Track Booking
- Leave Reviews

---

## 👨‍🔧 Technician

- Manage Profile
- Create Services
- Update Availability
- Accept Bookings
- Complete Jobs

---

## 👨‍💼 Admin

- Manage Users
- Manage Categories
- Manage Bookings
- Monitor Platform

---

# 📁 Project Structure

```text
src
│
├── app
│   ├── modules
│   │
│   ├── auth
│   ├── user
│   ├── technician
│   ├── category
│   ├── service
│   ├── booking
│   ├── payment
│   ├── review
│   ├── chatbot
│   └── admin
│
├── middlewares
├── interfaces
├── helpers
├── utils
├── routes
├── config
├── errors
│
├── prisma
│
├── app.ts
└── server.ts
```

---

# 🌐 API Endpoints

> **Note:** These endpoints represent the core API of the application. Additional endpoints may be added based on implementation requirements.

---

# 🔐 Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register a new Customer or Technician |
| POST | `/api/auth/login` | Login user and generate JWT token |
| POST | `/api/auth/logout` | Logout authenticated user |
| POST | `/api/auth/refresh-token` | Generate new access token |
| GET | `/api/auth/me` | Get current authenticated user |

---

# 🛠 Services

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/services` | Get all available services |
| GET | `/api/services/:id` | Get single service details |
| GET | `/api/categories` | Get all service categories |

---

# 👨‍🔧 Technicians

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/technicians` | Get all technicians |
| GET | `/api/technicians/:id` | Get technician profile |
| PUT | `/api/technician/profile` | Update technician profile |
| PUT | `/api/technician/availability` | Update availability schedule |
| POST | `/api/technician/services` | Create new service |
| PATCH | `/api/technician/services/:id` | Update existing service |
| DELETE | `/api/technician/services/:id` | Delete service |
| GET | `/api/technician/bookings` | Get technician bookings |
| PATCH | `/api/technician/bookings/:id` | Accept, Decline or Complete booking |

---

# 📅 Bookings

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/bookings` | Create new booking |
| GET | `/api/bookings` | Get authenticated user's bookings |
| GET | `/api/bookings/:id` | Get booking details |
| PATCH | `/api/bookings/:id/cancel` | Cancel booking before IN_PROGRESS |

---

# 💳 Payments (SSLCommerz)

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/payments/create` | Create SSLCommerz payment session |
| POST | `/api/payments/success` | Payment success callback |
| POST | `/api/payments/fail` | Payment failure callback |
| POST | `/api/payments/cancel` | Payment cancel callback |
| POST | `/api/payments/confirm` | Verify completed payment |
| GET | `/api/payments` | Get payment history |
| GET | `/api/payments/:id` | Get payment details |

---

# ⭐ Reviews

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/reviews` | Create review after completed job |
| GET | `/api/reviews/:technicianId` | Get technician reviews |

---

# 👨‍💼 Admin

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/admin/dashboard` | Get dashboard overview |
| GET | `/api/admin/users` | Get all users |
| PATCH | `/api/admin/users/:id` | Ban or Unban user |
| GET | `/api/admin/bookings` | Get all bookings |
| GET | `/api/admin/categories` | Get all categories |
| POST | `/api/admin/categories` | Create service category |
| PATCH | `/api/admin/categories/:id` | Update category |
| DELETE | `/api/admin/categories/:id` | Delete category |

---
# 🗄 Database Models

The database is designed using **PostgreSQL** with **Prisma ORM** following proper relationships and normalization.

---

## 👤 Users

| Field | Type | Description |
|------|------|-------------|
| id | String | Unique User ID |
| name | String | Full Name |
| email | String | User Email |
| password | String | Hashed Password |
| role | Enum | CUSTOMER / TECHNICIAN / ADMIN |
| status | Enum | ACTIVE / BLOCKED |
| phone | String | Contact Number |
| profileImage | String | Profile Picture |
| createdAt | DateTime | Account Creation Time |
| updatedAt | DateTime | Last Update Time |

---

## 👨‍🔧 Technician Profiles

| Field | Type | Description |
|------|------|-------------|
| id | String | Profile ID |
| userId | String | Reference to User |
| bio | String | Technician Bio |
| experience | Number | Years of Experience |
| skills | String[] | Technician Skills |
| location | String | Working Area |
| hourlyRate | Float | Service Charge |
| averageRating | Float | Average Rating |

---

## 📂 Categories

| Field | Type | Description |
|------|------|-------------|
| id | String | Category ID |
| name | String | Category Name |
| icon | String | Category Icon |
| createdAt | DateTime | Created Time |

---

## 🛠 Services

| Field | Type | Description |
|------|------|-------------|
| id | String | Service ID |
| technicianId | String | Service Owner |
| categoryId | String | Service Category |
| title | String | Service Title |
| description | String | Description |
| price | Float | Service Price |
| location | String | Service Area |
| createdAt | DateTime | Created Time |

---

## 📅 Bookings

| Field | Type | Description |
|------|------|-------------|
| id | String | Booking ID |
| customerId | String | Customer |
| technicianId | String | Technician |
| serviceId | String | Selected Service |
| bookingDate | Date | Booking Date |
| bookingTime | String | Booking Time |
| address | String | Service Address |
| notes | String | Additional Notes |
| status | Enum | Booking Status |

---

## 💳 Payments

| Field | Type | Description |
|------|------|-------------|
| id | String | Payment ID |
| bookingId | String | Booking Reference |
| transactionId | String | SSLCommerz Transaction ID |
| amount | Float | Payment Amount |
| provider | String | SSLCommerz |
| status | Enum | Pending / Completed / Failed |
| paidAt | DateTime | Payment Time |

---

## ⭐ Reviews

| Field | Type | Description |
|------|------|-------------|
| id | String | Review ID |
| bookingId | String | Booking Reference |
| customerId | String | Customer |
| technicianId | String | Technician |
| rating | Number | Rating |
| comment | String | Review |
| createdAt | DateTime | Review Time |

---

# 🔗 Database Relationships

```
User
│
├── TechnicianProfile
│
├── Bookings (Customer)
│
├── Bookings (Technician)
│
└── Reviews

Category
│
└── Services

Service
│
└── Booking

Booking
│
├── Payment
│
└── Review
```

---

# 🔄 Booking Workflow

```
Customer Registration
        │
        ▼
Browse Services
        │
        ▼
View Technician Profile
        │
        ▼
Create Booking
        │
        ▼
Booking Status → REQUESTED
        │
        ▼
Technician Accepts
        │
        ▼
Booking Status → ACCEPTED
        │
        ▼
Customer Makes Payment
        │
        ▼
Booking Status → PAID
        │
        ▼
Technician Starts Job
        │
        ▼
Booking Status → IN_PROGRESS
        │
        ▼
Technician Completes Job
        │
        ▼
Booking Status → COMPLETED
        │
        ▼
Customer Leaves Review
```

---

# 💳 SSLCommerz Payment Workflow

```
Customer Creates Booking
            │
            ▼
Technician Accepts Booking
            │
            ▼
Create SSLCommerz Session
            │
            ▼
Redirect to SSLCommerz Gateway
            │
            ▼
Payment Success / Fail / Cancel
            │
            ▼
Payment Verification
            │
            ▼
Store Transaction Information
            │
            ▼
Update Booking Status
            │
            ▼
Payment Completed
```

---

# 🤖 AI Chatbot Workflow

```
User
 │
 ▼
Ask Question
 │
 ▼
AI Chatbot
 │
 ▼
Analyze User Query
 │
 ▼
Generate Smart Response
 │
 ▼
Return Helpful Answer
```

### AI Chatbot Features

- AI-powered conversational assistant
- Smart service recommendations
- Booking assistance
- Platform guidance
- Instant customer support
- Frequently asked questions
- Natural language interaction

---

# 🔒 Authentication & Authorization

- JWT Authentication
- Role Based Authorization
- Protected Routes
- Secure Password Hashing
- HTTP Only Cookies
- Refresh Token Support

---

# 🛡 Security Features

- JWT Authentication
- bcrypt Password Hashing
- Input Validation
- Global Error Handling
- CORS Protection
- Environment Variables
- Cookie Parser
- Role Based Middleware
- Structured Error Responses

---

# ✅ Success Response Format

```json
{
  "success": true,
  "message": "Request completed successfully.",
  "data": {}
}
```

---

# ❌ Error Response Format

```json
{
  "success": false,
  "message": "Validation Error",
  "errorDetails": {
    "field": "Required field is missing"
  }
}
```

---

# 📄 API Documentation

API documentation is available through:

- Postman Collection

The documentation includes:

- Authentication APIs
- Service APIs
- Booking APIs
- Payment APIs
- Review APIs
- Admin APIs
- Request Examples
- Response Examples
- Error Responses

---

# 🚀 Future Improvements

- 🔔 Real-time Notifications
- 📧 Email Notifications
- 📱 SMS Notifications
- 💬 Real-time Chat
- 📍 Live Technician Tracking
- ☁️ Cloudinary Image Upload
- ⭐ Advanced Recommendation System
- 📊 Admin Analytics Dashboard
- 📈 Technician Earnings Dashboard
- 🎟 Coupon & Discount System
- ❤️ Wishlist Feature
- 🌍 Multi-language Support
- 📱 Mobile API Optimization
- ⚡ Redis Caching
- 🐳 Docker Support
- 🔄 CI/CD Pipeline
- 🧪 Unit & Integration Testing
- 📑 Swagger/OpenAPI Documentation

---

# 👨‍💻 Developer

**Siam Ahamed**

Full Stack Developer

### Connect With Me

- 💼 LinkedIn: https://www.linkedin.com/in/siam-ahamed/
- 💻 GitHub: https://github.com/ahamedsiammia

---

# ⭐ If you like this project

Give this repository a ⭐ on GitHub if you found it useful.

---

## 📜 License

This project is developed for educational purposes as part of the **Programming Hero Level-2 Backend Assignment**.

© 2026 Siam Ahamed. All Rights Reserved.