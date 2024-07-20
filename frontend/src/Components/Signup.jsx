import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Signup() {
  const navigate = useNavigate();
  const [contact, setContact] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:3000/signup', { name, contact, password });
      if (response.data.success) {
        const { name, contact } = response.data.user;
        localStorage.setItem('userName', name);
        localStorage.setItem('userContact', contact);
        setMessage('SignUp Successful');
        navigate('/')
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage('Error signing up. Please try again.');
    }
  };

  return (
    <div className='flex flex-col justify-center items-center text-white text-xl gap-3 h-[70vh]'>
      <h2 className='text-4xl text-center font-semibold mb-8'>Sign up</h2>
      <label htmlFor="name">Name: </label>
      <input
        type="text"
        id="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='rounded-lg p-2 text-lg'
      />
      <label htmlFor="contact">Contact No: </label>
      <input
        type="text"
        id="contact"
        placeholder="Contact"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        className='rounded-lg p-2 text-lg'
      />
      <label htmlFor="password">Password: </label>
      <input
        type="password"
        id="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='rounded-lg p-2 text-lg'
      />
      <button onClick={handleSignUp} className='rounded border-2 my-5 px-3 py-2 border-gray-500 bg-slate-600'>Sign Up</button>
      <p>{message}</p>
      <p><Link to='/signin' className='text-green-400'>Sign In?</Link> </p>
    </div>
  );
}

export default Signup;
