import { useEffect, useState } from "react"
import  axios  from 'axios'
import { useLocation } from "react-router-dom"

const Course = () => {
    const [name, setName] = useState("");
    const [regNumber, setRegNumber] = useState("");
    const [dept, setDept] = useState("");
    const [marks, setMarks] = useState(0);
    const [boardType, setBoardType] = useState("CBSE");

    const token = localStorage.getItem('token')
    console.log(token)

    // email initialized here
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const regno = searchParams.get('regno');
    console.log(regno)

    useEffect(()=>{
      handleDetails();
    },[])

    const handleDetails = async () => {
      try{
        const response = await axios.get(`http://127.0.0.1:8000/openApi/api/details/?regno=${regno}`)
        console.log(response)
        setName(response.data[0].name)
        setMarks(response.data[0].marks)
        setDept(response.data[0].dept)
        console.log(name)
      }
      catch (error) {
        console.error(error)
      }
    }

    const [courseList, setCourseList] = useState({
        "5D01BOT":0,"5D03BOT":0,
        "5D03CHE":0,"5D04CHE":0,
        "5D01COM":0,"5D03COM":0,
        "5D02CSC":0,"5D05CSC":0,
        "5D01ECO":0,"5D04ECO":0,
        "5D01HIS":0,"5D02HIS":0,"5D03HIS":0,
        "5D03MAL":0,"5D04MAL":0,
        "5D02MAT":0,"5D04MAT":0,
        "5D05PED":0,
        "5D03PHY":0,"5D05PHY":0,
        "5D01POL":0,"5D05POL":0,
        "5D02SKT":0,"5D05SKT":0,
        "5D02STA":0,"5D04STA":0,
        "5D02ZLG":0,"5D03ZLG":0
    });


    //Field Checks
    const [isFieldsFilled, setIsFieldsFilled] = useState(true);
    const [isRegNumberValid, setIsRegNumberValid] = useState(true);

    //const departments = ["BOT", "CHE", "CSC", "ECO", "COM", "HIS", "MAL", "MAT", "PHY", "PED", "POL", "SKT", "SAT", "ZLG"]
    
    const departments = {
      BOT: "Botany",
      CHE: "Chemistry",
      CSC: "Computer Science",
      ECO: "Economics",
      COM: "Commerce",
      HIS: "History",
      MAL: "Malayalam",
      MAT: "Mathematics",
      PHY: "Physics",
      PED: "Physical Education",
      POL: "Political Science",
      SKT: "Sanskrit",
      SAT: "Statistics",
      ZLG: "Zoology",
    };

    
    const handleChange = (key, value) => {
    const isNumberAlreadyAssigned = Object.values(courseList).includes(value);

    if (!isNumberAlreadyAssigned) {
      setCourseList((prevCourseList) => ({
        ...prevCourseList,
        [key]: value,
      }));} 
    else {
        // Handle error or display a message indicating the number is already assigned
        console.log("Number already assigned");
        alert("Number is already assigned")
      }
    };
  
  //Mapping and reducing the numbers in priority selector and course
  const assignedNumbers = Object.values(courseList).filter((value) => value !== 0);
  const availableNumbers = [...Array(30)].map((_, index) => index + 1).filter((number) => !assignedNumbers.includes(number));

  //Checks of the marks under the range
  const handleMarksChange = (e) => {
    const value = parseInt(e.target.value);
    if (boardType === 'CBSE' && (value < 0 || value > 500)) {
      alert("Marks should be between 0 and 500");
    } else if (boardType === 'State' && (value < 0 || value > 1200)) {
      alert("Marks should be between 0 and 1200");
    } else {
      setMarks(value);
    }
  };
  
  //Converts the CBSE mark into 1200
  const convertMarks = () => {
    if (boardType === "CBSE") {
      // Convert marks to out of 1200
      return Math.floor((marks/500) * 1200)
      //return marks
    }
    return marks;
  };

  //After Submittion
  const handleSubmit = (e) => {

    console.log("Submit");
    e.preventDefault();

    if (!name || !regNumber || !dept || marks === 0) {
      setIsFieldsFilled(false);
      return;
    }

    //const regNumberRegex = /^[A-Z0-9]{8}$/;
    //if (!regNumberRegex.test(regNumber)) {
      //setIsRegNumberValid(false);
      //return;
    //}

    //setIsRegNumberValid(true);
    setIsFieldsFilled(true);

    const convertedMark = convertMarks();
    const data = {
      name,
      regNumber,
      dept,
      marks:convertedMark,
      courseList,
    };
    console.log(data)

    //POST-ing data to server
    axios.post("http://127.0.0.1:8000/openApi/api/submit/",data)
      .then((response) => {
        console.log(response.data)
        alert(response.data["message"])
        setName("")
        setRegNumber("")
        setDept("")
        setMarks(0)
        setCourseList({
          "5D01BOT":0,"5D03BOT":0,
          "5D03CHE":0,"5D04CHE":0,
          "5D01COM":0,"5D03COM":0,
          "5D02CSC":0,"5D05CSC":0,
          "5D01ECO":0,"5D04ECO":0,
          "5D01HIS":0,"5D02HIS":0,"5D03HIS":0,
          "5D03MAL":0,"5D04MAL":0,
          "5D02MAT":0,"5D04MAT":0,
          "5D05PED":0,
          "5D03PHY":0,"5D05PHY":0,
          "5D01POL":0,"5D05POL":0,
          "5D02SKT":0,"5D05SKT":0,
          "5D02STA":0,"5D04STA":0,
          "5D02ZLG":0,"5D03ZLG":0
        })
      })
      .catch((error) => {
        console.log("Error", error)
        alert(error.response.data["message"])
      })

  }

  return (
    <div>
      <h1>Open-Course</h1>
      <div>
        <form  onSubmit={handleSubmit}>
          <p>
           Name : {name} <br/>
           Marks : {marks} <br/>
           Dept : {dept}
          </p>
           <h2>Board Type</h2>
          <select value={boardType} onChange={(e) => setBoardType(e.target.value)}>
            <option value="CBSE">CBSE</option>
            <option value="State">State</option>
          </select>

          <h2>Marks</h2>
          <input
            type="number"
            placeholder="Enter Marks"
            value={marks}
            onChange={handleMarksChange}
          />

           <h1>Department</h1>
           <select value={dept} onChange={(e) => setDept(e.target.value)}>
            <option value="">Select Department</option>
            {Object.entries(departments).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>

        
           <h1>Register Number</h1>
           <input type="text" value={regNumber} onChange={(e) => setRegNumber(e.target.value)}/>
           {!isRegNumberValid && (
            <p style={{ color:"red" }}>
              Please enter a valid register number (8 characters, only uppercase
              letters and numbers allowed).
            </p>
          )}

           <h2>List of Courses</h2>
          {Object.entries(courseList).map(([key, value]) => {
                const courseDepartment = key.slice(-3);

                if (courseDepartment === dept) {
                return null; // Skip mapping the course
                }

                return (
                <div key={key}>
                    <span>{key}: </span>
                    <select
                    value={value}
                    onChange={(e) => handleChange(key, parseInt(e.target.value))}
                    >
                    <option value={0}>{value ? value : "Select A Number"}</option>
                    {availableNumbers.map((number) => (
                        <option key={number} value={number}>
                        {number}
                        </option>
                    ))}
                    </select>
                </div>
                );
            })}
            {!isFieldsFilled && <p style={{color:"red"}}>Please fill in all the fields.</p>}
            <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Course