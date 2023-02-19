import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <AppBar elevation={0} position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          React Skeleton
        </Typography>
        <Button component={Link} to="/" color="inherit">
          Home
        </Button>
        <Button component={Link} to="/signup" color="inherit">
          Signup
        </Button>
        <Button component={Link} to="/users" color="inherit">
          Users
        </Button>
      </Toolbar>
    </AppBar>
  );
}
