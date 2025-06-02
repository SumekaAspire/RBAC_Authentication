import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

function UserPage() {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    navigate("/Login");
  };

  return (
    <div
      style={{
        padding: "50px",
        textAlign: "center",
        backgroundColor: "#e8f5e9",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2 style={{ color: "#2e7d32", marginBottom: "20px" }}>Welcome User</h2>
      <p style={{ fontSize: "18px", color: "#333" }}>
        This page is for user access only.
      </p>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "30px",
          padding: "12px 24px",
          backgroundColor: "#9b59b6",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default UserPage;
