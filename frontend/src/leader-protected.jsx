import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NotFound from "./pages/NotFound";

const LeaderProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState(true); 

  // useEffect(() => {
  //   const validate = async () => {
  //     try {
  //       const res = await axios.get(
  //         "http://localhost:3000/leader/validate",
  //         {},
  //         {
  //           withCredentials: true // REQUIRED for cookies
  //         }
  //       );
  //       setIsAuth(res.data.valid);
  //     } catch (err) {
  //       setIsAuth(false);
  //     }
  //   };

  //   validate();
  // }, []);
  if (isAuth === null) {
    return <div>Checking authentication...</div>;
  }

  if (isAuth === false) {
    return <Navigate to="/leader-auth" replace />;
  }

  return <Outlet />;
};

export default LeaderProtectedRoute;
