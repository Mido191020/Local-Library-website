const Genre = require("../models/genre");
const Book = require("../models/book");
const mongoose = require("mongoose");

const asyncHandler = require("express-async-handler");

// Display list of all Genre.
exports.genre_list = asyncHandler(async (req, res, next) => {
  const allGenre = await Genre.find().sort({ name: 1 }).exec();
  res.render("genre_list", { title: "Genre list", genre_list: allGenre });
});

// Display detail page for a specific Genre.
exports.genre_detail = asyncHandler(async (req, res, next) => {
  //   const [genre, booksInGenre] = await Promise.all([
  //     Genre.findById(req.params.id).exec(),
  //     Book.find({ genre: req.params.id }, "title summary").exec(),
  //   ]);
  //   if (genre === null) {
  //     const err = new Error("Genre not found");
  //     err.status = 404;
  //     return next(err);
  //   }
  //   res.render("genere_detail", {
  //     title: "Genre Detail",
  //     genre: genre,
  //     genre_books: booksInGenre,
  //   });

  //last option
  const genreId = req.params.id.toString();

  if (!mongoose.Types.ObjectId.isValid(genreId)) {
    const err = new Error("Invalid Genre ID");
    err.status = 400; // Bad Request
    return next(err);
  }

  // Fetch genre details and associated books in parallel
  const [genre, booksInGenre] = await Promise.all([
    Genre.findById(genreId).exec(),
    Book.find({ genre: genreId }, "title summary").exec(),
  ]);

  // If genre is not found, create an error and pass it to the next middleware
  if (genre === null) {
    const err = new Error("Genre not found");
    err.status = 404; // Not Found
    return next(err);
  }

  // Render the genre_detail view with the fetched data
  res.render("genre_detail", {
    title: "Genre Detail",
    genre: genre,
    genre_books: booksInGenre,
  });
});

// Display Genre create form on GET.
exports.genre_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre create GET");
});

// Handle Genre create on POST.
exports.genre_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre create POST");
});

// Display Genre delete form on GET.
exports.genre_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete GET");
});

// Handle Genre delete on POST.
exports.genre_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete POST");
});

// Display Genre update form on GET.
exports.genre_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update GET");
});

// Handle Genre update on POST.
exports.genre_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update POST");
});
