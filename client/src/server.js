const express = require("express");
const app = express();
const cors = require("cors");
const Database = require("./Database.js");

app.use(cors());
app.use(express.json());

app.post("/initialize-database", (req, res) => {
  const { dbFilePath } = req.body;
  const db = new Database(dbFilePath);
  db.createTable();
  res.json({ message: "Database initialized" });
});

// Route to add a new user
app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name);

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing required user data" });
  }

  let db = new Database("./mydb.sqlite");

  try {
    await db.insertUser(name, email, password);
    res.json({ message: "User added successfully" });
  } catch (error) {
    console.error("Error adding user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    db.close(); // Ensure the database connection is closed
  }
});

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

//add new fact
app.post("/fact", async (req, res) => {
  let { fact } = req.body;

  if (!fact) {
    return res.status(400).json({ error: "Missing required fact data" });
  }

  let db = new Database("./mydb.sqlite");

  try {
    await db.insertFact(fact);
    res.json({ message: "Fact added successfully" });
  } catch (error) {
    console.error("Error adding fact:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
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
