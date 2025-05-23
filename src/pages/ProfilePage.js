import React, { useState } from "react";
import { updateUser } from "../services/user";

function ProfilePage({ user, onUpdate }) {
  const [nombre, setNombre] = useState(user.nombre || "");
  const [correo, setCorreo] = useState(user.correo || "");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);

    try {
      const updatedUser = await updateUser(user.id, {
        nombre,
        correo,
        password: password || undefined,
      });

      onUpdate(updatedUser);
      setMensaje("Perfil actualizado correctamente");
      setPassword("");
    } catch (err) {
      setError(err.message || "Error actualizando perfil");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Mi Perfil</h2>
      <form onSubmit={handleUpdate}>
        <div style={{ marginTop: 10 }}>
          <label>Nombre:</label>
          <br />
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
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
          <label>Nueva contraseña (opcional):</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Dejar vacío para no cambiar"
          />
        </div>
        <button style={{ marginTop: 20 }} type="submit">
          Guardar cambios
        </button>
      </form>
      {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default ProfilePage;
