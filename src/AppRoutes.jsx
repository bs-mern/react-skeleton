import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import RequireAuth from "./components/RequireAuth";
import EditUserPage from "./pages/EditUserPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserProfilePage from "./pages/UserProfilePage";
import UsersPage from "./pages/UsersPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route
          path="/users/:id"
          element={
            <RequireAuth>
              <UserProfilePage />
            </RequireAuth>
          }
        />
        <Route
          path="/users/:id/edit"
          element={
            <RequireAuth>
              <EditUserPage />
            </RequireAuth>
          }
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}
