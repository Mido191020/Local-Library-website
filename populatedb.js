#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const mongoose = require("mongoose");
const Book = require("./models/book");
const Author = require("./models/author");
const Genre = require("./models/genre");
const BookInstance = require("./models/bookinstance");

const genres = [];
const authors = [];
const books = [];
const bookinstances = [];

mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createGenres();
  await createAuthors();
  await createBooks();
  await createBookInstances();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function genreCreate(index, name) {
  const genre = new Genre({ name: name });
  await genre.save();
  genres[index] = genre;
  console.log(`Added genre: ${name}`);
}

async function authorCreate(index, first_name, family_name, d_birth, d_death) {
  const authordetail = { firstName: first_name, familyName: family_name };
  if (d_birth != false) authordetail.date_of_birth = d_birth;
  if (d_death != false) authordetail.date_of_death = d_death;

  const author = new Author(authordetail);

  await author.save();
  authors[index] = author;
  console.log(`Added author: ${first_name} ${family_name}`);
}

async function bookCreate(index, title, summary, isbn, author, genre) {
  const bookdetail = {
    title: title,
    summary: summary,
    author: author,
    isbn: isbn,
  };
  if (genre != false) bookdetail.genre = genre;

  const book = new Book(bookdetail);
  await book.save();
  books[index] = book;
  console.log(`Added book: ${title}`);
}

async function bookInstanceCreate(index, book, imprint, due_back, status) {
  const bookinstancedetail = {
    book: book,
    imprint: imprint,
  };
  if (due_back != false) bookinstancedetail.due_back = due_back;
  if (status != false) bookinstancedetail.status = status;

  const bookinstance = new BookInstance(bookinstancedetail);
  await bookinstance.save();
  bookinstances[index] = bookinstance;
  console.log(`Added bookinstance: ${imprint}`);
}

async function createGenres() {
  console.log("Adding genres");
  await Promise.all([
    genreCreate(0, "Science Fiction"),
    genreCreate(1, "Fantasy"),
    genreCreate(2, "Mystery"),
    genreCreate(3, "Historical Fiction"),
    genreCreate(4, "Biography"),
  ]);
}

async function createAuthors() {
  console.log("Adding authors");
  await Promise.all([
    authorCreate(0, "Isaac", "Asimov", "1920-01-02", "1992-04-06"),
    authorCreate(1, "J.K.", "Rowling", "1965-07-31", false),
    authorCreate(2, "Agatha", "Christie", "1890-09-15", "1976-01-12"),
    authorCreate(3, "Hilary", "Mantel", "1952-07-06", "2022-09-22"),
    authorCreate(4, "Michelle", "Obama", "1964-01-17", false),
  ]);
}

async function createBooks() {
  console.log("Adding Books");
  await Promise.all([
    bookCreate(
      0,
      "Foundation",
      "The first book in Asimov's classic series chronicles the collapse of the Galactic Empire and the establishment of the Foundation, a group tasked with preserving human knowledge.",
      "9780553293357",
      authors[0],
      [genres[0]]
    ),
    bookCreate(
      1,
      "Harry Potter and the Philosopher's Stone",
      "Harry Potter's life is miserable with the Dursleys until he receives a letter that will change his life forever. He is invited to attend Hogwarts School of Witchcraft and Wizardry.",
      "9780747532699",
      authors[1],
      [genres[1]]
    ),
    bookCreate(
      2,
      "Murder on the Orient Express",
      "Just after midnight, a snowdrift stops the Orient Express in its tracks. An American tycoon lies dead in his compartment, stabbed a dozen times, his door locked from the inside. Isolated by the storm, detective Hercule Poirot must find the killer among a dozen of the dead man's enemies.",
      "9780007119318",
      authors[2],
      [genres[2]]
    ),
    bookCreate(
      3,
      "Wolf Hall",
      "England in the 1520s is a heartbeat from disaster. If the king dies without a male heir, the country could be destroyed by civil war. Henry VIII wants to annul his marriage of twenty years and marry Anne Boleyn. The pope and most of Europe opposes him. Into this impasse steps Thomas Cromwell.",
      "9780007230204",
      authors[3],
      [genres[3]]
    ),
    bookCreate(
      4,
      "Becoming",
      "In her memoir, Michelle Obama invites readers into her world, chronicling the experiences that have shaped her—from her childhood on the South Side of Chicago to her years as an executive balancing the demands of motherhood and work, to her time spent at the world's most famous address.",
      "9781524763138",
      authors[4],
      [genres[4]]
    ),
  ]);
}

