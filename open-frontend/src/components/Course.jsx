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
    const [mark, setMark] = useState(0);

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


  return (
    <div>
      <h1>Course</h1>
      <div>
        <form action="">
            {Object.entries(courseList).map(([key, value]) => (
            <div key={key}>
                <span>{key}: </span>
                <select
                value={value}
                onChange={(e) => handleChange(key, parseInt(e.target.value))}
                >
                <option value={0}>Select a number</option>
                {[...Array(30)].map((_, index) => (
                    <option key={index} value={index + 1}>
                    {index + 1}
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