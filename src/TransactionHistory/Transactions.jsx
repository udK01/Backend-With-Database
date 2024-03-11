import { useEffect, useState } from "react";
import axios from "axios";

export default function Transactions() {
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
      <div>Hello!</div>
      {transactions.map((transaction, i) => (
        <div key={i}>
          <p>Transaction ID: {transaction.transaction_id}</p>
          <p>Account Number: {transaction.account_number}</p>
          <p>Transaction Type: {transaction.transaction_type}</p>
          <p>Transaction Text: {transaction.transaction_text}</p>
          <p>Transaction Amount: {transaction.transaction_amount}</p>
        </div>
      ))}
    </>
  );
}
