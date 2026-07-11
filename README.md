# ☕ Brew Haven – AI Powered Coffee Ordering System

<p align="center">
  <img src="https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=java"/>
  <img src="https://img.shields.io/badge/SpringBoot-4.0-green?style=for-the-badge&logo=springboot"/>
  <img src="https://img.shields.io/badge/MySQL-8-blue?style=for-the-badge&logo=mysql"/>
  <img src="https://img.shields.io/badge/Ollama-Gemma3:4B-black?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Razorpay-Payment-success?style=for-the-badge"/>
</p>

---

# 📌 Project Overview

**Brew Haven** is an AI-powered Coffee Ordering Web Application developed using **Spring Boot, Java, MySQL, HTML, CSS, and JavaScript**.

The platform provides a modern coffee ordering experience with secure authentication, online payments, live order tracking, GPS location support, and an integrated **offline AI Coffee Assistant powered by Ollama Gemma3:4B**, making it completely independent of paid AI APIs.

---

# ✨ Features

## 👤 User Module

- User Registration
- Secure Login (BCrypt Password Encryption)
- JWT Authentication
- Forgot Password via Email OTP
- Browse Coffee Menu
- Add to Cart
- Checkout
- Download PDF Bill
- View Order History
- GPS Location Support
- AI Coffee Assistant

---

## 👨‍💼 Admin Module

- Admin Login
- Dashboard
- Total Users
- Total Orders
- Total Revenue
- View All Users
- Manage Orders
- Update Order Status

---

## 🤖 AI Coffee Assistant

Integrated with

- Ollama
- Gemma3:4B

The AI Assistant can answer questions related to

- Coffee Types
- Brewing Methods
- Coffee Recommendations
- Caffeine Information
- Brew Haven Menu Suggestions
- General Coffee Knowledge

No OpenAI API Key required.

Runs completely on your local system.

---

## 🔐 Security

- BCrypt Password Encryption
- Spring Security
- JWT Authentication
- Protected REST APIs
- Email OTP Verification
- Password Reset

---

## 💳 Payment Gateway

Integrated with

- Razorpay Payment Gateway

Features

- Online Payment
- Payment Verification
- Order Confirmation

---

## 📍 GPS Integration

Users can

- Detect Current Location
- Order using GPS
- View Coordinates

---

# 🛠️ Tech Stack

### Backend

- Java 17
- Spring Boot 4
- Spring Security
- Spring Data JPA
- Hibernate
- REST API

### Frontend

- HTML5
- CSS3
- JavaScript

### Database

- MySQL

### AI

- Ollama
- Gemma3:4B

### Payment

- Razorpay

### Email

- Spring Mail

### Authentication

- JWT
- BCrypt

---

# 📂 Project Structure

```
Brew-Haven
│
├── controller
├── service
├── repository
├── model
├── security
├── config
├── static
│     ├── index.html
│     ├── style.css
│     ├── script.js
│     └── images
│
├── resources
│     └── application.properties
│
└── pom.xml
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/YourUsername/Brew-Haven.git
```

---

## Configure Database

Create a MySQL database

```
brewhaven
```

Update

```
application.properties
```

```
spring.datasource.url=jdbc:mysql://localhost:3306/brewhaven
spring.datasource.username=root
spring.datasource.password=yourpassword
```

---

## Start Ollama

Install Ollama

Pull Gemma Model

```bash
ollama pull gemma3:4b
```

Run

```bash
ollama run gemma3:4b
```

Ollama Server

```
http://localhost:11434
```

---

## Run Spring Boot

```
Run DemoApplication.java
```

Application

```
http://localhost:8080
```

---

# 📸 Main Modules

- Home Page
- <img width="1920" height="1080" alt="Screenshot (88)" src="https://github.com/user-attachments/assets/7e65d5d1-c2c0-4b5a-a722-671b0f66c1c6" />

- Coffee Menu
- User Dashboard
- Admin Dashboard
- Shopping Cart
- Razorpay Checkout
- GPS Tracking
- AI Coffee Assistant
- Forgot Password (OTP)
- Order History

---

# 📡 REST APIs

## Authentication

```
POST /api/users/register
```

```
POST /api/users/login
```

```
POST /api/users/sendOtp
```

```
POST /api/users/verifyOtp
```

```
POST /api/users/resetPassword
```

---

## Menu

```
GET /api/menu
```

---

## Orders

```
POST /api/orders
```

```
GET /api/orders
```

---

## AI Assistant

```
POST /api/ai/chat
```

---

# 🌟 Highlights

✅ Full Stack Java Project

✅ Secure Authentication

✅ Spring Security

✅ JWT Login

✅ BCrypt Encryption

✅ Forgot Password using OTP

✅ Razorpay Integration

✅ PDF Bill Generation

✅ GPS Based Ordering

✅ Admin Analytics Dashboard

✅ Offline AI Assistant using Ollama

✅ Responsive UI

---

# 🎯 Future Enhancements

- Voice Enabled AI Assistant
- Coffee Recommendation System
- AI Order Prediction
- Customer Reviews
- Admin Sales Analytics
- Live Order Tracking
- Docker Deployment
- Cloud Deployment (AWS)

---

# 👩‍💻 Developed By

**Jyoti Bairagi**

Computer Science Student | Full Stack Java Developer | MERN Stack Developer | AI Enthusiast

---

# ⭐ Support

If you found this project useful, don't forget to

⭐ Star this repository

🍴 Fork the repository

📢 Share it with others

---

> **"Brewing great coffee with intelligent technology." ☕🤖**
