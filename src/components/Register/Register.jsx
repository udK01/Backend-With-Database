import styles from "./Register.module.css";
import { useState } from "react";
import axios from "axios";

export default function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  // Errors
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password2Error, setPassword2Error] = useState("");

  // Constants
  const USERNAME_LOWER = 3;
  const USERNAME_UPPER = 15;
  const PASSWORD_LOWER = 6;
  const PASSWORD_UPPER = 20;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameError("");
    setPasswordError("");
    setPassword2Error("");

    try {
      if (rangeCheck(username, USERNAME_LOWER, USERNAME_UPPER, "Username")) {
        if (passwordValidations(password, PASSWORD_LOWER, PASSWORD_UPPER)) {
          const exists = await userExists(username);
          if (!exists) {
            saveData();
          }
        }
      }
    } catch (error) {
      setUsernameError(error.message);
    }
  };

  function rangeCheck(input, lowerBound, upperBound, object) {
    if (input.length >= lowerBound && input.length <= upperBound) {
      return true;
    }
    throw new Error(
      `${object} has to be between ${lowerBound} and ${upperBound}`
    );
  }

  function passwordValidations(input, lowerBound, upperBound) {
    try {
      if (rangeCheck(input, lowerBound, upperBound, "Password")) {
        if (input === password2) {
          if (validatePassword(password)) {
            return true;
          } else {
            throw new Error(
              `Your password must contain a digit, an uppercase and lower case character!`
            );
          }
        } else {
          throw new Error(`You must enter the same password!`);
        }
      }
    } catch (error) {
      setPasswordError(error.message);
      setPassword2Error(error.message);
    }
  }

  function validatePassword(password) {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /[0-9]/;

    const containsUppercase = uppercaseRegex.test(password);
    const containsLowercase = lowercaseRegex.test(password);
    const containsDigit = digitRegex.test(password);

    return containsUppercase && containsLowercase && containsDigit;
  }

  function userExists(username) {
    return axios
      .get("/api/account_names")
      .then((response) => {
        const existingUsers = response.data;
        for (const existingUser of existingUsers) {
          if (existingUser.username === username) {
            throw new Error(`Username '${username}' is already taken.`);
          }
        }
        return false;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        throw error;
      });
  }

  function saveData() {
    let userData = { username: username, password: password };

    axios
      .post("/api/account", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        setUsername("");
        setPassword("");
        setPassword2("");
        props.onFormSwitch("Login");
      })
      .catch((error) => {
        console.error("Error creating account:", error);
      });
  }

  function autoFill() {
    setUsername(`testUser`);
    setPassword(`Testpw123`);
    setPassword2(`Testpw123`);
  }

  return (
    <>
      <div className={styles["register-container"]}>
        <form
          className={styles["register-form"]}
          onSubmit={(e) => handleSubmit(e)}
        >
          <h1>Register</h1>
          <div className={styles.labelAndError}>
            <label htmlFor="username">Username</label>
            {usernameError && (
              <div className={styles.error}>{usernameError}</div>
            )}
          </div>
          <div className={styles["input-container"]}>
            <input
              id="username"
              type="text"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="your-username..."
            />
          </div>
          <div className={styles.labelAndError}>
            <label htmlFor="password">Password</label>
            {passwordError && (
              <div className={styles.error}>{passwordError}</div>
            )}
          </div>
          <div className={styles["input-container"]}>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="********"
            />
          </div>
          <div className={styles.labelAndError}>
            <label htmlFor="password2">Repeat Password</label>
            {password2Error && (
              <div className={styles.error}>{password2Error}</div>
            )}
          </div>
          <div className={styles["input-container"]}>
            <input
              id="password2"
              type="password"
              name="password2"
              value={password2}
              onChange={(e) => {
                setPassword2(e.target.value);
              }}
              placeholder="********"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        <button
          className={styles["link-btn"]}
          onClick={() => props.onFormSwitch("Login")}
        >
          Already have an account? Login here.
        </button>
        <button onClick={autoFill}>Autofill</button>
      </div>
    </>
  );
}
