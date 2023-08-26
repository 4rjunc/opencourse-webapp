import './index.css'
//import Navbar from './pages/Navbar'
import Course from './components/Course'
import Login from './components/Login'
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import NotFound from './components/NotFound'
import PrivateRoute from './components/PrivateRoute'
import Administrator from './components/Administrator'
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/course' element={
        <PrivateRoute>
           <Course/> 
        </PrivateRoute>
        }/> 
        <Route path='/' element={<Login/>}/>
        <Route path='*' element={<NotFound/>}/>
        <Route path='/administrator' element={
          <PrivateRoute>
            <Administrator/>
          </PrivateRoute>
        }/>
      </Routes> 
    </BrowserRouter>
    </>
  )
}
//Add the sec. feature of redirection to /course
export default App
