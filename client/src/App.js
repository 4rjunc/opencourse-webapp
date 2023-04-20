import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
function App() {
  return (
    <Router>
          
            <Link  to={'/login'}>
              OpenCourse
            </Link>  
            <Link  to={'/login'}>
               Login
            </Link>  
            <Link  to={'/register'}>
                Register
            </Link>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
         
    </Router>
  )
}
export default App