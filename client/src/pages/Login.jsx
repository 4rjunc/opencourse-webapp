import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import {motion} from 'framer-motion';


const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px; 
  background-color: #B9B6B7;
  border-radius: 10px;  
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const FormInput = styled.input`
    margin: 10px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    width: 300px;
    font-size: 1.2rem;
    background-color: #f5f5f5;
    -webkit-appearance: none;
`;

const FormButton = styled.button`
margin: 20px;
padding: 10px;
border: none;
border-radius: 5px;
width: 120px;
font-size: 1.2rem;
color: #fff;
background-color: #0077b6;
cursor: pointer;
transition: all 0.2s ease-in-out;
&:hover {
  background-color: #023e8a;
}
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login/', { email, password });
      localStorage.setItem('token', response.data.token);
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
    animate={{opacity: 1}}
    initial={{opacity: 0}}
    exit={{opacity:0}}
    transition={{duration: 0.55}}
    >
    <LoginContainer>
      <LoginForm onSubmit={handleLogin}>
        <FormInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormButton type="submit">Login</FormButton>
      </LoginForm>
    </LoginContainer>
    </motion.div>
  );
};

export default Login;


