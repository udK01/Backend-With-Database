import { useState } from "react";
import styles from "./InputField.module.css";
import axios from "axios";

export default function InputField(props) {
  const [mode, setMode] = useState("Add");

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  function addTransaction() {
    // Logic to add transaction
    console.log("Transaction added");
  }

  function addTransfer() {
    // Logic to add transfer
    console.log("Transfer added");
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["btn-container"]}>
        <button
          className={
            mode === "Add"
              ? `${styles.options} ${styles.active}`
              : styles.options
          }
          onClick={() => handleModeChange("Add")}
        >
          Add
        </button>
        <button
          className={
            mode === "Transfer"
              ? `${styles.options} ${styles.active}`
              : styles.options
          }
          onClick={() => handleModeChange("Transfer")}
        >
          Transfer
        </button>
      </div>
      {mode === "Transfer" && (
        <>
          <label htmlFor="account-number">Account Number:</label>
          <input id="account-number" type="number" />
        </>
      )}
      <label htmlFor="amount">Amount:</label>
      <input id="amount" type="number" />
      {mode === "Add" ? (
        <button className={styles["add-btn"]} onClick={addTransaction}>
          Add
        </button>
      ) : (
        <button className={styles["transfer-btn"]} onClick={addTransfer}>
          Transfer
        </button>
      )}
    </div>
  );
}
