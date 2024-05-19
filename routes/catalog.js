const express = require("express");
const router = express.Router();

// Import route handlers for different resources
const booksRouter = require("./booksRoutes");
const bookController = require("../Controllers/bookController");
const authorsRouter = require("./authorsRoutes");
const genresRouter = require("./genresRoutes");
const bookInstancesRouter = require("./bookinstancesRoutes");

console.log("Catalog routes are being set up");

// Mount routes for each resource
router.get("/", bookController.index);
router.use(
  "/books",
  (req, res, next) => {
    console.log("Books route hit");
    next();
  },
  booksRouter
);
router.use(
  "/authors",
  (req, res, next) => {
    console.log("Authors route hit");
    next();
  },
  authorsRouter
);
router.use(
  "/genres",
  (req, res, next) => {
    console.log("Genres route hit");
    next();
  },
  genresRouter
);
router.use(
  "/bookinstances",
  (req, res, next) => {
    console.log("BookInstances route hit");
    next();
  },
  bookInstancesRouter
);

module.exports = router;
