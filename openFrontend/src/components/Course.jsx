import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Button, Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

const theme = createTheme({
  typography: {
    fontFamily: "Helvetica Neue",
  },
});

const Course = () => {
  const [name, setName] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [dept, setDept] = useState("");
  const [marks, setMarks] = useState(0);
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const token = localStorage.getItem("token");
  console.log(token);

  // email initialized here
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const regno = searchParams.get("regno");
  console.log(regno);

  useEffect(() => {
    handleDetails();
  }, [regno]);

  const handleDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SECRET_KEY}openApi/api/details/?regno=${regno}`
      );
      console.log(response);
      setName(response.data[0].name);
      setMarks(response.data[0].marks);
      setDept(response.data[0].dept);
      setRegNumber(response.data[0].regno);
      setCourses(response.data[0].courses);
      console.log(name);
    } catch (error) {
      console.error(error);
    }
  };


  //After Submittion
  const handleSubmit = (e) => {
    console.log("Submit");
    e.preventDefault();
    //POST-ing data to server
    const data = {
      regno: regNumber,
      selectedCourses,
    };

    console.log("data", data);
    axios
      .post(`${import.meta.env.VITE_SECRET_KEY}openApi/api/submit/`, data)
      .then((response) => {
        console.log(response.data);
        //alert(response.data["message"]);
        setSnackbarOpen(true);
        setSnackbarMessage("Submitted Successful!");
        setSnackbarSeverity("success");
      })
      .catch((error) => {
        console.log("Error", error);
        //alert(error.response.data["message"]);
        setSnackbarOpen(true);
        setSnackbarMessage("Already Submitted");
        setSnackbarSeverity("error");
      });
  };

  const handleCourseSelection = (courseCode, index) => {
    //setSelectedCourses({...selectedCourses, [courseCode]: index})
    setSelectedCourses((prevSelectedCourses) => {
      // Check if the course with the same index already exists
      const isCourseExists = Object.values(prevSelectedCourses).includes(index);

      if (isCourseExists) {
        // If the course exists, remove it
        const updatedSelectedCourses = Object.fromEntries(
          Object.entries(prevSelectedCourses).filter(
            ([key, value]) => value !== index
          )
        );
        // Add the new course with the selected courseCode
        return { ...updatedSelectedCourses, [courseCode]: index };
      } else {
        // If the course doesn't exist, simply add the new one
        return { ...prevSelectedCourses, [courseCode]: index };
      }
    });
  };

  const getCourseCodeForKey = (targetValue) => {
    for (const key in selectedCourses) {
      if (selectedCourses[key] === targetValue) {
        console.log("key", key)
        const courseName = courses.find(course => Object.values(course)[0] === key);
        console.log("courseName", Object.keys(courseName)[0])
        return Object.keys(courseName)[0];
      }
    }
    return null; // Return null if no key is found for the given value
  };

  useEffect(() => {
    console.log("selectedcourses", selectedCourses);
  }, [selectedCourses]);
  
  //Logout
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/')
  }
  
  return (
    <ThemeProvider theme={theme}>
    <div>
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
              Open Course
            </Typography>
            <Button style={{backgroundColor:"white", color:"black"}} onClick={handleLogout} startIcon={<LogoutIcon/>}>Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div style={{ margin: "2rem" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            //paddingTop: "0rem", // Add some top padding to center vertically
          }}
        >
          <div>
            <form onSubmit={handleSubmit}>
              <p style={{ fontSize: 20, padding:"1rem" }}>
                <b>Name :</b> {name} <br />
                <b>Marks :</b> {marks} <br />
                <b>Dept :</b> {dept} <br />
                <b>Register Number :</b> {regNumber}
              </p>
              <b style={{ fontSize: 25, padding:"1rem" }}>Select the courses</b>
              <ul style={{ padding: "1rem 2rem" }}>
                {courses.map((course, index) => {
                  const choice = index + 1;
                  const selectedCourseKey = getCourseCodeForKey(choice);
                  return (
                    <li key={index} style={{ marginTop: 10, fontSize:"1.3rem", listStyleType:"none"}}>
                      {index + 1}{" "}
                      <FormControl variant="outlined" sx={{ minWidth: 300 }}>
                        <InputLabel>
                          {selectedCourseKey ? (
                            <b>{selectedCourseKey}</b>
                          ) : (
                            <b>Select A Course</b>
                          )}
                        </InputLabel>
                        <Select
                          value=""
                          onChange={(e) =>
                            handleCourseSelection(e.target.value, choice)
                          }
                          label="Select a course"
                        >
                          <MenuItem value="">Select a course</MenuItem>
                          {courses.map((course, index) => {
                            const courseName = Object.keys(course)[0];
                            const courseCode = Object.values(course)[0];
                            if (!selectedCourses[courseCode]) {
                              return (
                                <MenuItem key={index} value={courseCode}>
                                  {courseName} : {courseCode}
                                </MenuItem>
                              );
                            }
                            return null;
                          })}
                        </Select>
                      </FormControl>
                    </li>
                  );
                })}
              </ul>
              <Box sx={{ textAlign: "center" }}>
                <Button variant="contained" type="submit">
                  Submit
                </Button>

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
            </form>
          </div>
        </Box>
        <Box style={{textAlign:"center"}}>Develped with ♥️ </Box>
      </div>
    </div>
    </ThemeProvider>
  );
};

export default Course;
