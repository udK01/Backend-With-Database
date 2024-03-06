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
  console.log(`User Deleted!`);
}
