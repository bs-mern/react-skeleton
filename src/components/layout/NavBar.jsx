import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <AppBar elevation={0} position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          React Skeleton
        </Typography>
        <Button onClick={() => navigate("/")} color="inherit">
          Home
        </Button>
        <Button onClick={() => navigate("/users")} color="inherit">
          Users
        </Button>
      </Toolbar>
    </AppBar>
  );
}
