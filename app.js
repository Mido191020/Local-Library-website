const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const createError = require("http-errors");
const dotenv = require("dotenv");
const winston = require("winston");

dotenv.config({ path: "./config.env" });

// Import route files
const booksRouter = require("./routes/booksRoutes");
const authorsRouter = require("./routes/authorsRoutes");
const genresRouter = require("./routes/genresRoutes");
const bookInstancesRouter = require("./routes/bookinstancesRoutes");
const homePage = require("./routes/index");
const catalogRouter = require("./routes/catalog");

const app = express();

// Configure Winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

// Log incoming requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Mount route files
app.use("/books", booksRouter);
app.use("/authors", authorsRouter);
app.use("/genres", genresRouter);
app.use("/bookinstances", bookInstancesRouter);
app.use("/", homePage);
app.use("/catalog", catalogRouter);

// DB connection
mongoose.set("strictQuery", false);
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("MongoDB connected successfully!");
  })
  .catch((err) => {
    logger.error(`MongoDB connection error: ${err.message}`);
  });

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middleware setup
app.use(morgan("dev")); // HTTP request logger middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Log error
  logger.error(`Error: ${err.message}`);

  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
