# 📚 Library Tracker

A sleek and modern **Library Tracker** web application built with the **MERN stack**. It allows users to manage their personal digital library, track reading status, upload book covers and PDFs, and access their data securely via OTP-based login.

check it on -> https://frontend-library-eight.vercel.app

---

## ✨ Features

- 📩 **OTP-based Authentication** for secure login
- ➕ **Add Books** with title, author, genre, and status
- 🖼️ **Upload Book Covers** (optional)
- 📄 **Upload PDF Files** of books (optional)
- 🔍 **Search by Title/Author**
- 🎯 **Filter by Reading Status**: To Read, Reading, Read
- 👩‍💼 **Dashboard** for user book management
- 🎨 **Beautiful UI** with Framer Motion animations and soft pastel colors

---

## 🧰 Tech Stack

| Frontend | Backend | Database | Styling |
|----------|---------|----------|---------|
| React.js | Node.js + Express.js | MongoDB | CSS + Framer Motion |

---

## 🗂️ Project Structure
library-tracker/
├── client/
│ ├── pages/
│ ├── components/
│ ├── styles/
│ └── App.js
│
├── server/
│ ├── routes/
│ ├── controllers/
│ ├── models/
│ ├── middleware/
│ └── services/
│
├── uploads/ # for book images and PDFs
└── .env



## ⚙️ Setup Instructions

### ✅ Prerequisites

- Node.js & npm
- MongoDB Atlas account
- Verified email for OTP (e.g., Gmail with app password)

---

### 🔧 Backend Setup

```bash
cd server
npm install
