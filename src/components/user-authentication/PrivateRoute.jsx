

// PrivateRoute.js
import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux"; // Assuming you use redux for user state or you can check localStorage

const PrivateRoute = () => {
  const role = localStorage.getItem("role");

  if (role != "admin") {
    return <Navigate to="/unauth_page" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
