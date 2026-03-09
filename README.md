# Local Library Web Application

A full-stack, Server-Side Rendered (SSR) Node.js application that provides a comprehensive digital catalog and book inventory management system. Built using the classical Model-View-Controller (MVC) architecture, the system relies on Express.js for rigorous backend routing and data validation, Pug for dynamic HTML generation, and MongoDB as its persistent data store.

## Architecture

This project strictly adheres to MVC design patterns natively in JavaScript:

* **Models (`/models`)**: Built heavily on Mongoose ODMs to define explicit database relations (e.g., binding Book objects to distinct Author and Genre objects via `ObjectId` references).
* **Views (`/views`)**: Server-side HTML templating via the Pug engine, capable of mapping recursive server data arrays into visually stylized interfaces.
* **Controllers (`/Controllers`)`: Centralized asynchronous business logic housing database queries, data mutations, and validation protocols.

Components are orchestrated via the Express Router tree configured in `/routes`, which delegates URL paths into distinct feature controllers.

## Core Features Implemented

* **Relational Database Browsing**: View deeply nested details using MongoDB `.populate()` techniques, such as reading an Author's profile alongside all of their written Books and respective current inventory status codes (Available, Maintenance, Loaned).
* **Robust CRUD Architecture**: Full creation, reading, updating, and deletion flows for every major DB object (Books, BookInstances, Authors, Genres).
* **Enterprise-Grade Form Validation**: Integrated `express-validator` middleware strictly sanitizes all incoming POST data using `.escape()` to mitigate Cross-Site Scripting (XSS) and automatically kicks back invalid forms carrying specific error descriptors.
* **Flash Event Messaging**: Contextual success or error notifications processed via express sessions.
* **Dual-Target Logging**: Tracks HTTP activity globally using Morgan while piping explicit Server Faults vs Info lines into separate `.log` files via Winston streams.

## Technologies Used

* **Runtime:** Node.js
* **Backend Framework:** Express.js
* **Database:** MongoDB & Mongoose
* **Template Engine:** Pug
* **Utilities:** Async-Handler, Express-Validator, Morgan, Winston

## How to Run Locally

You must have Node.js and an active MongoDB URI instance.

1. Clone the repository:

   ```bash
   git clone https://github.com/Mido191020/Local-Library-website.git
   cd Local-Library-website
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Create the configuration file:
   * Create a `config.env` file in the root.
   * Add your connection string: `DATABASE=mongodb+srv://<user>:<password>@cluster...`

4. Launch the application:

   ```bash
   npm start
   ```

   *The server will boot on `localhost:3000` via `./bin/www`.*

---

## CV Optimized Technical Description

> *Developed a robust server-side rendered (SSR) web application utilizing a Node.js/Express MVC architecture and MongoDB to engineer a scalable digital library inventory system. Implemented rigorous data sanitization via `express-validator` to mitigate XSS vulnerabilities, integrated Winston file stream loggers for audit tracking, and designed dynamic relational data abstractions via Mongoose to rapidly construct complete CRUD functionality for books, authors, and physical instances.*
