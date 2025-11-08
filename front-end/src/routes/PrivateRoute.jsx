import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    return token && user?.role === "admin" ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
