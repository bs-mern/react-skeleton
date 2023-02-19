import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function MainLayout() {
  return (
    <>
      <NavBar />
      <Container sx={{ mt: 2 }} maxWidth="xl">
        <Outlet />
      </Container>
    </>
  );
}
