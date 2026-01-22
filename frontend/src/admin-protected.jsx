import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState(null); 

  useEffect(() => {
    const validate = async () => {
      console.log("Validating admin auth...");
      try {
        const res = await axios.post(
          "http://localhost:3000/ec/validate",
          {}, // 👈 empty body
          {
            withCredentials: true // 👈 config goes here
          }
        );
        setIsAuth(res.data.valid);
      } catch (err) {
        setIsAuth(false);
      }
    };

    validate();
  }, []);
  if (isAuth === null) {
    return <div>Checking authentication...</div>;
  }

  if (!isAuth) {
    return <Navigate to="/ec-login" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
