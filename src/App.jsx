import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/api/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Error fetching users. Please try again later.");
        setLoading(false);
      });
  }, []);

  const deleteField = (index) => {
    // Implement delete functionality
  };

  return (
    <>
      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          users.map((user, i) => (
            <div className="row" key={i}>
              <div className="cell">{user.username}</div>
              <div className="cell">{user.password}</div>
              <button className="deleteBtn" onClick={() => deleteField(i)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}
