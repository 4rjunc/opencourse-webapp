import { Button, Box, InputLabel, TextField } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Administrator = () => {
  const [reg_no, setRegno] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submit", reg_no);
    const data = {
      regno: reg_no,
    };
    axios
      .delete(`${import.meta.env.VITE_SECRET_KEY}openApi/api/delete`, {
        data: data,
      })
      .then((response) => {
        console.log("response", response);
        setSnackbarOpen(true);
        setSnackbarMessage("Deleted Successfully!");
        setSnackbarSeverity("success");
      })
      .catch((erros) => {
        console.error(erros);
        setSnackbarOpen(true);
        setSnackbarMessage("Registration Number Not Found");
        setSnackbarSeverity("error");
      });
  };

  const handleCSVDown = () => {
    axios
      .get(`${import.meta.env.VITE_SECRET_KEY}openApi/api/data_csv`, {
        responseType: "blob", // Set the response type to blob
      })
      .then((response) => {
        // Create a blob URL for the response data
        const blob = new Blob([response.data], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        // Create an anchor element to trigger the download
        const a = document.createElement("a");
        a.href = url;
        a.download = "course_choices.csv";
        a.click();
        // Clean up the blob URL
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "green" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <SchoolIcon />
            </IconButton>
            <Typography
              variant="h4"
              component="div"
              sx={{ flexGrow: 1, fontWeight: 600 }}
            >
              Open Course - 🧑🏻‍💼 Admin Panel
            </Typography>
            <Button
              style={{ backgroundColor: "white", color: "black" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "3rem",
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            label="Register Number"
            sx={{ mb: 2 }}
            onChange={(e) => setRegno(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mb: 2 }} // Add margin to the bottom
          >
            Delete!
          </Button>
        </form>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "3rem",
          }}
        >
        <Typography>Download the submitted data</Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{ mb: 2 }}
            onClick={handleCSVDown}
          >
            Download Submissions
          </Button>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={5000}
            onClose={handleSnackbarClose}
            //style={{ padding: "20rem 31.2rem" }}
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
      </Box>
    </>
  );
};

export default Administrator;
