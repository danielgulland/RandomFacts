import React, { useState, useEffect } from "react";

const Display = () => {
  // State to store the fetched user data
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect hook to perform the fetch operation
  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUser(data[3]); // Set the first user from the fetched data
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Call the async function
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render the user data if available
  return (
    <div>{user ? <h1>{user.name}</h1> : <p>No user data available</p>}</div>
  );
};

export default Display;
