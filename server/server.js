import express from "express";
import cors from "cors";
import {
  createUser,
  deleteUser,
  updateUser,
  getUsers,
  getUser,
  createAccount,
  getAccount,
  getAccountNames,
  addTransaction,
  getTransaction,
  getTransactions,
  getTransactionsFromUser,
  deleteTransaction,
} from "./database.js"; // Import database methods

const PORT = 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/account", async (req, res) => {
  const { username, password } = req.body;
  try {
    await createAccount(username, password);
    res.status(200).json();
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ error: "Error creating account" });
  }
});

app.post("/api/transaction", async (req, res) => {
  try {
    await addTransaction();
    res.status(200).json();
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ error: "Error creating account" });
  }
});

app.get("/api/account", async (req, res) => {
  const { username, password } = req.query;

  try {
    const account = await getAccount(username, password);
    res.json(account);
  } catch (error) {
    console.error("Error getting account:", error);
    res.status(500).json({ error: "Error getting account" });
  }
});

app.get("/api/accountNames", async (req, res) => {
  try {
    const accountNames = await getAccountNames();
    res.json(accountNames);
  } catch (error) {
    console.error("Error getting account names:", error);
    res.status(500).json({ error: "Error getting account names" });
  }
});

app.get("/api/transactions", async (req, res) => {
  const account_number = req.query.account_number;

  try {
    const transactions = await getTransactionsFromUser(account_number);
    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Error fetching transactions" });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ error: "Internal server error. Please try again later." });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});

// app.post("/api/users", async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const userId = await createUser(username, password);
//     res.status(201).json({ id: userId, username, password });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ error: "Error creating user" });
//   }
// });

// app.get("/api/users", async (req, res) => {
//   try {
//     const users = await getUsers();
//     res.json(users);
//   } catch (error) {
//     console.error("Error getting users:", error);
//     res.status(500).json({ error: "Error getting users" });
//   }
// });

// app.get("/api/users/:id", async (req, res) => {
//   const userId = req.params.id;
//   try {
//     const user = await getUser(userId);
//     if (!user) {
//       res.status(404).json({ error: "User not found" });
//     } else {
//       res.json(user);
//     }
//   } catch (error) {
//     console.error("Error getting user:", error);
//     res.status(500).json({ error: "Error getting user" });
//   }
// });

// app.delete("/api/users/:id", async (req, res) => {
//   const userId = req.params.id;

//   try {
//     await deleteUser(userId);
//     res.status(200).json({ message: "User deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     res.status(500).json({ error: "Error deleting user" });
//   }
// });

// app.put("/api/users/:id", async (req, res) => {
//   const userId = req.params.id;
//   const { username, password } = req.body;

//   try {
//     await updateUser(userId, username, password);
//     res.status(200).json({ message: "User updated successfully" });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     res.status(500).json({ error: "Error updating user" });
//   }
// });
