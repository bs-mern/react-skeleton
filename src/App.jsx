import { Container } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import NavBar from "./components/layout/NavBar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import UsersPage from "./pages/UsersPage";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <SnackbarProvider>
        <Container sx={{ mt: 2 }} maxWidth="xl">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </Container>
      </SnackbarProvider>
    </BrowserRouter>
  );
}
