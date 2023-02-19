import {
  Alert,
  Typography,
  Stack,
  TextField,
  Button,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useSnackbar } from "notistack";

import { login } from "../api/authApi";
import { useAuth } from "../contexts/authContext";

export default function LoginPage() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const auth = useAuth();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const [error, setError] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        const { data } = await login(values);
        setStatus({ success: true });
        setSubmitting(false);
        auth.login(data, () => {
          enqueueSnackbar(`Signed in as ${data.user.name}!`, {
            variant: "success",
          });
        });

        navigate(from, { replace: true });
      } catch (err) {
        const response = err.response.data;
        setError(response.error);
        setStatus({ success: false });
        setSubmitting(false);
      }
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
  });
  return (
    <>
      {error && (
        <Box sx={{ maxWidth: 350, mb: 2, mx: "auto" }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
      <Card sx={{ maxWidth: 350, m: "auto" }}>
        <CardContent sx={{ mx: 1 }}>
          <Typography sx={{ textAlign: "center" }} variant="h5">
            Login
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3} mt={2}>
              <TextField
                type="email"
                name="email"
                label="Email"
                variant="filled"
                {...formik.getFieldProps("email")}
                error={Boolean(formik.touched.email && formik.errors.email)}
                helperText={formik.touched.email ? formik.errors.email : ""}
              />
              <TextField
                type="password"
                name="password"
                label="Password"
                variant="filled"
                {...formik.getFieldProps("password")}
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                helperText={
                  formik.touched.password ? formik.errors.password : ""
                }
              />
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
