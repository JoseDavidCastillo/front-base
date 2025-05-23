import React, { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <>
      {!user ? (
        <LoginPage
          onLogin={(user) => {
            setUser(user);
          }}
        />
      ) : (
        <HomePage
          user={user}
          onLogout={() => {
            setUser(null);
          }}
          onUpdateUser={(updatedUser) => {
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
          }}
        />
      )}
    </>
  );
}

export default App;
