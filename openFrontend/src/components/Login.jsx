import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import LoginIcon from "@mui/icons-material/Login";
//import FormControlLabel from '@mui/material/FormControlLabel';
//import Checkbox from '@mui/material/Checkbox';
//import Link from '@mui/material/Link';
//import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import NavBar from "./NavBar";


const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#228B22',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#228B22',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'grey',
    },
    '&:hover fieldset': {
      borderColor: 'black',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#228B22',
    },
  },
});

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
  const footerStyle = {
    backgroundColor: "#228B22",
    width: "100%",
    position: "fixed",
    bottom: 0,
    left: 0,
    zIndex: 999,
    transition: "bottom 0.3s", // Add a smooth transition for the footer
  };

  const contentStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  };

  const textStyle = {
    marginBottom: "6px",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    console.log(data);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SECRET_KEY}openApi/api/login/`,
        data
      );
      const token = response.data["session_token"];
      const staff = response.data["staff"];
      console.log("Login Response", response.data);
      localStorage.setItem("token", token);
      const regno = encodeURIComponent(username); 
      let url;
      if (!staff) {
        url = `/course/?regno=${regno}`;
      } else if (staff) {
        url = `/administrator`; 
      }
      setSnackbarOpen(true);
      setSnackbarMessage("Login successful!");
      setSnackbarSeverity("success");

      setTimeout(() => {
        navigate(url);
      }, 1500);
    } catch (error) {
      console.error("Login failed:", error);
      setSnackbarOpen(true);
      setSnackbarMessage("Login failed. Please check your credentials.");
      setSnackbarSeverity("error");
    }
  };

  return (
    <div
      style={{ background: "whiteSmoke", height: "100vh", overflow: "hidden" }}
    >
      <div
        style={{
          marginBottom: "3.5rem",
          marginTop: "2rem",
          marginRight: "60%",
        }}
      >
        <NavBar/>
        <Container component="main" maxWidth="xs">
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          ></div>

          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 15 }}
            >
              <CssTextField
                margin="normal"
                required
                fullWidth
                id="regno"
                label="Register Number"
                name="regno"
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
              />
              <CssTextField
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
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="submit"
                  //fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    background: "#27ac1f !important",
                    borderRadius: "2rem",
                  }}
                  onClick={handleSubmit}
                  startIcon={<LoginIcon />}
                >
                  Login
                </Button>
              </Box>
              <Box sx={{ textAlign: "center" }}>
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
      </div>
      <AppBar position="static" style={footerStyle}>
        <Container>
          <Toolbar style={contentStyle}>
            <Typography variant="body1" color="white" style={textStyle}>
              Nehru Arts and Science College Padannakad
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Login;
