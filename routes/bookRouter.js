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
  getBookUpdateForm,
  updateBook,
} = require("../controllers/bookControllers");

bookRoute.get("/", getBooks);

bookRoute.get("/new", getBookForm);
bookRoute.post("/new", addNewBook);
bookRoute.get("/authors/new", getAuthorForm);
bookRoute.post("/authors/new", addNewAuthor);
bookRoute.get("/genres/new", getGenreForm);
bookRoute.post("/genres/new", addNewGenre);
bookRoute.get("/delete/:bookId", deleteBook);
bookRoute.get("/update/:bookId", getBookUpdateForm);
bookRoute.get("/update/:bookId/authors/new", getAuthorForm);
bookRoute.post("/update/:bookId/authors/new", addNewAuthor);
bookRoute.get("/update/:bookId/genres/new", getGenreForm);
bookRoute.post("/update/:bookId/genres/new", addNewGenre);
bookRoute.post("/update/:bookId", updateBook);

module.exports = bookRoute;