async function createBookInstances() {
  console.log("Adding Book Instances");
  await Promise.all([
    bookInstanceCreate(
      0,
      books[0],
      "Bantam Spectra, 1991.",
      false,
      "Available"
    ),
    bookInstanceCreate(1, books[1], "Bloomsbury, 1997.", false, "Loaned"),
    bookInstanceCreate(
      2,
      books[1],
      "Scholastic, 1998.",
      "2024-07-31",
      "Available"
    ),
    bookInstanceCreate(
      3,
      books[2],
      "William Collins, 2017.",
      false,
      "Available"
    ),
    bookInstanceCreate(4, books[3], "4th Estate, 2009.", false, "Maintenance"),
    bookInstanceCreate(
      5,
      books[4],
      "Crown Publishing, 2018.",
      false,
      "Available"
    ),
    bookInstanceCreate(6, books[4], "Penguin Books, 2021.", false, "Available"),
  ]);
}
// //#!/usr/bin/env node

// console.log(
//   'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
// );

// // Get arguments passed on command line
// const userArgs = process.argv.slice(2);

// const mongoose = require("mongoose");
// const Book = require("./models/book");
// const Author = require("./models/author");
// const Genre = require("./models/genre");
// const BookInstance = require("./models/bookinstance");

// const genres = [];
// const authors = [];
// const books = [];
// const bookinstances = [];

// mongoose.set("strictQuery", false);

// const mongoDB = userArgs[0];

// main().catch((err) => console.log(err));

// async function dropDatabase() {
//   console.log("Dropping the database...");
//   await mongoose.connection.dropDatabase();
//   console.log("Database dropped successfully.");
// }

// async function main() {
//   console.log("Debug: About to connect");
//   await mongoose.connect(mongoDB);
//   console.log("Debug: Should be connected?");
//   await dropDatabase(); // Drop the database before populating
//   await createGenres();
//   await createAuthors();
//   await createBooks();
//   await createBookInstances();
//   console.log("Debug: Closing mongoose");
//   mongoose.connection.close();
// }

// // We pass the index to the ...Create functions so that, for example,
// // genre[0] will always be the Fantasy genre, regardless of the order
// // in which the elements of promise.all's argument complete.
// async function genreCreate(index, name) {
//   const genre = new Genre({ name: name });
//   await genre.save();
//   genres[index] = genre;
//   console.log(`Added genre: ${name}`);
// }

// async function authorCreate(index, first_name, family_name, d_birth, d_death) {
//   const authordetail = { firstName: first_name, familyName: family_name };
//   if (d_birth != false) authordetail.date_of_birth = d_birth;
//   if (d_death != false) authordetail.date_of_death = d_death;

//   const author = new Author(authordetail);

//   await author.save();
//   authors[index] = author;
//   console.log(`Added author: ${first_name} ${family_name}`);
// }

// async function bookCreate(index, title, summary, isbn, author, genre) {
//   const bookdetail = {
//     title: title,
//     summary: summary,
//     author: author,
//     isbn: isbn,
//   };
//   if (genre != false) bookdetail.genre = genre;

//   const book = new Book(bookdetail);
//   await book.save();
//   books[index] = book;
//   console.log(`Added book: ${title}`);
// }

// async function bookInstanceCreate(index, book, imprint, due_back, status) {
//   const bookinstancedetail = {
//     book: book,
//     imprint: imprint,
//   };
//   if (due_back != false) bookinstancedetail.due_back = due_back;
//   if (status != false) bookinstancedetail.status = status;

