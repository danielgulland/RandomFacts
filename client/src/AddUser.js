import React, { useEffect } from "react";

function AddUser({ isDbInitialized, name, email, fact, password }) {
  useEffect(() => {
    const addUser = async () => {
      if (!isDbInitialized) return;

      try {
        const userData = {
          name: name,
          email: email,
          fact: fact,
          password: password,
        };

        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          throw new Error("Failed to add user");
        }

        console.log("User added successfully");
      } catch (error) {
        console.error("Error adding user:", error);
      }
    };

    addUser();
  }, [isDbInitialized]);

  return (
    <div>
      {isDbInitialized ? "Ready to add users!" : "Initializing database..."}
    </div>
  );
}

export default AddUser;
