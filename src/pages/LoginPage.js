import React, { useState } from "react";
import { login, createUser } from "../services/user";

function LoginPage({ onLogin }) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    try {
      if (isRegister) {
        const newUser = await createUser({ nombre, correo, password , role: "USER"});
        onLogin(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
      } else {
        const user = await login(correo, password);
        onLogin(user);
        localStorage.setItem("user", JSON.stringify(user));
      }
    } catch (err) {
      // Mostrar siempre mensaje fijo
      setError(true);
    }
  };

  return (
    <div style={{ maxWidth: 350, margin: "auto", paddingTop: 50 }}>
      <h2>{isRegister ? "Registrar" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <div>
            <label>Nombre:</label>
            <br />
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required={isRegister}
            />
          </div>
        )}
        <div style={{ marginTop: 10 }}>
          <label>Correo:</label>
          <br />
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Contraseña:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button style={{ marginTop: 20 }} type="submit">
          {isRegister ? "Registrar" : "Ingresar"}
        </button>
      </form>

      <p style={{ marginTop: 20 }}>
        {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
        <button
          onClick={() => {
            setError(false);
            setIsRegister(!isRegister);
          }}
          style={{
            color: "blue",
            background: "none",
            border: "none",
            cursor: "pointer",
            textDecoration: "underline",
            padding: 0,
            fontSize: "1em",
          }}
        >
          {isRegister ? "Iniciar sesión" : "Registrarse"}
        </button>
      </p>

      {error && (
        <p style={{ color: "red" }}>
          Correo o contraseña inválido. Por favor verifica.
        </p>
      )}
    </div>
  );
}

export default LoginPage;
