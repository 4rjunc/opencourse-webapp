import React from 'react';

import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import {motion} from 'framer-motion';

const AppWrapper = styled.div`
  background-color: white;
  min-height: 100vh;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  margin: 2rem 0rem;
  list-style: none;
`;

const NavItem = styled.li`
  margin-right: 2rem;
  font-size: 1.2rem;
`;

const NavLinkStyled = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  text-decoration: none;
  background-color: #0077b6;
  color: #fff;
  width: 7rem;
  height: 3rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #023e8a;
  }
`;

function App() {
  return (
    <motion.div
    animate={{opacity: 1}}
    initial={{opacity: 0}}
    exit={{opacity:0}}
    transition={{duration: 0.5}}
    >
    <Router>
      <AppWrapper>
        <NavList>
          <NavItem>
            <NavLinkStyled to="/login">Login</NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled to="/register">Register</NavLinkStyled>
          </NavItem>
        </NavList>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AppWrapper>
    </Router>
    </motion.div>
  );
}

export default App;
