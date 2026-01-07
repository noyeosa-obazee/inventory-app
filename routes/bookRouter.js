const { Router } = require("express");
const bookRoute = Router();
const { getBooks, getBookForm } = require("../controllers/bookControllers");

bookRoute.get("/", getBooks);

bookRoute.get("/new", getBookForm);

module.exports = bookRoute;
