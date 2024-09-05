import React, { useEffect } from "react";
import Fact from './Fact'

function AddFact({ isDbInitialized, fact }) {
  useEffect(() => {
    const addFact = async () => {
      if (!isDbInitialized) return

      const factData = {
        fact: fact
      };

      console.log(factData);

      try {
        const response = await fetch("http://localhost:3000/fact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(factData),
        });

        if (!response.ok) {
          throw new Error("Failed to add fact");
        }

        console.log("Fact added successfully");
      } catch (error) {
        console.error("Error adding fact:", error);
      }
    };

    addFact();
  }, [isDbInitialized]);

  return (
    <div>
      {isDbInitialized ? "Ready to add facts!" : "Initializing database..."}
    </div>
  );
}

export default AddFact;
