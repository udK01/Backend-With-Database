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

  function addTransaction(type = "Add", text = "", amount = 0) {
    const textToUse =
      text === "" ? document.getElementById("amount-text").value : text;
    const amountToUse =
      amount === 0 ? document.getElementById("amount").value : amount;

    if (textToUse !== "" && amountToUse !== "") {
      const transactionData = {
        account_number: props.user[0].account_number,
        transaction_type: type,
        transaction_text: textToUse,
        transaction_amount: amountToUse,
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

  async function addTransfer() {
    const account_number = document.getElementById("account-number").value;
    const textInput = document.getElementById("amount-text").value;
    const amountInput = document.getElementById("amount").value;

    if ((await accountExists(account_number)) && amountInput > 0) {
      if (textInput !== "" && amountInput !== "") {
        const transactionData = {
          account_number: account_number,
          transaction_type: "Transfer",
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
            addTransaction("Transfer", textInput, amountInput * -1);
            document.getElementById("account-number").value = "";
            document.getElementById("amount-text").value = "";
            document.getElementById("amount").value = "";
            props.onRefresh();
          })
          .catch((error) => {
            console.error("Failed to transfer:", error);
          });
      }
    } else {
      console.error("Incorrect Transfer!");
    }
  }

  async function accountExists(account_number) {
    try {
      const response = await axios.get("/api/account_number", {
        params: {
          account_number: account_number,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data.length > 0;
    } catch (error) {
      console.error("Failed to get account:", error);
      return false;
    }
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
        <button className={styles["add-btn"]} onClick={() => addTransaction()}>
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
