const db = require("../db/queries");
// const { body, validationResult, matchedData } = require("express-validator");

const getBooks = async (req, res) => {
  const books = await db.getAllBooksData();
  res.render("books", { books: books });
};

const getBookForm = async (req, res) => {
  const authors = await db.getAllAuthors();
  const genres = await db.getAllGenres();
  res.render("addBook", { authors: authors, genres: genres, data: req.query });
};
const addNewBook = async (req, res) => {
  await db.addBook(req.body);
  res.redirect("/books");
};
const getAuthorForm = async (req, res) => {
  res.render("addAuthor", { query: req.query });
};
const getGenreForm = async (req, res) => {
  res.render("addGenre", { query: req.query });
};

const addNewAuthor = async (req, res) => {
  const { title, price, stock_quantity, genre_id } = req.body;

  const newAuthorId = await db.addAuthor(req.body);

  res.redirect(
    `/books/new?title=${encodeURIComponent(title)}&price=${encodeURIComponent(
      price
    )}&author_id=${newAuthorId}&genre_id=${genre_id}&stock_quantity=${stock_quantity}`
  );
};

const addNewGenre = async (req, res) => {
  const { title, price, stock_quantity, author_id } = req.body;
  const newGenreId = await db.addGenre(req.body);

  res.redirect(
    `/books/new?title=${encodeURIComponent(title)}&price=${encodeURIComponent(
      price
    )}&author_id=${author_id}&genre_id=${newGenreId}&stock_quantity=${stock_quantity}`
  );
};

const getBookUpdateForm = (req, res) => {};

const deleteBook = async (req, res) => {
  await db.deleteBook(req.params.bookId);
  res.redirect("/books");
};

module.exports = {
  getBooks,
  getBookForm,
  getAuthorForm,
  getGenreForm,
  addNewBook,
  addNewAuthor,
  addNewGenre,
  deleteBook,
};
