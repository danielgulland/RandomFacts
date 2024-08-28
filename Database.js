const sqlite3 = require("sqlite3").verbose();
const path = require("path");

class Database {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.error("Could not connect to the database:", err.message);
      } else {
        console.log("Connected to the SQLite database.");
      }
    });
  }

  createTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER NOT NULL
   )`;

    this.db.run(createTableQuery, (err) => {
      if (err) {
        console.error("Error creating table", err.message);
      } else {
        console.log("Table created or already exists.");
      }
    });
  }

  insertUser(name, age) {
    const insertQuery = `INSERT INTO users (name, age) VALUES (?, ?)`;

    this.db.run(insertQuery, [name, age], function (err) {
      if (err) {
        console.error("Error inserting data", err.message);
      } else {
        console.log(`User added with ID: ${this.lastID}`);
      }
    });
  }

  getUsers() {
    const getQuery = "SELECT * FROM users";

    this.db.all(getQuery, [], (err, rows) => {
      if (err) {
        throw err;
      }
      console.log(rows); //Array of table names
    });
  }

  close() {
    this.db.close((err) => {
      if (err) {
        console.error("Error closing database", err.message);
      } else {
        console.log("Database connection closed.");
      }
    });
  }
}

module.exports = Database;
