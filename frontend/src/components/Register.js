// src/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import "../assets/Register.css"

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password || !name) {
      setMessage('All fields are required.');
      return;
    }

    // Encrypt the password
    const encryptedPassword = CryptoJS.AES.encrypt(password, 'kiran-yadav').toString();

    try {
      const response = await axios.post('/registeruser', { email, password: encryptedPassword, name });
      console.log(response)
      setMessage(`${response.data.message}`);
      setEmail('');
      setPassword('');
      setName('');
    } catch (error) {
      setMessage(`Error: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <div className="form-container">
      <h2>Register User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input 
            className='input-field'
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            className='input-field'
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            className='input-field'
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
