import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.loggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
