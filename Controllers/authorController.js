// const Author = require("../models/author");
// const asyncHandler = require("express-async-handler");

// // Display list of all Authors.
// // Display list of all Authors.
// exports.author_list = asyncHandler(async (req, res, next) => {
//   const allAuthors = await Author.find().sort({ family_name: 1 }).exec();
//   res.render("author_list", {
//     title: "Author List",
//     author_list: allAuthors,
//   });
// });

// // Display detail page for a specific Author.
// exports.author_detail = asyncHandler(async (req, res, next) => {
//   // Get details of author and all their books (in parallel)
//   const [author, allBooksByAuthor] = await Promise.all([
//     Author.findById(req.params.id).exec(),
//     Book.find({ author: req.params.id }, "title summary").exec(),
//   ]);

//   if (author === null) {
//     // No results.
//     const err = new Error("Author not found");
//     err.status = 404;
//     return next(err);
//   }

//   res.render("author_detail", {
//     title: "Author Detail",
//     author: author,
//     author_books: allBooksByAuthor,
//   });
// });
const Author = require("../models/author");
const Book = require("../models/book");
const asyncHandler = require("express-async-handler");

// Display list of all Authors.
exports.author_list = asyncHandler(async (req, res, next) => {
  console.log("Fetching author list...");
  const allAuthors = await Author.find().sort({ family_name: 1 }).exec();
  console.log("Found authors:", allAuthors);
  res.render("author_list", {
    title: "Author List",
    author_list: allAuthors,
  });
});

// Display detail page for a specific Author.
exports.author_detail = asyncHandler(async (req, res, next) => {
  console.log(`Fetching details for author ${req.params.id}...`);
  const [author, allBooksByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: req.params.id }, "title summary").exec(),
  ]);

  if (author === null) {
    const err = new Error("Author not found");
    err.status = 404;
    console.log(err.message);
    return next(err);
  }

  console.log("Found author:", author);
  console.log("Books by author:", allBooksByAuthor);
  res.render("author_detail", {
    title: "Author Detail",
    author: author,
    author_books: allBooksByAuthor,
  });
});
// exports.author_detail = asyncHandler(async (req, res, next) => {
//   // Get details of author and all their books (in parallel)
//   console.log(`Fetching details for author ${req.params.id}...`);

//   const authorId = req.params.id;

//   try {
//     const [author, authorBooks] = await Promise.all([
//       Author.findById(authorId),
//       Book.find({ author: authorId }, "title summary"),
//     ]);

//     if (!author) {
//       const err = new Error("Author not found");
//       err.status = 404;
//       throw err;
//     }

//     res.render("author_detail", {
//       title: "Author Detail",
//       author: author,
//       author_books: authorBooks,
//     });
//   } catch (err) {
//     // Pass the error to Express error handling middleware
//     return next(err);
//   }
// });
// Display Author create form on GET.
exports.author_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author create GET");
});

// Handle Author create on POST.
exports.author_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author create POST");
});

// Display Author delete form on GET.
exports.author_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author delete GET");
});

// Handle Author delete on POST.
exports.author_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author delete POST");
});

// Display Author update form on GET.
exports.author_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author update GET");
});

// Handle Author update on POST.
exports.author_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author update POST");
});
