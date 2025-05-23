import React, { useEffect, useState } from "react";
import { findAllExtras, createExtra, updateExtra, deleteExtra } from "../services/extra";

function ExtraPage() {
  const [extras, setExtras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    createdAt: "",
    updatedAt: "",
  });

  useEffect(() => {
    loadExtras();
  }, []);

  async function loadExtras() {
    setLoading(true);
    try {
      const data = await findAllExtras();
      setExtras(data);
      setError(null);
    } catch (e) {
      setError(e.message || "Error cargando datos");
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((old) => ({ ...old, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        await updateExtra(formData.id, formData);
      } else {
        await createExtra(formData);
      }
      setEditing(false);
      setFormData({ id: "", name: "", description: "", createdAt: "", updatedAt: "" });
      await loadExtras();
    } catch (e) {
      alert(e.message || "Error guardando");
    }
  };

  const handleEdit = (extra) => {
    setEditing(true);
    setFormData(extra);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este dato?")) return;
    try {
      await deleteExtra(id);
      await loadExtras();
    } catch (e) {
      alert(e.message || "Error eliminando");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Gestión de Datos Extras</h2>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table border="1" cellPadding="5" style={{ width: "100%", marginBottom: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Creado</th>
            <th>Actualizado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {extras.length === 0 && !loading && (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No hay datos.
              </td>
            </tr>
          )}
          {extras.map((extra) => (
            <tr key={extra.id}>
              <td>{extra.id}</td>
              <td>{extra.name}</td>
              <td>{extra.description}</td>
              <td>{extra.createdAt}</td>
              <td>{extra.updatedAt}</td>
              <td>
                <button onClick={() => handleEdit(extra)}>Editar</button>{" "}
                <button onClick={() => handleDelete(extra.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <h3>{editing ? "Editar" : "Crear"} dato extra</h3>
        <div>
          <label>Nombre:</label>
          <br />
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <br />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
          />
        </div>
        <div>
          <label>Fecha creación:</label>
          <br />
          <input
            type="date"
            name="createdAt"
            value={formData.createdAt}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Fecha actualización:</label>
          <br />
          <input
            type="date"
            name="updatedAt"
            value={formData.updatedAt}
            onChange={handleChange}
          />
        </div>

        <button type="submit" style={{ marginTop: 10 }}>
          {editing ? "Guardar" : "Crear"}
        </button>
        {editing && (
          <button
            type="button"
            onClick={() => {
              setEditing(false);
              setFormData({ id: "", name: "", description: "", createdAt: "", updatedAt: "" });
            }}
            style={{ marginLeft: 10 }}
          >
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
}

export default ExtraPage;
