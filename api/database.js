const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const databasePath = path.join(__dirname, "database.sqlite");
const seedPath = path.join(__dirname, "books.seed.json");

function openDatabase() {
  const database = new sqlite3.Database(databasePath);

  database.serialize(() => {
    database.run(`
      CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        category TEXT NOT NULL,
        summary TEXT NOT NULL
      )
    `);

    database.get("SELECT COUNT(*) AS total FROM books", (error, row) => {
      if (error) {
        throw error;
      }

      if (row.total === 0) {
        const books = JSON.parse(fs.readFileSync(seedPath, "utf8"));
        const statement = database.prepare(
          "INSERT INTO books (title, author, category, summary) VALUES (?, ?, ?, ?)"
        );

        books.forEach((book) => {
          statement.run(book.title, book.author, book.category, book.summary);
        });

        statement.finalize();
      }
    });
  });

  return database;
}

module.exports = { openDatabase };
