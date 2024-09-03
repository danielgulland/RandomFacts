import React, { useEffect } from "react";
import User from "./User";

function AddUser({ isDbInitialized, name, email, password }) {
  console.log(`name :' ${name} email : ${email} password : ${password} `);
  useEffect(() => {
    const addUser = async () => {
      if (!isDbInitialized) return;

      const userData = {
        name: name,
        email: email,
        password: password,
      };

      console.log(userData);

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
