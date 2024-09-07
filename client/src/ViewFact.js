import React, { useEffect, useState } from "react";
import Fact from "./Fact";

function ViewFact({ isDbInitialized, userId }) {
  //sets the state to an empty array
  const [facts, setFacts] = useState([]);

  useEffect(() => {
    const viewFact = async () => {
      if (!isDbInitialized) return;

      try {
        const response = await fetch(`http://localhost:3000/fact/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to get facts");
        }
        const data = await response.json();
        setFacts(data);
        console.log(data);
      } catch (error) {
        console.error("Error getting facts:", error);
      }
    };

    viewFact();
  }, [isDbInitialized]);

  return (
    <div>
      <h2>Facts:</h2>
      {facts.length > 0 ? (
        <ul>
          {facts.map((factObject) => (
            <li key={factObject.id}>{factObject.fact}</li>
          ))}
        </ul>
      ) : (
        <p>No facts available.</p>
      )}
    </div>
  );
}

export default ViewFact;
