const db = require("../db/queries");
// const { body, validationResult, matchedData } = require("express-validator");

const getBooks = async (req, res) => {
  const books = await db.getAllBooksData();
  res.render("books", { books: books });
};

const getBookForm = async (req, res) => {
  const authors = await db.getAllAuthors();
  const genres = await db.getAllGenres();
  res.render("addBook", { authors: authors, genres: genres });
};
const addNewBook = async (req, res) => {
  await db.addBook(req.body);
  res.redirect("/books");
};
const getAuthorForm = async (req, res) => {
  res.render("addAuthor");
};
const getGenreForm = async (req, res) => {
  res.render("addGenre");
};

const addNewAuthor = async (req, res) => {};

const addNewGenre = async (req, res) => {};

module.exports = {
  getBooks,
  getBookForm,
  getAuthorForm,
  getGenreForm,
  addNewBook,
  addNewAuthor,
  addNewGenre,
};
