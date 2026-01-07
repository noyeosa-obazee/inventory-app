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

module.exports = {
  getAllBooksData,
  getAllBooks,
  getAllAuthors,
  getAllGenres,
};
