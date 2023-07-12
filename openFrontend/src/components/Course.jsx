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
    const data = "Help";
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
        setCourses([]);
      })
      .catch((error) => {
        console.log("Error", error);
        alert(error.response.data["message"]);
      });
  };

  const handleCourseSelection = (courseCode, index) => {
    setSelectedCourses((prevSelectedCourses) => {
      const updatedCourses = [...prevSelectedCourses];
      updatedCourses[index] = { courseCode, index };
      console.log("selectedCoures", selectedCourses)
      return updatedCourses;
      
    });
  };
  const data = [
    {
        "name": "HARINANDANAN V",
        "marks": "92",
        "dept": "B.A. Economics",
        "regno": "NA21AECR001",
        "dob": "2004-03-30",
        "courses": [
            {
                "Mushroom Cultivation": "5D01BOT"
            },
            {
                "Vaikkom Muhammed Basheer - Paadavum Padanavum": "5D04MAL"
            },
            {
                "Plant Propagation": "5D03BOT"
            },
            {
                "Basic Accounting": "5D01COM"
            },
            {
                "Principles of Management": "5D03COM"
            },
            {
                "Environmental Studies": "5D03CHE"
            },
            {
                "Web Technology": "5D02CSC"
            },
            {
                "Python Programming": "5D05CSC"
            },
            {
                "Social Reform Movements in Kerala": "5D01HIS"
            },
            {
                "India's Struggle for Freedom": "5D02HIS"
            },
            {
                "Cultural Heritage of North Malabar": "5D03HIS"
            },
            {
                "Quantitative Arithmetic and Reasoning": "5D01MAT"
            },
            {
                "Graph Theory": "5D04MAT"
            },
            {
                "Biophysics": "5D03PHY"
            },
            {
                "Electricity in Daily Life": "5D05PHY"
            },
            {
                "Human Rights in India": "5D01POL"
            },
            {
                "Herbal Literacy and Ethnobotanical Awareness": "5D02SKT"
            },
            {
                "Literary Wolrd of Kalidasa": "5D052SKT"
            },
            {
                "Sampling Techniques": "5D02STA"
            },
            {
                "Index Numbers and Time Series": "5D04STA"
            },
            {
                "Apiculture": "5D02ZLG"
            },
            {
                "Sericulture": "5D03ZLG"
            },
            {
                "Exercise is Medicine": "5D05PED"
            }
        ]
    }
]

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
