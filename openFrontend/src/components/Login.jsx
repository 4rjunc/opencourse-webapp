import * as React from "react";
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
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backgroundImage from "./background_img.jpeg"; // Replace with your image path
import logo from "./images/icon6.png";
import IconButton from "@mui/material/IconButton";



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
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: 0,
          left: 0,
          overflow: "hidden",
          
        }}
      >
     <div
        style={{
          backgroundColor: "rgba(4, 9, 24, 0.75)",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      ></div>
        
      <Container component="main"  maxWidth="xs">
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
          <Typography
          component="h1"
          variant="h5"
          style={{
            color: 'white', // Off-white color
            fontWeight: 'bold' // Make the font bold
          }}
        >
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
              InputProps={{
                style: { color: 'white' }
              }}
              
              
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
              InputProps={{
                style: { color: 'white' }
              }}
              
              
            />
            {/*<FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />*/}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2}}
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
            <Box sx={{ textAlign: "center", marginTop: 2 }}>
              <Typography variant="body2" color="textSecondary">
                   Nehru Arts and Science College
              </Typography>
            </Box>
          </Box>
        </Container>
      </div>
      </>
    );
};

export default Login;
