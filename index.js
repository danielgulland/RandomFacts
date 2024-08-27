const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

let dbPath = path.resolve(__dirname, "mydb.sqlite");

// Open a database connection
let db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
    return;
  }
  console.log("Connected to the SQLite database.");

  // Create a table if it doesn't exist
  db.run(
    `CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    )`,
    (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
        return;
      }
      console.log("Table created or already exists.");

      // Insert data after the table has been created or confirmed to exist
      db.run(
        `INSERT INTO user (name, email) VALUES (?, ?)`,
        ["Dan", "dan@yahoo.com"],
        function (err) {
          if (err) {
            console.error("Error inserting data:", err.message);
            return;
          }
          console.log(
            `A new user has been inserted with rowid ${this.lastID}.`
          );

          // Close the database connection after the insert
          db.close((err) => {
            if (err) {
              console.error("Error closing database:", err.message);
            } else {
              console.log("Database connection closed.");
            }
          });
        }
      );
    }
  );
});

app.get("/", (req, res) => {
  res.send("Hello, world!!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
