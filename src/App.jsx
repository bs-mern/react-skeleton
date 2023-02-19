import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { AuthProvider } from "./contexts/authContext";
import AppRoutes from "./AppRoutes";

export default function App() {
  return (
    <AuthProvider>
      <SnackbarProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </SnackbarProvider>
    </AuthProvider>
  );
}
