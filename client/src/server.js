const express = require("express");
const app = express();
const cors = require("cors");
const Database = require("./Database.js");

app.use(cors());

app.get("/users", async (req, res) => {
  let db = new Database("./mydb.sqlite");

  try {
    // Await the promise returned by getUsers
    const users = await db.getUsers();
    res.json(users); // Send the fetched data as JSON response
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Internal Server Error" }); // Send error response
  } finally {
    db.close(); // Ensure the database connection is closed
  }
});

app.get("/", (req, res) => {
  res.send("Hello, world!!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
