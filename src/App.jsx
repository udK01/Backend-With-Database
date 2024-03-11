import { useState } from "react";
import History from "./components/UserHistory/History";
import Transactions from "./TransactionHistory/Transactions";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

export default function App() {
  const [user, setUser] = useState([]);
  const [currentForm, setCurrentForm] = useState("Login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  function handleLogin(userData) {
    setUser(userData);
  }

  function handleLogout() {
    setUser([]);
  }

  return (
    <>
      {user.length == 0 ? (
        currentForm === "Login" ? (
          <Login onFormSwitch={toggleForm} onLogin={handleLogin} />
        ) : (
          <Register onFormSwitch={toggleForm} />
        )
      ) : (
        <Transactions user={user[0]} onLogout={handleLogout} />
      )}
    </>
  );
}
