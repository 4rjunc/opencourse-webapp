import './index.css'
//import Navbar from './pages/Navbar'
import Course from './components/Course'
import Login from './components/Login'
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import NotFound from './components/NotFound'
function App() {
  const isAuthenticated = localStorage.getItem("token")
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/course' element={<Course/>}/> 
        <Route path='/' element={<Login/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes> 
    </BrowserRouter>
    </>
  )
}
//Add the sec. feature of redirection to /course
export default App
