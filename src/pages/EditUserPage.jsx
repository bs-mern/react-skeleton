import { useState, useEffect } from "react";
import {
  Alert,
  Typography,
  Stack,
  TextField,
  Button,
  Card,
  CardContent,
  Box,
  LinearProgress,
} from "@mui/material";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import * as Yup from "yup";
import jwtDecode from "jwt-decode";
import { getUser, updateUser } from "../api/userApi";

export default function EditUserPage() {
  const currentUserId = jwtDecode(localStorage.getItem("token"))._id;
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState("");

  const handleSubmit = async (values, formikProps) => {
    const { setStatus, setSubmitting, setFieldError } = formikProps;
    console.log(Object.keys(formikProps));
    try {
      const { data } = await updateUser(id, values);
      setStatus({ success: true });
      setSubmitting(false);
      enqueueSnackbar("User profile updated successfully!", {
        variant: "success",
      });
      navigate(`/users/${data._id}`);
    } catch (err) {
      const response = err.response.data;
      setError(response._message);
      setFieldError("name", response.errors.name?.message);
      setFieldError("email", response.errors.email?.message);
      setFieldError("password", response.errors.password?.message);
      setStatus({ success: false });
      setSubmitting(false);
    }
  };

  const schema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name should be at least 3 characters long")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().min(
      6,
      "Password should be at least 6 characters long"
    ),
  });

  const fetchUser = (userId) => {
    getUser(userId).then((resp) => {
      console.log(resp.data);
      setUser(resp.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchUser(id);
  }, [id]);

  const [showed, setShowed] = useState(false);

  if (id !== currentUserId) {
    enqueueSnackbar("You can only update your own profile", {
      variant: "error",
    });
    return <Navigate to="/" />;
  }

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
            Edit User
          </Typography>
          {loading ? (
            <Box sx={{ px: 3, py: 4 }}>
              <LinearProgress />
            </Box>
          ) : (
            <Formik
              onSubmit={handleSubmit}
              initialValues={{
                name: user.name,
                email: user.email,
                password: "",
              }}
              validationSchema={schema}
            >
              {(formik) => {
                return (
                  <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={3} mt={2}>
                      <TextField
                        name="name"
                        label="Name"
                        variant="filled"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={Boolean(
                          formik.touched.name && formik.errors.name
                        )}
                        helperText={
                          formik.touched.name ? formik.errors.name : ""
                        }
                      />
                      <TextField
                        type="email"
                        name="email"
                        label="Email"
                        variant="filled"
                        {...formik.getFieldProps("email")}
                        error={Boolean(
                          formik.touched.email && formik.errors.email
                        )}
                        helperText={
                          formik.touched.email ? formik.errors.email : ""
                        }
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
                        Submit
                      </Button>
                    </Stack>
                  </form>
                );
              }}
            </Formik>
          )}
        </CardContent>
      </Card>
    </>
  );
}
