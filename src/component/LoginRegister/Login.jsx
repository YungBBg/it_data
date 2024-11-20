import * as React from 'react';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import logo from "/src/assets/img/logo/logo.jpeg";
import { AiFillTwitterCircle } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import { BsInstagram } from 'react-icons/bs';
import './Login.css'


const defaultTheme = createTheme();

export default function SignInSide() {
  const [userType, setUserType] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    if (email === '') {
      setErrorMessage("The email that you've entered is incorrect. Forgotten email?");
    } else if (password === '') {
      setErrorMessage("The password that you've entered is incorrect. Forgotten password?");
    } else {
      if (email === 'restaurant@gmail.com' && password === '123456') {
        setUserType('restaurantAdmin');
        window.location.href = "/restaurantAdmin"
        localStorage.setItem("loginInfo", "restaurant@gmail.com");
      } else if (email === 'customer@gmail.com' && password === '123456') {
        setUserType('Customer');
        window.location.href = "/";
        localStorage.setItem("loginInfo", "customer@gmail.com");
      } else if (email === 'delivery@gmail.com' && password === '123456') {
        setUserType('Delivery');
        window.location.href = "/deliveryUser"
        localStorage.setItem("loginInfo", "delivery@gmail.com");
      } else if (email === 'admin@gmail.com' && password === '123456') {
        setUserType('Admin');
        window.location.href = "/Admin"
        localStorage.setItem("loginInfo", "admin@gmail.com");
      } else {
        setUserType('');
        setErrorMessage("The email/password that you've entered is incorrect.");
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?food)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <img src={logo} alt="Logo" style={{ width: 350, height: 350 }} />

            <Typography component="h1" variant="h5">
              Hi, Welcome Back Yummy Restaurant
            </Typography>
            <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address / Username"
                name="email"
                autoComplete="email"
                autoFocus
                defaultValue={"admin@gmail.com"}
                error={errorMessage !== ''}
                helperText={errorMessage}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                defaultValue={"123456"}
                error={errorMessage !== ''}
                helperText={errorMessage}
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link onClick={() => { window.location.href = "/src/component/LoginRegister/ForgotPassword.html" }} variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link onClick={() => { window.location.href = "/src/component/LoginRegister/UserType.html" }} variant="body2" >
                    Register
                  </Link>
                </Grid>
              </Grid>
              <Grid>
                <br></br>
              </Grid>
              <Grid style={{ display: 'flex', justifyContent: 'space-between' }}>
                <BsFacebook className="icons facebook icon" />
                <AiFillTwitterCircle className="icons twitter icon" />
                <BsInstagram className="icons instagram icon" />
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}