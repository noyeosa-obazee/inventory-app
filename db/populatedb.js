#! /usr/bin/env node

const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();
const SQL = `
CREATE TABLE IF NOT EXISTS authors (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  bio TEXT
);

CREATE TABLE IF NOT EXISTS genres (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2), 
  stock_quantity INTEGER DEFAULT 0,
  
  author_id INTEGER REFERENCES authors(id),
  genre_id INTEGER REFERENCES genres(id)
);

INSERT INTO authors (name, bio) 
VALUES 
  ('J.R.R. Tolkien', 'The father of modern fantasy literature.'),
  ('George Orwell', 'English novelist known for biting social criticism.'),
  ('Frank Herbert', 'American science fiction author best known for Dune.');


INSERT INTO genres (name) 
VALUES 
  ('Fantasy'),
  ('Science Fiction'),
  ('Dystopian');


-- Notice how we use the numbers (1, 2, 3) to link to the authors/genres above.
INSERT INTO books (title, price, stock_quantity, author_id, genre_id) 
VALUES 
 
  ('The Hobbit', 14.99, 15, 1, 1),
  ('The Fellowship of the Ring', 19.99, 8, 1, 1),
  
  
  ('1984', 12.50, 42, 2, 3),
  ('Animal Farm', 9.99, 20, 2, 3),


  ('Dune', 18.00, 5, 3, 2),
  ('Dune Messiah', 16.50, 12, 3, 2);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
