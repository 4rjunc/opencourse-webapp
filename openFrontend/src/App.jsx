
import './index.css'
//import Navbar from './pages/Navbar'
import Course from './components/Course'
import Login from './components/Login'
import { Routes, Route, BrowserRouter} from 'react-router-dom'
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/course' element={<Course/>}/>
        <Route path='/' element={<Login/>}/>
      </Routes> 
    </BrowserRouter>
    </>
  )
}
//Add the sec. feature of redirection to /course
export default App
