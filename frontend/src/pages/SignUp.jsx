import React from "react";
import { useForm } from "react-hook-form";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("/register", {
        username: data.username,
        password: data.password,
        // email: data.email,
        // phone: data.phone,
        role: "user", // force user role on signup
      });
      toast.success("Sign up successful!");
      reset();
      setTimeout(() => {
        navigate("/Login");
      }, 3000);
    } catch (err) {
      toast.error("Signup failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div style={formContainerStyle}>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
        <h2 style={headingStyle}>Sign Up</h2>

        <input
          placeholder="Username"
          {...register("username", {
            required: "Username is required",
            minLength: { value: 3, message: "At least 3 chars" },
            maxLength: { value: 20, message: "Max 20 chars" },
          })}
          style={inputStyle}
        />
        {errors.username && <span style={errorStyle}>{errors.username.message}</span>}

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "At least 6 chars" },
            validate: (val) => val.includes("@") || "Password must include '@'",
          })}
          style={inputStyle}
        />
        {errors.password && <span style={errorStyle}>{errors.password.message}</span>}

        {/* <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: 'Invalid email address',
          },
          })}
          style={inputStyle}
        />
        {errors.email && <span style={errorStyle}>{errors.email.message}</span>}

        <input
          placeholder="Phone Number"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10}$/, 
              message: "Invalid phone number",
            },
          })}
          style={inputStyle}
        />
        {errors.phone && <span style={errorStyle}>{errors.phone.message}</span>} */}

        <button type="submit" style={buttonStyle}>
          Register
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

export default SignUp;
