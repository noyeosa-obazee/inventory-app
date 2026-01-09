const { Router } = require("express");
const indexRoute = Router();
const { getHomePage } = require("../controllers/bookControllers");

indexRoute.get("/", getHomePage);

module.exports = indexRoute;
