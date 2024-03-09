import styles from "./Login.module.css";
import { useState } from "react";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(username);
    console.log(password);
  };

  return (
    <>
      <form className={styles["login-form"]} onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="username">Username</label>
        <div className={styles["input-container"]}>
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="your-username..."
          />
        </div>
        <label htmlFor="password">Password</label>
        <div className={styles["input-container"]}>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button
        className={styles["link-btn"]}
        onClick={() => props.onFormSwitch("Register")}
      >
        Don't have an account? Register here.
      </button>
    </>
  );
}
