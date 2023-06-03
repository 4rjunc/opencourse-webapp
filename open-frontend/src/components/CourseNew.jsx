import React, { useState } from "react";

const Course = () => {
  const departments = {
    BOT: "Botany",
    CHE: "Chemistry",
    COM: "Commerce",
    CSC: "Computer Science",
    ECO: "Economics",
    HIS: "History",
    MAL: "Malayalam",
    MAT: "Mathematics",
    PED: "Physical Education",
    PHY: "Physics",
    POL: "Political Science",
    SKT: "Sanskrit",
    STA: "Statistics",
    ZLG: "Zoology",
  };

  const departmentCourses = Object.keys(departments).map(
    (deptCode) => `5D${deptCode}`
  );

  const availableCourses = [
    "5D01BOT",
    "5D03BOT",
    "5D03CHE",
    "5D04CHE",
    "5D01COM",
    "5D03COM",
    "5D02CSC",
    "5D05CSC",
    "5D01ECO",
    "5D04ECO",
    "5D01HIS",
    "5D02HIS",
    "5D03HIS",
    "5D03MAL",
    "5D04MAL",
    "5D02MAT",
    "5D04MAT",
    "5D05PED",
    "5D03PHY",
    "5D05PHY",
    "5D01POL",
    "5D05POL",
    "5D02SKT",
    "5D05SKT",
    "5D02STA",
    "5D04STA",
    "5D02ZLG",
    "5D03ZLG",
  ];

  const [name, setName] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [dept, setDept] = useState("");
  const [marks, setMarks] = useState(0);
  const [boardType, setBoardType] = useState("CBSE");
  const [courseList, setCourseList] = useState({
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

  const handleChange = (courseCode, priority) => {
    if (priority === 0) {
      setCourseList((prevCourseList) => ({
        ...prevCourseList,
        [courseCode]: 0,
      }));
    } else {
      const existingPriority = Object.values(courseList).find(
        (value) => value === priority
      );
      if (existingPriority) {
        setCourseList((prevCourseList) => ({
          ...prevCourseList,
          [existingPriority]: 0,
          [courseCode]: priority,
        }));
      } else {
        setCourseList((prevCourseList) => ({
          ...prevCourseList,
          [courseCode]: priority,
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && regNumber && dept && marks) {
      // Perform form submission
      console.log("Form submitted!");
    } else {
      // Display error message
      console.log("Please fill in all the fields");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="regNumber">Registration Number:</label>
          <input
            type="text"
            id="regNumber"
            value={regNumber}
            onChange={(e) => setRegNumber(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="dept">Department:</label>
          <select
            id="dept"
            value={dept}
            onChange={(e) => setDept(e.target.value)}
          >
            <option value="">Select Department</option>
            {Object.values(departments).map((department, index) => (
              <option key={index} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="marks">Marks:</label>
          <input
            type="number"
            id="marks"
            value={marks}
            onChange={(e) => setMarks(Number(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="boardType">Board Type:</label>
          <select
            id="boardType"
            value={boardType}
            onChange={(e) => setBoardType(e.target.value)}
          >
            <option value="CBSE">CBSE</option>
            <option value="State Board">State Board</option>
          </select>
        </div>

        <div>
          <label htmlFor="courseList">Priority List:</label>
          <ul>
            {Object.keys(courseList).map((courseCode, index) => {
              if (
                departmentCourses.includes(courseCode) &&
                dept === departments[courseCode.slice(5, 8)]
              ) {
                return null;
              }
              return (
                <li key={courseCode}>
                  <label htmlFor={`priority${index + 1}`}>{index + 1}.</label>
                  <select
                    id={`priority${index + 1}`}
                    value={courseList[courseCode]}
                    onChange={(e) =>
                      handleChange(courseCode, Number(e.target.value))
                    }
                  >
                    <option value={0}>None</option>
                    {Object.keys(courseList).map((key) => {
                      if (
                        !departmentCourses.includes(key) &&
                        courseList[key] === 0
                      ) {
                        return (
                          <option key={key} value={key}>
                            {key}
                          </option>
                        );
                      }
                      return null;
                    })}
                  </select>
                </li>
              );
            })}
          </ul>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Course;
