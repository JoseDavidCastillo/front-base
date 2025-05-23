import React, { useEffect, useState } from "react";
import { findAllUsers, createUser, updateUser, deleteUser } from "../services/user";

function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ nombre: "", correo: "", password: "", role: "USER" });
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await findAllUsers();
      setUsers(data);
    } catch (e) {
      setError("Error cargando usuarios");
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setForm({ nombre: user.nombre, correo: user.correo, password: "", role: user.role });
    setError(null);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este usuario?")) {
      try {
        await deleteUser(id);
        loadUsers();
      } catch {
        setError("Error eliminando usuario");
      }
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setEditingUser(null);
    setForm({ nombre: "", correo: "", password: "", role: "USER" });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (editingUser) {
        // Editar usuario
        await updateUser(editingUser.id, {
          nombre: form.nombre,
          correo: form.correo,
          password: form.password || undefined,
          role: form.role,
        });
      } else {
        // Crear usuario (no mandar id)
        await createUser({
          nombre: form.nombre,
          correo: form.correo,
          password: form.password,
          role: form.role,
        });
      }
      handleCancel();
      loadUsers();
    } catch (e) {
      setError(e.message || "Error guardando usuario");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Gestión de Usuarios</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <div>
          <label>Nombre:</label>
          <br />
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleFormChange}
            required
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Correo:</label>
          <br />
          <input
            type="email"
            name="correo"
            value={form.correo}
            onChange={handleFormChange}
            required
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Contraseña:</label>
          <br />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleFormChange}
            placeholder={editingUser ? "Dejar vacío para no cambiar" : ""}
            {...(editingUser ? {} : { required: true })}
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Rol:</label>
          <br />
          <select name="role" value={form.role} onChange={handleFormChange} required>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <button style={{ marginTop: 15 }} type="submit">
          {editingUser ? "Actualizar Usuario" : "Crear Usuario"}
        </button>
        {editingUser && (
          <button
            type="button"
            onClick={handleCancel}
            style={{ marginLeft: 10, backgroundColor: "gray", color: "white" }}
          >
            Cancelar
          </button>
        )}
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table border="1" cellPadding="5" cellSpacing="0" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.nombre}</td>
              <td>{u.correo}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => handleEditClick(u)}>Editar</button>
                <button
                  onClick={() => handleDeleteClick(u.id)}
                  style={{ marginLeft: 5, color: "red" }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsersPage;
