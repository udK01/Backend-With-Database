import { useState } from "react";
import styles from "./InputField.module.css";
import axios from "axios";

export default function InputField(props) {
  const [mode, setMode] = useState("Add");

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  function getFormattedDate() {
    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
  }

  function addTransaction() {
    const textInput = document.getElementById("amount-text").value;
    const amountInput = document.getElementById("amount").value;

    if (textInput !== "" && amountInput !== "") {
      const transactionData = {
        account_number: props.user[0].account_number,
        transaction_type: "Add",
        transaction_text: textInput,
        transaction_amount: amountInput,
        transaction_date: getFormattedDate(),
        transaction_source: props.user[0].username,
      };

      axios
        .post("/api/transaction", transactionData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          document.getElementById("amount-text").value = "";
          document.getElementById("amount").value = "";
          props.onRefresh();
        })
        .catch((error) => {
          console.error("Error adding transaction:", error);
        });
    }
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
      <label htmlFor="amount-text">Text:</label>
      <input id="amount-text" type="text" />
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
