import React, { useState } from "react";
import ProfilePage from "./ProfilePage";
import AdminUsersPage from "./AdminUsersPage";
import ExtraPage from "./ExtraPage";

function HomePage({ user, onLogout }) {
  const [page, setPage] = useState("profile"); // "profile", "users", "extra"

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <nav
        style={{
          width: 220,
          backgroundColor: "#007bff",
          color: "white",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h3>Menú</h3>
          <button
            onClick={() => setPage("profile")}
            style={{
              width: "100%",
              marginBottom: 10,
              padding: 10,
              backgroundColor: page === "profile" ? "#0056b3" : "#007bff",
              border: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            Mi Perfil
          </button>

          {user.role === "ADMIN" && (
            <>
              <button
                onClick={() => setPage("users")}
                style={{
                  width: "100%",
                  marginBottom: 10,
                  padding: 10,
                  backgroundColor: page === "users" ? "#0056b3" : "#007bff",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Gestión Usuarios
              </button>

              <button
                onClick={() => setPage("extra")}
                style={{
                  width: "100%",
                  marginBottom: 10,
                  padding: 10,
                  backgroundColor: page === "extra" ? "#0056b3" : "#007bff",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Datos Extras
              </button>
            </>
          )}

          {/* Si quieres que ExtraPage sea para todos, saca esta condición */}
        </div>

        <button
          onClick={onLogout}
          style={{
            backgroundColor: "red",
            border: "none",
            color: "white",
            padding: 10,
            cursor: "pointer",
          }}
        >
          Cerrar Sesión
        </button>
      </nav>

      {/* Contenido */}
      <main style={{ flex: 1, padding: 20, overflowY: "auto" }}>
        {page === "profile" && <ProfilePage user={user} onUserUpdate={() => {}} />}
        {page === "users" && user.role === "ADMIN" && <AdminUsersPage />}
        {page === "extra" && <ExtraPage />}
      </main>
    </div>
  );
}

export default HomePage;
