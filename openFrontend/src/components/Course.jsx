import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Course = () => {
  const [name, setName] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [dept, setDept] = useState("");
  const [marks, setMarks] = useState(0);
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);


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
      "regno":regNumber,
      selectedCourses
    }

    console.log("data", data)
    axios
      .post("http://127.0.0.1:8000/openApi/api/submit/", data)
      .then((response) => {
        console.log(response.data);
        alert(response.data["message"]);
      })
      .catch((error) => {
        console.log("Error", error);
        alert(error.response.data["message"]);
      });
  };

  const handleCourseSelection = (courseCode, index) => {
      setSelectedCourses({...selectedCourses, [courseCode]: index})
  };

  useEffect(() => {
    console.log("selectedcourses", selectedCourses);
  }, [selectedCourses]);
  
  return (
    <div>
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
          <ul>
            {courses.map((course, index) => {
              //const courseName = Object.keys(course)[0];
              const choice = index + 1
              return (
                <li key={index}>
                  {index + 1}:{" "}
                  <select onChange={(e) => handleCourseSelection(e.target.value, choice)}>
                  <option value="">Select a course</option>
                    {courses.map((course, index) => {
                      const courseName = Object.keys(course)[0];
                      const courseCode = Object.values(course)[0];
                      // Check if the courseCode exists in selectedCourses
                        if (!selectedCourses[courseCode]) {
                          return (
                            <option key={index} value={courseCode}>
                              {courseName} : {courseCode}
                            </option>
                          );
                        }
                        return null; // Skip rendering this option
                    })}
                  </select>
                </li>
              );
            })}
          </ul>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Course;
