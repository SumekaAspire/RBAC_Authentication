import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

//jwtDecode decodes the JWT token to extract role and expiration info.


const ProtectedRoute = ({ children, allowedRoles }) => {
  //checks if the user is loggedIN, if not redirect to login page
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/Login"/>;

  try {
    const decoded = jwtDecode(token);
    const { role, exp } = decoded;// extract role and expiration info

    if (Date.now() >= exp * 1000) { // check token is expired, exp in second so multiple with 1000, date.now in millseconds, 
      localStorage.removeItem("token");
      return <Navigate to="/Login"/>;
    }

    //user role is not allowed for this route, direct to homepage
    if (!allowedRoles.includes(role)) {
      return <Navigate to="/"/>;
    }

    return children; // user authenticated and authorized , render protected child component
  } catch (error) {// token is corrupted
    localStorage.removeItem("token");
    return <Navigate to="/Login" />;
  }
};

export default ProtectedRoute;
