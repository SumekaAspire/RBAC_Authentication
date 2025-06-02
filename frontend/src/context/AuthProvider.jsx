// src/context/AuthContext.js
import React, { createContext, useReducer } from "react";

const initialState = {
  token: localStorage.getItem("token") || null,
};

export const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, token: action.payload };
    case "LOGOUT":
      return { ...state, token: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
