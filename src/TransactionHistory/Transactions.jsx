import styles from "./Transactions.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Transactions(props) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/transactions?account_number=${props.user.account_number}`)
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
        <div className={styles["navigation-bar"]}>
          <div>
            <div>Hello, {props.user.username}!</div>
            <div>Account Number: {props.user.account_number}</div>
          </div>
          <div>
            <button className={styles["logout"]} onClick={props.onLogout}>
              Logout
            </button>
          </div>
        </div>
        {transactions.length !== 0 ? (
          transactions.map((transaction, i) => (
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
              <p className={styles["cell"]}>
                Transaction Source: {transaction.transaction_source}
              </p>
            </div>
          ))
        ) : (
          <p>No Transactions Yet</p>
        )}
      </div>
    </>
  );
}
