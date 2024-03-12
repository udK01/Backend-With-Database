import { useEffect, useState } from "react";
import History from "./components/UserHistory/History";
import Transactions from "./TransactionHistory/Transactions";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import InputField from "./components/InputField/InputField";

export default function App() {
  const [user, setUser] = useState([]);
  const [rememberUser, setRememberUser] = useState(false);
  const [currentForm, setCurrentForm] = useState("Login");

  useEffect(() => {
    if (user.length > 0) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [rememberUser]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  function handleLogin(userData, stayLoggedIn) {
    setUser(userData);
    setRememberUser(stayLoggedIn);
  }

  function handleLogout() {
    setUser([]);
    localStorage.removeItem("user");
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
      <InputField />
    </>
  );
}
