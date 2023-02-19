import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  let token = localStorage.getItem("token");

  if (token) auth.setLoggedIn(true);

  if (token) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}
