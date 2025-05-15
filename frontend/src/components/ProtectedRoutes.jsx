import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token, navigate]);


  return children;
}

export default ProtectedRoutes;
