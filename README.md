<div align="center">
  <h1>📚 Local Library Management System</h1>
  <p><strong>A robust, Server-Side Rendered (SSR) Node.js application implementing a rigorous Model-View-Controller (MVC) architecture for digital cataloging and inventory management.</strong></p>

  <!-- Badges -->
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Pug-A86454?style=for-the-badge&logo=pug&logoColor=white" alt="Pug" />
</div>

<br />

## 📖 Executive Summary
The Local Library application is an enterprise-grade web system designed to handle the complex relational data involved in library inventory logistics. It serves as a comprehensive system mapping Authors, Books, distinct Genres, and physical Book Instances across a database structure. 

The application is heavily defensively programmed, featuring strict middleware form sanitation and centralized asynchronous error handling to prevent event-loop blocking.

---

## 🏗️ System Architecture

This project natively implements the **Model-View-Controller (MVC)** design pattern using plain JavaScript, physically separated by modular directories.

```text
 Client Browser
      |    ^
      |    | GET View / POST Forms
      v    |
 Express Web Server (Node.js)
  [Middleware: Morgan Logging, Session State, Form Validators]
      |
      v
 Router Engine (/routes) ───[ URL Parsing & Delegation ]──┐
      |                                                   |
      |                                                   v
      |            Controllers (/Controllers) ───[ Async Business Logic ]
      |               |             |
      |               |             | (Perform CRUD & Return JSON Data)
      |               v             v
      |           MongoDB ODM (/models)
      |         [ Mongoose Schema Rules ]
      |
      V
 View Engine (/views)
      └───[ Pug Template Compilation ]───> (Injects Data into HTML)
```

---

## ⚡ Core Engineering Features

### 1. Robust Relational Data Modeling
Built using **Mongoose ODM**, the application abstracts complex `MongoDB` foreign keys into deeply nested relationships. Using Mongoose's `.populate()` functionality, a single query can intelligently join and serialize an Author, all of their written Books, and the physical availability status of every single copy in the library.

### 2. Defensive Security & Data Sanitation
Every single API endpoint that accepts POST data is fronted by the `express-validator` middleware stack natively protecting the server:
- **XSS Mitigation:** Inputs are aggressively sanitized using `.escape()` to strip malicious HTML/JavaScript tags before they touch the database.
- **Data Trimming:** Enforces `.trim()` to prevent database bloat from invisible whitespace submissions.

### 3. Asynchronous Non-Blocking Controllers
Database communication is handled seamlessly via `express-async-handler`. This heavily optimizes the codebase by replacing massive `try-catch` trees with native Promise delegation, ensuring that heavy database queries never block the Node.js main event loop.

### 4. Dual-Target Enterprise Logging
To graduate from standard `console.log()` behavior, the Express server integrates a unified **Winston** logging pipeline. 
* HTTP activity is tracked globally using **Morgan**.
* System logs are separated using Winston Streams: `error.log` catches and timestamps critical faults, while `combined.log` retains the rolling history of all operations.

---

## 💻 Tech Stack

* **Runtime:** Node.js
* **Backend Framework:** Express.js `^4.19`
* **Database:** MongoDB
* **Object-Document Mapper:** Mongoose `^8.3`
* **Template Engine:** Pug `^3.0`
* **Session Management:** `express-session` paired with `connect-flash` for contextual UI alerts.

---

## 🚀 Local Development Setup

To run this server locally, you must have Node.js and access to a MongoDB instance (local or Atlas Cluster).

### 1. Clone the Source
```bash
git clone https://github.com/Mido191020/Local-Library-website.git
cd Local-Library-website
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Server Configuration
Create a `config.env` file in the root directory and define your MongoDB URI:
```env
DATABASE=mongodb+srv://<username>:<password>@cluster.mongodb.net/library?retryWrites=true&w=majority
```

### 4. Boot the Server
```bash
npm start
# OR for live-reloading:
npm run serverstart
```
*The Express server binds to port `3000` by default. Browse to `http://localhost:3000`.*

---

## 📝 CV / Resume Export
> *Developed a robust server-side rendered (SSR) web application utilizing a Node.js/Express MVC architecture and MongoDB to engineer a scalable digital library inventory system. Implemented rigorous data sanitization via `express-validator` to mitigate XSS vulnerabilities, integrated Winston file stream loggers for audit tracking, and designed dynamic relational data abstractions via Mongoose to rapidly construct complete CRUD functionality for books, authors, and physical instances.*
