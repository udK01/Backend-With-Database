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
  const [rows] = await db.query("SELECT * FROM users");
  return rows;
}

export async function getUser(id) {
  const [rows] = await db.query(`SELECT * FROM users WHERE userID = ?`, [id]);
  return rows[0];
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

async function insertUniqueAccount(username, password) {
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

// Transaction Management Code
