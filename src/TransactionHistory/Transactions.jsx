import styles from "./Transactions.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Transactions(props) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get("/api/transactions")
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["title"]}>
          <div>Hello, {props.user.username}!</div>
          <div>Account Number: {props.user.account_number}</div>
        </div>
        {transactions.map((transaction, i) => (
          <div key={i} className={styles["row"]}>
            <p className={styles["cell"]}>
              Transaction ID: {transaction.transaction_id}
            </p>
            <p className={styles["cell"]}>
              Account Number: {transaction.account_number}
            </p>
            <p className={styles["cell"]}>
              Transaction Type: {transaction.transaction_type}
            </p>
            <p className={styles["cell"]}>
              Transaction Text: {transaction.transaction_text}
            </p>
            <p className={styles["cell"]}>
              Transaction Amount: {transaction.transaction_amount}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
