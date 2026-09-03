const cors = require("cors");
const express = require("express");

const { openDatabase } = require("./database");

const app = express();
const database = openDatabase();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/books", (request, response) => {
  const q = String(request.query.q || "").trim().toLowerCase();
  const category = String(request.query.category || "").trim().toLowerCase();
  const filters = [];
  const values = [];

  if (q) {
    filters.push("(LOWER(title) LIKE ? OR LOWER(author) LIKE ? OR LOWER(summary) LIKE ?)");
    values.push(`%${q}%`, `%${q}%`, `%${q}%`);
  }

  if (category) {
    filters.push("LOWER(category) = ?");
    values.push(category);
  }

  const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
  const sql = `
    SELECT id, title, author, category, summary
    FROM books
    ${where}
    ORDER BY title ASC
  `;

  database.all(sql, values, (error, rows) => {
    if (error) {
      response.status(500).json({ error: "No se pudo consultar la base de datos." });
      return;
    }

    response.json({
      count: rows.length,
      items: rows
    });
  });
});

app.get("/health", (_request, response) => {
  response.json({ ok: true });
});

app.listen(port, () => {
  console.log(`API Express escuchando en http://localhost:${port}`);
});
