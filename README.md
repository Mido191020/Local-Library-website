# Express Local Library Tutorial

## Introduction

This is an Express.js application for managing a local library. The application is part of the [Express Tutorial](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs) on MDN.

## Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/express-locallibrary-tutorial-mine.git
   cd express-locallibrary-tutorial-mine
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env` file in the root directory with the following variables:
   ```env
   DB_CONNECTION=<your_database_connection_string>
   ```

4. **Start the Application:**
   ```bash
   npm start
   ```

5. **Access the Application:**
   Open your web browser and navigate to:
   ```
   http://localhost:3000
   ```

## Known Issues

- When you click on any genre link (property), you get a 404 error with the message "NotFoundError: Not Found".
- Despite following various troubleshooting steps, this issue persists.

## Troubleshooting Steps Taken

1. Moved the catch-all route handler to the end of the `app.js` file, after all other route definitions.
2. Mounted the routes in the correct order, ensuring that the `catalogRouter` is mounted before the catch-all route handler.
3. Checked the `error.pug` file, which is rendering the error message, status code, and stack trace correctly.
4. Verified the database connection code and ensured that the application is connecting to the database successfully.
5. Reviewed the middleware setup and route definitions for any conflicts or issues.
6. Checked the URL being accessed and added logging statements to ensure that the relevant route handlers are being hit correctly.
7. Reviewed external dependencies and libraries for any potential conflicts or issues.

## Additional Information

I am working on the Express Tutorial Part 5: Displaying library data, specifically in the Genre detail page as specified here: [Genre detail page tutorial](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data/Genre_detail_page).

---

