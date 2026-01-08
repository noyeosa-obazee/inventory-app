const pool = require("./pool");

const getAllBooksData = async () => {
  const { rows } = await pool.query(
    `SELECT 
    books.id,
    books.title,
    books.price,  
    books.stock_quantity, 
    authors.name AS author_name,
    genres.name AS genre_name
FROM books
LEFT JOIN authors ON books.author_id = authors.id
LEFT JOIN genres ON books.genre_id = genres.id;`
  );

  return rows;
};

const getAllBooks = async () => {
  const { rows } = await pool.query("SELECT * FROM books");
  return rows;
};

const getAllAuthors = async () => {
  const { rows } = await pool.query("SELECT * FROM authors");
  return rows;
};

const getAllGenres = async () => {
  const { rows } = await pool.query("SELECT * FROM genres");
  return rows;
};

const addBook = async (book) => {
  await pool.query(
    "INSERT INTO books (title, price, stock_quantity, author_id, genre_id) VALUES ($1, $2, $3, $4, $5)",
    [book.title, book.price, book.stock_quantity, book.author_id, book.genre_id]
  );
};

const addAuthor = async (author) => {
  if (author.bio) {
    const { rows } = await pool.query(
      "INSERT INTO authors (name,bio) VALUES ($1,$2) RETURNING id",
      [author.name, author.bio]
    );
    return rows[0].id;
  } else {
    const rows = await pool.query(
      "INSERT INTO authors (name) VALUES ($1) RETURNING id",
      [author.name]
    );
    return rows[0].id;
  }
};

const addGenre = async (genre) => {
  const { rows } = await pool.query(
    "INSERT INTO genres (name) VALUES ($1) RETURNING id",
    [genre.name]
  );

  return rows[0].id;
};

module.exports = {
  getAllBooksData,
  getAllBooks,
  getAllAuthors,
  getAllGenres,
  addBook,
  addAuthor,
  addGenre,
};
