import React, { useState } from 'react';
import axios from 'axios';

const Register= () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminno, setAdminno] = useState('');
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/register/', { email, password, adminno });
      alert('Registration successful. Please login to continue.');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="number"
        placeholder="number"
        value={adminno}
        onChange={(e) => setAdminno(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br/>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;

