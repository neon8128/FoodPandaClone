import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2'
import { useState } from 'react';
import { linearProgressClasses } from '@mui/material';


const theme = createTheme();

const schema = yup.object().shape({
  username:yup
  .string()
  .required("Username is required")
  .min(5,"Username should have at least 5 characters!"),
  email:yup
  .string()
  .required("Email is required")
  .email("Invalid email!"),

})

const Register =()  =>{

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    mode:"onBlur",
    resolver:yupResolver(schema)
  });
  const [success,setSuccess] = useState(false);
    const navigate = useNavigate();
  
  const onSubmit = async (formData) => {
   // event.preventDefault();
   console.log(formData);
    const url = "https://localhost:44321/auth/register";
   // const data = new FormData(formData);
   // console.log(data);
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password: formData.password,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res)=>{
        Swal.fire("Great Job!","You have succesfully registered!","success")
        navigate('/login');
      })
      .catch((err)=>{
        Swal.fire({
          title: 'Error!',
          text: "Something happened",
          icon: 'error',
          confirmButtonText: 'Cool'
        })
        console.log(err);
      })
      
     
  };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate  onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  {...register("username")}
                  error={!!errors.username}
                  helperText={errors?.username?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password", { required: "Password is required." })}
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                />
              </Grid>
             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="" variant="body2" onClick={() => navigate('/login')} >
                  Already have an account? Sign in
                </Link>
               
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Register;