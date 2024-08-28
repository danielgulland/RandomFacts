const express = require("express");
const app = express();
const Database = require("./Database.js");

let db = new Database("./mydb.sqlite");
db.createTable();
db.insertUser("nate", 30);
db.getUsers();
db.close();

app.get("/", (req, res) => {
  res.send("Hello, world!!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
