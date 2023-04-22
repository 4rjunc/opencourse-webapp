import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  background-color: #B9B6B7;
  border-radius: 10px; 
`;

const Input = styled.input`
  margin: 10px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  width: 300px;
  font-size: 1.2rem;
  background-color: #f5f5f5;
  -webkit-appearance: none;
`;


const Button = styled.button`
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

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [admissionNumber, setAdmissionNumber] = useState('');
  const history = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await axios.post('/api/register/', { email, password, admissionNumber });
      alert('Registration successful. Please login to continue.');
      history.push('/login');
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
    <Form onSubmit={handleRegister}>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Admission Number"
        value={admissionNumber}
        onChange={(e) => setAdmissionNumber(e.target.value)}
        min="1"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button type="submit">Register</Button>
    </Form>
    </motion.div>
  );
};

export default Register;
