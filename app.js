const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const createError = require("http-errors");
const dotenv = require("dotenv");
const winston = require("winston");
const session = require("express-session");
const flash = require("connect-flash");

dotenv.config({ path: "./config.env" });

// Import route files
const booksRouter = require("./routes/booksRoutes");
const authorsRouter = require("./routes/authorsRoutes");
const genresRouter = require("./routes/genresRoutes");
const bookInstancesRouter = require("./routes/bookinstancesRoutes");
const homePage = require("./routes/index");
const catalogRouter = require("./routes/catalog");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

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

// Middleware setup
app.use(morgan("dev")); // HTTP request logger middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Set up express-session and connect-flash
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// Mount route files
app.use("/catalog/books", booksRouter);
app.use("/catalog/authors", authorsRouter);
app.use("/catalog/genres", genresRouter);
app.use("/catalog/bookinstances", bookInstancesRouter);
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
