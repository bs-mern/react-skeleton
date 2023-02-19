import { Delete, Edit, Person } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  LinearProgress,
  List,
  ListItemAvatar,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUser } from "../api/userApi";

export default function UserProfilePage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const { id } = useParams();

  const fetchUser = async (userId) => {
    const { data } = await getUser(userId);
    setUser(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUser(id);
  }, [id]);

  return (
    <Paper sx={{ maxWidth: 600, m: "auto" }}>
      <Typography sx={{ p: 2 }} variant="h5">
        Profile
      </Typography>
      {loading ? (
        <Box sx={{ px: 3, py: 4 }}>
          <LinearProgress />
        </Box>
      ) : (
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Person />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.email} />
            <ListItemSecondaryAction>
              <IconButton component={Link} to={`/users/${user._id}/edit`}>
                <Edit />
              </IconButton>
              <IconButton component={Link} to="/edit">
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={"Joined: " + new Date(user.createdAt).toDateString()}
            />
          </ListItem>
        </List>
      )}
    </Paper>
  );
}
