import React, { useEffect } from "react";
import Fact from "./Fact";
import { useState } from "react";

function AddFact({ isDbInitialized }) {
  const [fact, setFact] = useState("");
  const [userId, setUserId] = useState(""); // Input state for fact

  // Function to handle the POST request
  const handleSubmit = async () => {
    if (!isDbInitialized) {
      console.log("Database is not initialized yet.");
      return;
    }

    const factData = {
      fact: fact,
      userId: userId,
    };

    try {
      // Send the POST request to the server
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

      console.log("Fact added successfully!");
    } catch (error) {
      console.error("Error adding fact:", error);
    }
  };

  return (
    <div>
      <h3>Add a Fact</h3>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)} // Update userId state on input change
        placeholder="Enter User Id"
      />
      <input
        type="text"
        value={fact}
        onChange={(e) => setFact(e.target.value)} // Update fact state on input change
        placeholder="Enter a fact"
      />
      <button onClick={handleSubmit}>Add Fact</button>{" "}
      {/* Button to trigger fetch call */}
    </div>
  );
}

export default AddFact;
