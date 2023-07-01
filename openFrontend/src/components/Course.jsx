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
  }, []);

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
    const data = "HEllp";
    //POST-ing data to server
    axios
      .post("http://127.0.0.1:8000/openApi/api/submit/", data)
      .then((response) => {
        console.log(response.data);
        alert(response.data["message"]);
        setName("");
        setRegNumber("");
        setDept("");
        setMarks(0);
        setCourseList({
          "5D01BOT": 0,
          "5D03BOT": 0,
          "5D03CHE": 0,
          "5D04CHE": 0,
          "5D01COM": 0,
          "5D03COM": 0,
          "5D02CSC": 0,
          "5D05CSC": 0,
          "5D01ECO": 0,
          "5D04ECO": 0,
          "5D01HIS": 0,
          "5D02HIS": 0,
          "5D03HIS": 0,
          "5D03MAL": 0,
          "5D04MAL": 0,
          "5D02MAT": 0,
          "5D04MAT": 0,
          "5D05PED": 0,
          "5D03PHY": 0,
          "5D05PHY": 0,
          "5D01POL": 0,
          "5D05POL": 0,
          "5D02SKT": 0,
          "5D05SKT": 0,
          "5D02STA": 0,
          "5D04STA": 0,
          "5D02ZLG": 0,
          "5D03ZLG": 0,
        });
      })
      .catch((error) => {
        console.log("Error", error);
        alert(error.response.data["message"]);
      });
  };

  const handleCourseSelection = (courseCode, index) => {
    setSelectedCourses((prevSelectedCourses) => [
      ...prevSelectedCourses,
      { courseCode, index },
    ]);
    console.log("SelectedCourses",selectedCourses)
  };

  const availableCourses = courses.filter(
    (course, index) =>
      !selectedCourses.some((selected) => selected.index === index)
  );

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
          {/*Fix the rendering of courses
          1. the filtering out of selected courses
          2. the selected values should be displayed in drop down select
          3. the unselected values should be re displayed in drop down 
          */}
          {console.log(courses)}
          <ul>
            {courses.map((course, index) => {
              const courseName = Object.keys(course)[0];
              const courseCode = Object.values(course)[0];
              return (
                <li key={index}>
                  {index + 1}:{" "}
                  <select onChange={(e) => handleCourseSelection(e.target.value,index+1)}>
                    {courses.map((course, index) => {
                      const courseName = Object.keys(course)[0];
                      const courseCode = Object.values(course)[0];
                      return (
                        <option key={index} value={courseCode}>
                          {courseName} : {courseCode}
                        </option>
                      );
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
