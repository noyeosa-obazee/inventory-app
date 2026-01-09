const express = require("express");
const path = require("node:path");
const bookRoute = require("./routes/bookRouter");
const indexRoute = require("./routes/indexRouter");
const app = express();

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
app.use("/", indexRoute);
app.use("/books", bookRoute);

app.use((req, res, next) => {
  res.status(404).render("404");
});

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
