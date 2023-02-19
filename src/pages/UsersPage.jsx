import { ArrowForward, Person } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../api/userApi";

export default function UsersPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const { data } = await getUsers();
    console.log(data);
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Paper sx={{ maxWidth: 600, m: "auto" }}>
      <Typography sx={{ p: 2 }} variant="h5">
        All Users
      </Typography>
      <List dense>
        {users.map((user, i) => {
          return (
            <ListItemButton component={Link} to="/">
              <ListItemAvatar>
                <Avatar>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.name} />
              <ListItemSecondaryAction>
                <IconButton component={Link} to="/xx">
                  <ArrowForward />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );
}
