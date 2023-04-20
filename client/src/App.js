import React from 'react'
import './index.css'
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
function App() {
  return (
    <Router>
          <List>  
            <SLink  to={'/login'}>
               Login
            </SLink>  
            <SLink  to={'/register'}>
                Register
            </SLink>
          </List>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>     
    </Router>
  )
}
export default App

const List = styled.div`
    display: flex;
    justify-content: center;
    margin: 2rem 0rem;
    @media only screen and (max-width: 768px) {
        flex-wrap: wrap;
    }
`;

const SLink = styled(NavLink)`
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    border-radius:10%;
    margin-right: 3rem;
    text-decoration: none;
    background-color:grey;
    width: 7rem;
    height: 3rem;
    cursor: pointer;  

    @media only screen and (max-width: 768px) {
        margin-right: 1rem;
        margin-bottom: 1rem;
    }
`;