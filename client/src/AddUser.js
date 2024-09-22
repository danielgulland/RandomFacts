import React, { useEffect } from "react";

function AddUser({ isDbInitialized, name, email, password }) {
  useEffect(() => {
    const addUser = async () => {
      if (!isDbInitialized) return;

      const userData = {
        name: name,
        email: email,
        password: password,
      };

      try {
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
      } catch (error) {
        console.error("Error adding user:", error);
      }
    };

    addUser();
  }, [isDbInitialized]);

  return (
    <div>{isDbInitialized ? "Ready to add users!" : "Initializing database..."}</div>
  );
}

export default AddUser;
