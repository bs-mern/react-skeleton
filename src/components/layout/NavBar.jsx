import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { useSnackbar } from "notistack";

export default function NavBar() {
  const auth = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const logoutHandler = () => {
    auth.logout(() => {
      enqueueSnackbar("You have signed out", {
        variant: "info",
      });
    });
  };

  return (
    <AppBar elevation={0} position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          React Skeleton
        </Typography>
        <Button component={Link} to="/" color="inherit">
          Home
        </Button>

        {auth.loggedIn ? (
          <Button onClick={logoutHandler} color="inherit">
            Logout
          </Button>
        ) : (
          <>
            <Button component={Link} to="/signup" color="inherit">
              Signup
            </Button>
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
          </>
        )}

        <Button component={Link} to="/users" color="inherit">
          Users
        </Button>
      </Toolbar>
    </AppBar>
  );
}
