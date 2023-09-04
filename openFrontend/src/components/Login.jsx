import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import LoginIcon from '@mui/icons-material/Login';
//import FormControlLabel from '@mui/material/FormControlLabel';
//import Checkbox from '@mui/material/Checkbox';
//import Link from '@mui/material/Link';
//import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import SchoolIcon from "@mui/icons-material/School";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";




const Login = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    console.log(data);
    //Login is not complete about fix 1) session_token handling 2) unauthorizes asses to /course
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SECRET_KEY}openApi/api/login/`,
        data
      );
      const token = response.data["session_token"];
      const staff = response.data["staff"];
      console.log("Login Response",response.data);
      localStorage.setItem("token", token);
      const regno = encodeURIComponent(username); // URL-encode the email
      let url
      if (!staff) {
        url = `/course/?regno=${regno}`;
      } else if (staff) { // Use regexadmin.test() here
        url = `/administrator`; // Correct the typo in the URL path as well
      }
      setSnackbarOpen(true);
      setSnackbarMessage("Login successful!");
      setSnackbarSeverity("success");

      setTimeout(()=>{
        navigate(url);
      }, 1500)
      
    } catch (error) {
      console.error("Login failed:", error);
      setSnackbarOpen(true);
      setSnackbarMessage("Login failed. Please check your credentials.");
      setSnackbarSeverity("error");
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <SchoolIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Open Course Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="regno"
              label="Register Number"
              name="regno"
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              placeholder="YYYY-MM-DD"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/*<FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />*/}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
              startIcon={<LoginIcon/>}
            >
              Login
            </Button>
            <Box sx={{textAlign:"center"}}>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={5000}
              onClose={handleSnackbarClose}
              //style={{padding:"20rem 31.2rem"}}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleSnackbarClose}
                severity={snackbarSeverity}
              >
                {snackbarMessage}
              </MuiAlert>
            </Snackbar>
            </Box>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>*/}

          </Box>
        </Box>
      </Container>
      </>

  );
};

export default Login;
