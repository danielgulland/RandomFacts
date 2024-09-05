import React, { useEffect } from "react";
import Fact from "./Fact";

function DeleteFact({ isDbInitialized, userId }) {
  useEffect(() => {
    const deleteFact = async () => {
      if (!isDbInitialized) return;

      try {
        const response = await fetch(`http://localhost:3000/delete-fact/${userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete fact");
        }

        console.log("Fact deleted successfully");
      } catch (error) {
        console.error("Error deleting fact:", error);
      }
    };

    deleteFact();
  }, [isDbInitialized, userId]);

  return (
    <div>
      {isDbInitialized ? "Ready to add facts!" : "Initializing database..."}
    </div>
  );
}

export default DeleteFact;
