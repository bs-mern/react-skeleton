import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import unicornbikeImg from "../assets/images/unicornbike.jpg";

export default function HomePage() {
  return (
    <Card sx={{ maxWidth: 600, margin: "auto" }}>
      <Typography sx={{ p: 2 }} variant="h5">
        Home Page
      </Typography>
      <CardMedia
        component="img"
        image={unicornbikeImg}
        title="Unicorn Bicycle"
      />
      <CardContent>
        <Typography variant="body2">
          Welcome to the React Skeleton Home Page
        </Typography>
      </CardContent>
    </Card>
  );
}
