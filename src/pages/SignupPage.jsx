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
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signUp } from "../api/userApi";

export default function SignupPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        const { data } = await signUp(values);
        setStatus({ success: true });
        setSubmitting(false);
        enqueueSnackbar(data.message, { variant: "success" });
        navigate("/");
      } catch (err) {
        const response = err.response.data;
        setError(response._message);
        formik.errors.name = response.errors.name?.message;
        formik.errors.email = response.errors.email?.message;
        formik.errors.password = response.errors.password?.message;
        setStatus({ success: false });
        setSubmitting(false);
      }
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(3, "Name should be at least 3 characters long")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password should be at least 6 characters long")
        .required("Password is required"),
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
            Sign Up
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3} mt={2}>
              <TextField
                name="name"
                label="Name"
                variant="filled"
                {...formik.getFieldProps("name")}
                error={Boolean(formik.touched.name && formik.errors.name)}
                helperText={formik.touched.name ? formik.errors.name : ""}
              />
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
                Sign Up
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
