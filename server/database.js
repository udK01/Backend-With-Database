import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

// Create a MySQL connection pool
const db = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
  .promise();

export async function createUser(username, password) {
  const [result] = await db.query(
    `
  INSERT INTO users (username, password) 
  VALUES (?, ?)
  `,
    [username, password]
  );
  return result.insertId;
}

export async function getUsers() {
  const [x] = await db.query("SELECT * FROM users");
  return x;
}

export async function getUser(id) {
  const [x] = await db.query(`SELECT * FROM users WHERE userID = ?`, [id]);
  return x[0];
}

export async function deleteUser(id) {
  await db.query(`DELETE FROM users WHERE userID = ?`, [id]);
}

export async function updateUser(id, username, password) {
  await db.query(
    `UPDATE users SET username = ?, password = ? WHERE userID = ?`,
    [username, password, id]
  );
}

// Banking Test

// Account Management Code
function generateAccountNumber() {
  let accountNumber;
  let isUnique = false;

  while (!isUnique) {
    accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);
    isUnique = accountExists(accountNumber);
  }

  return accountNumber;
}

async function accountExists(accountNumber) {
  let [x] = await db.query("SELECT * FROM accounts WHERE account_number = ?", [
    accountNumber,
  ]);
  return x.length !== 0;
}

export async function createAccount(username, password) {
  try {
    let accountNumber = generateAccountNumber();

    await db.query(
      "INSERT INTO Accounts (account_number, username, password) VALUES (?, ?, ?)",
      [accountNumber, username, password]
    );
    console.log(`Account created for ${username}`);
  } catch (error) {
    console.log("Error adding account: ", error);
  }
}

export async function getAccount(username, password) {
  const [x] = await db.query(
    "SELECT * FROM Accounts WHERE username = ? AND password = ?",
    [username, password]
  );
  return x;
}

export async function getAccountByAccountNumber(account_number) {
  const [x] = await db.query(
    "SELECT * FROM Accounts WHERE account_number = ?",
    [account_number]
  );
  return x;
}

export async function getAccountNames() {
  const [x] = await db.query("SELECT username FROM Accounts");
  return x;
}

// Transaction Management Code

export async function addTransaction(
  account_number,
  transaction_type,
  transaction_text,
  transaction_amount,
  transaction_date,
  transaction_source
) {
  try {
    await db.query(
      "INSERT INTO Transactions (account_number, transaction_type, transaction_text, transaction_amount, transaction_date, transaction_source) VALUES (?, ?, ?, ?, ?, ?)",
      [
        account_number,
        transaction_type,
        transaction_text,
        transaction_amount,
        transaction_date,
        transaction_source,
      ]
    );
    console.log(
      `Added transaction: ${transaction_amount} into ${account_number}`
    );
  } catch (error) {
    console.log("Error adding transaction: ", error);
  }
}

export async function getTransactions() {
  const [x] = await db.query("SELECT * FROM transactions");
  return x;
}

export async function getTransactionsFromUser(account_number) {
  const [x] = await db.query(
    "SELECT * FROM transactions WHERE account_number = ?",
    [account_number]
  );
  return x;
}

export async function getTransaction(id) {
  const [x] = await db.query(
    `SELECT * FROM transactions WHERE transaction_id = ?`,
    [id]
  );
  return x[0];
}

export async function deleteTransaction(id) {
  await db.query(`DELETE FROM transactions WHERE transaction_id = ?`, [id]);
}
