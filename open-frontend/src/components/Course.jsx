import { useState } from "react"


const Course = () => {
    /*const list = {
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
    }*/

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
    const [name, setName] = useState("");
    const [regNumber, setRegNumber] = useState("");
    const [dept, setDept] = useState("");
    const [mark, setMark] = useState(0);

    const departments = ["BOT", "CHE", "CSC", "ECO", "COM", "HIS", "MAL", "MAT", "PHY", "PED", "POL", "SKT", "SAT", "ZLG"]
  const handleChange = (key, value) => {
    const isNumberAlreadyAssigned = Object.values(courseList).includes(value);

    if (!isNumberAlreadyAssigned) {
      setCourseList((prevCourseList) => ({
        ...prevCourseList,
        [key]: value,
      }));
    } else {
      // Handle error or display a message indicating the number is already assigned
      console.log("Number already assigned");
      alert("Number is already assigned")
    }
  };

  const assignedNumbers = Object.values(courseList).filter((value) => value !== 0);
  const availableNumbers = [...Array(30)].map((_, index) => index + 1).filter((number) => !assignedNumbers.includes(number));


  return (
    <div>
      <h1>Course</h1>
      <div>
        <form action="POST">

           <h1>Name</h1>
           <input type="text" onChange={ (event) => setName(event.target.value)}/> 

           <h1>Department</h1>
           <select value={dept} onChange={(e)=> setDept(e.target.value)}>
             <option value="">Select Department</option>
             {departments.map((department) => (
                <option key={department} value={department}>
                    {department}
                </option>
             ))}
           </select>
        
           <h1>Register Number</h1>
           <input type="text" onChange={(e) => setRegNumber(e.target.value)}/>

            {Object.entries(courseList).map(([key, value]) => (
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
            ))}
        </form>
      </div>
    </div>
  )
}

export default Course