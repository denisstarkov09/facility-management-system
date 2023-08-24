/* eslint-disable react/prop-types */
import React from "react";
import useValidUser from "layouts/authentication/hooks/useValidUser";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isValidUser } = useValidUser();
  if (!isValidUser) {
    return <Navigate to="/authentication/sign-in" />;
  }
  return children;
}

export default ProtectedRoute;
