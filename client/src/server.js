const express = require("express");
const app = express();
const cors = require("cors");
const Database = require("./Database.js");

app.use(cors());
app.use(express.json());

const dbFilePath = "./mydb.sqlite";
const db = new Database(dbFilePath);

app.post("/initialize-database", (req, res) => {
  db.createTable();
  res.json({ message: "Database initialized" });
});

// Route to add a new user
app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing required user data" });
  }

  try {
    await db.insertUser(name, email, password);
    res.json({ message: "User added successfully" });
  } catch (error) {
    console.error("Error adding user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/users", async (req, res) => {
  try {
    // Await the promise returned by getUsers
    const users = await db.getUsers();
    res.json(users); // Send the fetched data as JSON response
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Internal Server Error" }); // Send error response
  }
});

//add new fact
app.post("/fact", async (req, res) => {
  //extracts fact and userId from the req.body and creates variables with the same name
  let { fact, userId } = req.body;

  if (!fact) {
    return res.status(400).json({ error: "Missing required fact data" });
  }

  try {
    await db.insertFact(fact, userId);
    res.json({ message: "Fact added successfully" });
  } catch (error) {
    console.error("Error adding fact:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/fact/:id", async (req, res) => {
  //params is used instead of query which would get the url from ?=
  //destructures the object in params but it must match the same name if its id in params it needs to be id in the destructing
  const {id} = req.params;

  if (!id) {
    return res.status(400).json({ error: "Missing id to retrieve facts" });
  }

  try {
    const facts = await db.getFact(id);
    res.json(facts);
  } catch (error) {
    console.error("Error retrieving facts data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete fact
app.delete("/delete-fact/:id", (req, res) => {
  const userId = req.params.id;
  console.log(userId);

  db.deleteFact(userId)
    .then((result) => res.json(result)) // Send success message as JSON
    .catch((err) => res.status(500).json({ error: err.message })); // Handle errors
});

//This event is emitted when the Node.js process is about to exit "exit"
process.on("exit", (code) => {
  if (db) {
    db.close((err) => {
      if (err) {
        console.error("Error closing database:", err.message);
      } else {
        console.log("Database connection closed.");
      }
    });
  }
});

app.get("/", (req, res) => {
  res.send("Hello, world!!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
