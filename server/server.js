import express from "express";
import cors from "cors";
import { createUser, getUsers, getUser } from "./database.js"; // Import database methods

const PORT = 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/users", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userId = await createUser(username, password);
    res.status(201).json({ id: userId, username, password });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: "Error getting users" });
  }
});

app.get("/api/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await getUser(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ error: "Error getting user" });
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
