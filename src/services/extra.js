const API_URL = "http://localhost:8080/api/extra"; // Cambia el endpoint según el futuro backend

export async function findAllExtras() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener datos extras");
  return await res.json();
}

export async function createExtra(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Error creando dato extra");
  }
  return await res.json();
}

export async function updateExtra(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Error actualizando dato extra");
  }
  return await res.json();
}

export async function deleteExtra(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Error eliminando dato extra");
  }
  return true;
}
