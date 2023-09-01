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
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import LogoutIcon from '@mui/icons-material/Logout';
import Table from "./Table";

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

  const handleAllote = () => {
    console.log("Allotement");
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
              Open Course - Admin Panel
            </Typography>
            <Button
              style={{ backgroundColor: "white", color: "black" }}
              onClick={handleLogout}
              startIcon={<LogoutIcon/>}
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
          alignItems: "flex-start",
          paddingTop: "2rem",
          paddingLeft: "2rem"
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            paddingTop: "2rem",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            Course Allotment
          </Typography>
          <Button
            variant="contained"
            sx={{ mb: 2 }}
            onClick={handleAllote}
            startIcon={<FileDownloadIcon/>}
          >
            Download
          </Button>
        </Box>


        <form onSubmit={handleSubmit}>
          <Typography
            variant="h6"
            component="div"
            sx={{fontWeight: 600 }}
          >
            Delete a submission
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Register Number"
            sx={{ mb: 2 }}
            onChange={(e) => setRegno(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mb: 2 }} // Add margin to the bottom
            color="error"
            startIcon={<DeleteIcon />}
          >
            Delete 
          </Button>
        </form>
        <Table/>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            paddingTop: "1rem",
          }}
        >
          {/* <Typography
            variant="h6"
            component="div"
            sx={{fontWeight: 600 }}
          >
            Download the submitted data
          </Typography> */}
          <Button
            variant="contained"
            sx={{ mb: 2 }}
            onClick={handleCSVDown}
            startIcon={<FileDownloadIcon/>}
          >
            Download
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
