import React, { useState, useEffect } from "react";
import styles from "./History.module.css";
import axios from "axios";

export default function History() {
  const [users, setUsers] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [edit, setEdit] = useState(null);
  const [editedUsername, setEditedUsername] = useState("");
  const [editedPassword, setEditedPassword] = useState("");

  const [listChange, setListChange] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const MAX = 10000;
  const MIN = 1;

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
      })
      .finally(setListChange(false));
  }, [listChange]);

  function handleSubmit(e) {
    e.preventDefault();
    let userData = { username: username, password: password };

    axios
      .post("/api/users", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        setListChange(true);
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  }

  function randomise() {
    setUsername(`randomUser${Math.floor(Math.random() * (MAX - MIN) + MIN)}`);
    setPassword(Math.floor(Math.random() * (MAX - MIN) + MIN));
  }

  const deleteField = (id) => {
    axios
      .delete(`/api/users/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        setListChange(true);
      })
      .catch((error) => {
        console.log("Error deleting user:", error);
      });
  };

  const saveField = (id, originalUsername, originalPassword) => {
    if (editedUsername !== "" || editedPassword !== "") {
      axios
        .put(
          `/api/users/${id}`,
          {
            username: editedUsername === "" ? originalUsername : editedUsername,
            password: editedPassword === "" ? originalPassword : editedPassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          setListChange(true);
          setEditedUsername("");
          setEditedPassword("");
          setEdit(null);
        })
        .catch((error) => {
          console.log("Error updating users:", error);
        });
    }

    // Reset Edit View.
    setEdit(null);
  };

  // Begins Edit View.
  const handleEdit = (index) => {
    setEdit(index);
  };

  return (
    <>
      <form className={styles["form"]} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></input>
        </div>
        <div className={styles["buttons"]}>
          <button onClick={randomise}>Randomise</button>
          <button className={styles["submitBtn"]}>Submit</button>
        </div>
      </form>
      <div className={styles["container"]}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          users.map((user, i) => (
            <div className={styles["row"]} key={i}>
              {edit === i ? (
                <>
                  <input
                    className={styles["cell"]}
                    placeholder={user.username}
                    value={editedUsername}
                    onChange={(event) => setEditedUsername(event.target.value)}
                  />
                  <input
                    className={styles["cell"]}
                    placeholder={user.password}
                    value={editedPassword}
                    onChange={(event) => setEditedPassword(event.target.value)}
                  />
                </>
              ) : (
                <>
                  <div className={styles["cell"]}>{user.username}</div>
                  <div className={styles["cell"]}>{user.password}</div>
                </>
              )}

              <div className={styles["btn-container"]}>
                <button
                  className={styles["edit-btn"]}
                  onClick={() => handleEdit(i)}
                >
                  Edit
                </button>
                {edit === i ? (
                  <button
                    className={styles["save-btn"]}
                    onClick={() =>
                      saveField(user.userID, user.username, user.password)
                    }
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className={styles["delete-btn"]}
                    onClick={() => deleteField(user.userID)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