//   const bookinstance = new BookInstance(bookinstancedetail);
//   await bookinstance.save();
//   bookinstances[index] = bookinstance;
//   console.log(`Added bookinstance: ${imprint}`);
// }

// async function createGenres() {
//   console.log("Adding genres");
//   await Promise.all([
//     genreCreate(0, "Science Fiction"),
//     genreCreate(1, "Fantasy"),
//     genreCreate(2, "Mystery"),
//     genreCreate(3, "Historical Fiction"),
//     genreCreate(4, "Biography"),
//   ]);
// }

// async function createAuthors() {
//   console.log("Adding authors");
//   await Promise.all([
//     authorCreate(0, "Isaac", "Asimov", "1920-01-02", "1992-04-06"),
//     authorCreate(1, "J.K.", "Rowling", "1965-07-31", false),
//     authorCreate(2, "Agatha", "Christie", "1890-09-15", "1976-01-12"),
//     authorCreate(3, "Hilary", "Mantel", "1952-07-06", "2022-09-22"),
//     authorCreate(4, "Michelle", "Obama", "1964-01-17", false),
//   ]);
// }

// async function createBooks() {
//   console.log("Adding Books");
//   await Promise.all([
//     bookCreate(
//       0,
//       "Foundation",
//       "The first book in Asimov's classic series chronicles the collapse of the Galactic Empire and the establishment of the Foundation, a group tasked with preserving human knowledge.",
//       "9780553293357",
//       authors[0],
//       [genres[0]]
//     ),
//     bookCreate(
//       1,
//       "Harry Potter and the Philosopher's Stone",
//       "Harry Potter's life is miserable with the Dursleys until he receives a letter that will change his life forever. He is invited to attend Hogwarts School of Witchcraft and Wizardry.",
//       "9780747532699",
//       authors[1],
//       [genres[1]]
//     ),
//     bookCreate(
//       2,
//       "Murder on the Orient Express",
//       "Just after midnight, a snowdrift stops the Orient Express in its tracks. An American tycoon lies dead in his compartment, stabbed a dozen times, his door locked from the inside. Isolated by the storm, detective Hercule Poirot must find the killer among a dozen of the dead man's enemies.",
//       "9780007119318",
//       authors[2],
//       [genres[2]]
//     ),
//     bookCreate(
//       3,
//       "Wolf Hall",
//       "England in the 1520s is a heartbeat from disaster. If the king dies without a male heir, the country could be destroyed by civil war. Henry VIII wants to annul his marriage of twenty years and marry Anne Boleyn. The pope and most of Europe opposes him. Into this impasse steps Thomas Cromwell.",
//       "9780007230204",
//       authors[3],
//       [genres[3]]
//     ),
//     bookCreate(
//       4,
//       "Becoming",
//       "In her memoir, Michelle Obama invites readers into her world, chronicling the experiences that have shaped her—from her childhood on the South Side of Chicago to her years as an executive balancing the demands of motherhood and work, to her time spent at the world's most famous address.",
//       "9781524763138",
//       authors[4],
//       [genres[4]]
//     ),
//   ]);
// }

// async function createBookInstances() {
//   console.log("Adding Book Instances");
//   await Promise.all([
//     bookInstanceCreate(
//       0,
//       books[0],
//       "Bantam Spectra, 1991.",
//       false,
//       "Available"
//     ),
//     bookInstanceCreate(1, books[1], "Bloomsbury, 1997.", false, "Loaned"),
//     bookInstanceCreate(
//       2,
//       books[1],
//       "Scholastic, 1998.",
//       "2024-07-31",
//       "Available"
//     ),
//     bookInstanceCreate(
//       3,
//       books[2],
//       "William Collins, 2017.",
//       false,
//       "Available"
//     ),
//     bookInstanceCreate(4, books[3], "4th Estate, 2009.", false, "Maintenance"),
//     bookInstanceCreate(
//       5,
//       books[4],
//       "Crown Publishing, 2018.",
//       false,
//       "Available"
//     ),
//     bookInstanceCreate(6, books[4], "Penguin Books, 2021.", false, "Available"),
//   ]);
// }
