import { useEffect, useState } from "react";
import AddUser from "./AddUser";
import Display from "./Display";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDbInitialized, setIsDbInitialized] = useState(false);

  // useEffect for initializing the database
  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const dbFilePath = "./mydb.sqlite";
        const initResponse = await fetch(
          "http://localhost:3000/initialize-database",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ dbFilePath }),
          }
        );

        if (!initResponse.ok) {
          throw new Error(
            `Failed to initialize database. Status: ${initResponse.status}`
          );
        }

        const initData = await initResponse.json();
        console.log("Database initialized successfully:", initData);

        // Mark database as initialized
        setIsDbInitialized(true);
      } catch (error) {
        console.error("Error initializing database:", error);
        setError(error.message);
      }
    };

    initializeDatabase();
  }, []); // Runs once on mount

  return (
    <div className="App">
      <main>
        <p>This is a basic React application.</p>
        <AddUser
          isDbInitialized={isDbInitialized}
          name="Dave"
          email="nathan@yahoo.com"
          fact="nathan is handsome"
          password="nate12"
        />
      </main>
    </div>
  );
}

export default App;
