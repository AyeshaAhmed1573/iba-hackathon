import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ message: '', type: '' }); // State for alerts
  const navigate = useNavigate(); // For redirection after login

  const login = async (e) => {
    e.preventDefault(); // Prevent form submission default behavior

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login Successful:", userCredential.user);

      // Set success alert
      setAlert({ message: 'Login successful! Redirecting...', type: 'success' });

      // Clear form fields
      setEmail('');
      setPassword('');

      // Redirect to Dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      console.error("Login Error:", error.message);

      // Set error alert
      setAlert({ message: error.message, type: 'error' });
    }
  };

  return (
    <div className='w-full h-screen flex justify-center items-center bg-gradient-to-bl from-gray-950 via-indigo-950 to-rose-950'>
      <div className='flex flex-col md:flex-row justify-between bg-white rounded-2xl shadow-2xl w-11/12 sm:w-4/5 lg:w-4/6 xl:w-3/5 h-120 md:h-96 lg:h-120'>
        {/* Left Section (Spline Animation) */}
        <div className='w-full md:w-1/2 bg-black h-full rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none overflow-hidden'>
          <Spline className='w-40 h-40' scene="https://prod.spline.design/4K257brX8FasC2B6/scene.splinecode" />
        </div>

        {/* Right Section (Form) */}
        <div className='w-full bg-black md:w-1/2 h-full p-4 flex flex-col justify-around'>
          {/* Alert Message */}
          {alert.message && (
            <div
              className={`w-full p-3 rounded-lg text-center ${
                alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'
              } text-white font-semibold`}
            >
              {alert.message}
            </div>
          )}

          <h1 className='text-3xl lg:text-4xl text-slate-100 font-bold text-center'>
            Login
          </h1>

          {/* Email Input */}
          <div>
            <p className='text-gray-500 text-lg lg:text-xl'>Email:</p>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full text-white h-10 shadow-md rounded-lg p-2 border border-gray-300 outline-none'
            />
          </div>

          {/* Password Input */}
          <div>
            <p className='text-gray-500 text-lg lg:text-xl'>Password:</p>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full h-10 text-white shadow-md rounded-lg p-2 border border-gray-300 outline-none'
            />
          </div>

          {/* Link and Button */}
          <div className='flex flex-col items-center gap-2'>
            <Link to='/signup' className='text-purple-600 hover:underline'>
              Want to create a new account?
            </Link>
            <button
              onClick={login}
              className='button w-1/2 h-10 bg-gradient-to-bl from-gray-950 via-indigo-950 to-rose-950 text-white font-bold rounded-lg shadow-md hover: transition-colors'
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;