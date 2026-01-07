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

module.exports = { getBooks, getBookForm };
