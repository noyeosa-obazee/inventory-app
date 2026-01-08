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
  const { bookid, title, price, stock_quantity, genre_id } = req.body;

  const newAuthorId = await db.addAuthor(req.body);
  if (!req.path.includes("update")) {
    res.redirect(
      `/books/new?title=${encodeURIComponent(title)}&price=${encodeURIComponent(
        price
      )}&author_id=${encodeURIComponent(
        newAuthorId
      )}&genre_id=${encodeURIComponent(
        genre_id
      )}&stock_quantity=${encodeURIComponent(stock_quantity)}`
    );
  } else {
    res.redirect(
      `/books/update/${encodeURIComponent(bookid)}?title=${encodeURIComponent(
        title
      )}&author_id=${encodeURIComponent(
        newAuthorId
      )}&genre_id=${encodeURIComponent(genre_id)}&price=${encodeURIComponent(
        price
      )}&stock_quantity=${encodeURIComponent(stock_quantity)}`
    );
  }
};

const addNewGenre = async (req, res) => {
  const { bookid, title, price, stock_quantity, author_id } = req.body;
  const newGenreId = await db.addGenre(req.body);
  if (!req.path.includes("update")) {
    res.redirect(
      `/books/new?title=${encodeURIComponent(title)}&price=${encodeURIComponent(
        price
      )}&author_id=${encodeURIComponent(
        author_id
      )}&genre_id=${encodeURIComponent(
        newGenreId
      )}&stock_quantity=${encodeURIComponent(stock_quantity)}`
    );
  } else {
    res.redirect(
      `/books/update/${encodeURIComponent(bookid)}?title=${encodeURIComponent(
        title
      )}&author_id=${encodeURIComponent(
        author_id
      )}&genre_id=${encodeURIComponent(newGenreId)}&price=${encodeURIComponent(
        price
      )}&stock_quantity=${encodeURIComponent(stock_quantity)}`
    );
  }
};

const getBookUpdateForm = async (req, res) => {
  const authors = await db.getAllAuthors();
  const genres = await db.getAllGenres();
  const book = await db.getBookInfo(Number(req.params.bookId));
  const hasQueryData = Object.keys(req.query).length > 0;
  res.render("editBook", {
    authors: authors,
    genres: genres,
    data: hasQueryData ? req.query : book[0],
    book_id: req.params.bookId,
  });
};

const deleteBook = async (req, res) => {
  await db.deleteBook(req.params.bookId);
  res.redirect("/books");
};

const updateBook = async (req, res) => {
  await db.updateBook(req.body);

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
  getBookUpdateForm,
  updateBook,
};
