const { Router } = require("express");
const bookRoute = Router();
const {
  getBooks,
  getBookForm,
  getAuthorForm,
  getGenreForm,
  addNewBook,
  addNewAuthor,
  addNewGenre,
  deleteBook,
} = require("../controllers/bookControllers");

bookRoute.get("/", getBooks);

bookRoute.get("/new", getBookForm);
bookRoute.post("/new", addNewBook);
bookRoute.get("/authors/new", getAuthorForm);
bookRoute.post("/authors/new", addNewAuthor);
bookRoute.get("/genres/new", getGenreForm);
bookRoute.post("/genres/new", addNewGenre);
bookRoute.get("/delete/:bookId", deleteBook);

module.exports = bookRoute;
