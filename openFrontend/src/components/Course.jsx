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
        `http://127.0.0.1:8000/openApi/api/details/?regno=${regno}`
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
      .post("http://127.0.0.1:8000/openApi/api/submit/", data)
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

  useEffect(() => {
    console.log("selectedcourses", selectedCourses);
  }, [selectedCourses]);

  return (
    <div style={{margin:"2rem"}}>
    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      //paddingTop: "0rem", // Add some top padding to center vertically
    }}
  >
      <h1>Open-Course</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <p>
            Name : {name} <br />
            Marks : {marks} <br />
            Dept : {dept} <br />
            Register Number : {regNumber}
          </p>
          <h3>List of courses</h3>
          {console.log(courses)}
          <ul style={{ padding: "1rem 2rem" }}>
            {courses.map((course, index) => {
              const choice = index + 1;
              return (
                <li key={index} style={{marginTop: 10}}>
                  {index + 1}:{" "}
                  <FormControl variant="outlined" sx={{ minWidth: 300 }}>
                    <InputLabel>Select a course</InputLabel>
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
          <Box sx={{textAlign:"center"}}>
          <Button variant="contained" type="submit">Submit</Button>
          </Box>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={5000}
            onClose={handleSnackbarClose}
            style={{ padding: "20rem 31.2rem" }}
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
        </form>
      </div>
    </Box>
    </div>
  );
};

export default Course;
