// const createError = require("http-errors");
// const express = require("express");
// const path = require("path");
// const cookieParser = require("cookie-parser");
// const logger = require("morgan");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// dotenv.config({ path: "./config.env" });

// // Import route files
// const booksRouter = require("./routes/booksRoutes");
// const authorsRouter = require("./routes/authorsRoutes");
// const genresRouter = require("./routes/genresRoutes");
// const bookInstancesRouter = require("./routes/bookinstancesRoutes");
// const homePage = require("./routes/index");
// const catalogRouter = require("./routes/catalog");
// const app = express();

// // Mount route files
// app.use("/books", booksRouter);
// app.use("/authors", authorsRouter);
// app.use("/genres", genresRouter);
// app.use("/bookinstances", bookInstancesRouter);
// app.use("/", homePage);
// app.use("/catalog", catalogRouter);

// //DB conection
// mongoose.set("strictQuery", false);
// const DB = process.env.DATABASE;
// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("DB connection successful!");
//   })
//   .catch((err) => {
//     console.error("DB connection failed:", err);
//   });

// // view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");

// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

// module.exports = app;
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// Import route files
const booksRouter = require("./routes/booksRoutes");
const authorsRouter = require("./routes/authorsRoutes");
const genresRouter = require("./routes/genresRoutes");
const bookInstancesRouter = require("./routes/bookinstancesRoutes");
const homePage = require("./routes/index");
const catalogRouter = require("./routes/catalog");

const app = express();

// Winston logger configuration
const winston = require("winston");
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
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
  logger.info(`Request URL: ${req.url}`);
  logger.info(`Request Method: ${req.method}`);
  next();
});

// Example route logging
app.get("/some-route", (req, res, next) => {
  logger.info("Some route accessed");
  res.send("Hello, this is some route!");
  // Your route logic
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
    logger.info("DB connection successful!");
  })
  .catch((err) => {
    logger.error("DB connection failed:", err);
  });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // Log the error using Winston
  logger.error(`Error: ${err.message}`);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
