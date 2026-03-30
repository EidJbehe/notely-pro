# 📝 Notely Pro - Note Taking API

A powerful and clean REST API for managing notes, built with Node.js and Express.
This project demonstrates core backend concepts including CRUD operations, middleware usage, and API design best practices.

---

## 🚀 Features

* ➕ Create notes
* 📄 Get all notes
* 🔍 Search notes
* ✏️ Edit notes
* 🗑️ Delete notes
* 📊 Sort notes (ascending & descending)
* 📚 Pagination support
* ⚙️ Middleware (validation, logging, error handling)

---

## 🛠️ Tech Stack

* Node.js
* Express.js

---

## 📁 Project Structure

```
notely-pro/
│
├── controllers/
│   └── notesController.js
│
├── routes/
│   └── notes.js
│
├── middleware/
│   ├── logger.js
│   ├── validateNote.js
│   ├── notFound.js
│   └── errorHandler.js
│
├── data/
│   └── notes.js
│
├── server.js
├── package.json
└── README.md
```

---

## ▶️ Getting Started

### 1. Clone the repository

```
git clone https://github.com/YOUR_USERNAME/notely-pro.git
cd notely-pro
```

### 2. Install dependencies

```
npm install
```

### 3. Run the server

```
npm start
```

Server will run on:

```
http://localhost:3000
```

---

## 📡 API Endpoints

### 📥 Get all notes

```
GET /notes
```

### ➕ Create a note

```
POST /notes
```

Body:

```
{
  "content": "Your note here"
}
```

---

### ✏️ Update a note

```
PUT /notes/:id
```

---

### 🗑️ Delete a note

```
DELETE /notes/:id
```

---

## 🔍 Query Parameters

### Search

```
/notes?search=hello
```

### Sort

```
/notes?sort=asc
/notes?sort=desc
```

### Pagination

```
/notes?page=1&limit=5
```

---

## ⚠️ Error Handling

All errors return structured responses:

```
{
  "success": false,
  "message": "Error message"
}
```

---

## 🧪 Example Request

```
curl "http://localhost:3000/notes?search=note&sort=desc&page=1&limit=5"
```

---

## 📌 Future Improvements

* Add database integration (MongoDB)
* Add authentication & user accounts
* Build a frontend interface

---

## 👩‍💻 Author

Eid Jbehe

---
CI test
retry cicd
retry cicd
