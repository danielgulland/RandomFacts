const sqlite3 = require("sqlite3").verbose();

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
        email TEXT NOT NULL,
        password TEXT NOT NULL
   )`;

    this.db.run(createTableQuery, (err) => {
      if (err) {
        console.error("Error creating table", err.message);
      } else {
        console.log("Table created or already exists.");
      }
    });

    const createFactTableQuery = `
    CREATE TABLE IF NOT EXISTS facts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fact TEXT NOT NULL
 )`;

    this.db.run(createFactTableQuery, (err) => {
      if (err) {
        console.error("Error creating table", err.message);
      } else {
        console.log("Table created or already exists.");
      }
    });
  }
  //name, email, fact, password
  insertUser(name, email, fact, password) {
    const insertQuery = `INSERT INTO users (name, email, fact, password) VALUES (?, ?, ?, ?)`;

  //name, email, fact, password
  insertUser(name, email, password) {
    const insertQuery = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;

    this.db.run(insertQuery, [name, email, password], function (err) {
      if (err) {
        console.error("Error inserting data", err.message);
      } else {
        console.log(`User added with ID: ${this.lastID}`);
      }
    });
  }

  getUsers() {
    const getQuery = "SELECT * FROM users";

    return new Promise((resolve, reject) => {
      this.db.all(getQuery, [], (err, rows) => {
        if (err) {
          reject(err); // Reject the promise if there is an error
        } else {
          resolve(rows); // Resolve the promise with the rows data
        }
      });
    });
  }

  //name, email, fact, password
  insertFact(fact) {
    const insertQuery = `INSERT INTO facts (fact) VALUES (?)`;

    this.db.run(insertQuery, [fact], function (err) {
      if (err) {
        console.error("Error inserting data", err.message);
      } else {
        console.log(`Fact added with ID: ${this.lastID}`);
      }
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
