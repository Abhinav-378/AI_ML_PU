import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function LogIn() {
  const navigate = useNavigate();
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignIn = async () => {
    try {
        const response = await axios.post('http://localhost:3000/signin', { contact, password });

      if (response.data.success) {
        const { name, contact } = response.data.user;
        // Save to local storage
        localStorage.setItem('userName', name);
        localStorage.setItem('userContact', contact);

        setMessage(response.data.message);
        navigate('/')
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage('Error signing in. Please try again.');
    }
  };

  return (
    <div>
      <div className='flex flex-col justify-center items-center text-white text-xl  gap-3 h-[70vh]'>
      <h2 className='text-4xl text-center font-semibold mb-8'>Sign In</h2>
      <label htmlFor="contact">Contact No: </label>
      <input
        type="text"
        placeholder="Contact"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        className='rounded-lg p-2 text-lg'
      />
      <label htmlFor="pswd">Password: </label>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='rounded-lg p-2 text-lg'
      />
      <button onClick={handleSignIn} className='rounded border-2 my-5 px-3 py-2 border-gray-500 bg-slate-600'>Sign In</button>
        <hr className="w-[50vw] my-6" />
      <p>{message}</p>
      <p>Create a new Account</p>
      <p><Link to='/signup' className='text-green-400'>Sign Up</Link>  </p>
      </div>
      
    </div>
  );
}

export default LogIn;
