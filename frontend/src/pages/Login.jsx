import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/login", {
        username: data.username,
        password: data.password,
      });

      const token = response.data.token;

      dispatch({ type: "LOGIN", payload: token });
      localStorage.setItem("token", token);

      // decode token to get role
      const { role } = JSON.parse(atob(token.split('.')[1]));

      if (role === "admin") navigate("/admin");
      else if (role === "user") navigate("/user");
      else navigate("/");

    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Invalid username or password");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div style={formContainerStyle}>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
        <h2 style={headingStyle}>Login</h2>

        <input
          placeholder="Username"
          {...register("username", { required: "Username is required" })}
          style={inputStyle}
        />
        {errors.username && <span style={errorStyle}>{errors.username.message}</span>}

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          style={inputStyle}
        />
        {errors.password && <span style={errorStyle}>{errors.password.message}</span>}

        <button type="submit" style={buttonStyle}>
          Login
        </button>
      </form>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

const formContainerStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "100px",
};

const formStyle = {
  backgroundColor: "#fff",
  padding: "40px",
  borderRadius: "12px",
  boxShadow: "0 8px 16px rgba(0,0,0,0.25)",
  width: "320px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const headingStyle = {
  margin: 0,
  textAlign: "center",
  color: "#333",
};

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
  outline: "none",
};

const buttonStyle = {
  padding: "14px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#9b59b6",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
};

const errorStyle = {
  color: "red",
  fontSize: "14px",
  marginTop: "-10px",
};

export default Login;
