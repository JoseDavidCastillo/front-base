const API_URL = "http://localhost:8080/api/users";

/**
 * Inicia sesión con correo y password
 * @returns objeto user o error
 */
export async function login(correo, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo, password }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error en la solicitud");
  }

  return await response.json();
}

/**
 * Crea usuario enviando todo el objeto, incluido id y role
 * Útil para actualizar o crear con id definido (cuidado con IDs repetidos)
 * @param {Object} user
 */
export async function createUserWithId(user) {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error al crear usuario");
  }

  return await response.json();
}

/**
 * Crea usuario enviando todo menos id
 * El backend debe generar un id único y asignar role por defecto
 * @param {Object} user
 */
export async function createUser(user) {
  // Clonamos user y eliminamos id si existe
  const { id, ...userWithoutId } = user;

  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userWithoutId),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error al crear usuario");
  }

  return await response.json();
}

/**
 * Actualiza usuario con id
 * @param {string} id
 * @param {Object} user
 */
export async function updateUser(id, user) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error al actualizar usuario");
  }

  return await response.json();
}

/**
 * Obtiene todos los usuarios
 */
export async function findAllUsers() {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) {
    throw new Error("Error al obtener usuarios");
  }
  return await response.json();
}

/**
 * Obtiene usuario por id
 * @param {string} id
 */
export async function findUserById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error al obtener usuario");
  }
  return await response.json();
}

/**
 * Obtiene usuario por correo
 * @param {string} correo
 */
export async function findUserByCorreo(correo) {
  const response = await fetch(`${API_URL}/correo/${encodeURIComponent(correo)}`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error al obtener usuario");
  }
  return await response.json();
}

/**
 * Obtiene usuarios por rol
 * @param {string} role
 */
export async function findUsersByRole(role) {
  const response = await fetch(`${API_URL}/role/${encodeURIComponent(role)}`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error al obtener usuarios");
  }
  return await response.json();
}

/**
 * Elimina usuario por id
 * @param {string} id
 */
export async function deleteUser(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error al eliminar usuario");
  }

  return true;
}
