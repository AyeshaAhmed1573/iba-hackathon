import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [alert, setAlert] = useState({ message: '', type: '' }); // State for alerts
  const navigate = useNavigate();

  const create = async (e) => {
    e.preventDefault();
    try {
      // Create user with email and password
      await createUserWithEmailAndPassword(auth, email, password);

      // Update user profile with first and last name
      await updateProfile(auth.currentUser, { displayName: firstName + ' ' + lastName });

      // Set success alert
      setAlert({ message: 'Signup successful! Redirecting...', type: 'success' });

      // Clear form fields
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      // Set error alert
      setAlert({ message: error.message, type: 'error' });
    }
  };

  return (
    <div className='w-full h-screen flex justify-center items-center bg-gradient-to-bl from-gray-950 via-indigo-950 to-rose-950'>
      <div className='flex flex-col md:flex-row justify-between bg-white rounded-2xl shadow-2xl w-11/12 sm:w-4/5 lg:w-4/6 xl:w-3/5 h-auto md:h-96 lg:h-120'>
        {/* Left Section (Spline Animation) */}
        <div className='w-full bg-black md:w-1/2 h-full rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none overflow-hidden'>
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

          <h1 className='text-3xl text-slate-100 lg:text-4xl font-bold text-center'>
            Create Account
          </h1>

          {/* Name Inputs */}
          <div className='flex flex-col sm:flex-row justify-between gap-4'>
            <div className='w-full sm:w-1/2'>
              <p className='text-gray-500 text-lg lg:text-xl'>First Name:</p>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                type='text'
                className='w-full h-10 text-slate-100 shadow-md rounded-lg p-2 border border-gray-300 outline-none'
              />
            </div>
            <div className='w-full sm:w-1/2'>
              <p className='text-gray-500 text-lg lg:text-xl'>Last Name:</p>
              <input
                onChange={(e) => setLastName(e.target.value)}
                type='text'
                className='w-full h-10 text-slate-100 shadow-md rounded-lg p-2 border border-gray-300 outline-none'
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <p className='text-gray-500 text-lg lg:text-xl'>Email:</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              className='w-full h-10 text-slate-100 shadow-md rounded-lg p-2 border border-gray-300 outline-none'
            />
          </div>

          {/* Password Input */}
          <div>
            <p className='text-gray-500 text-lg lg:text-xl'>Password:</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              className='w-full h-10 text-slate-100 shadow-md rounded-lg p-2 border border-gray-300 outline-none'
            />
          </div>

          {/* Link and Button */}
          <div className='flex flex-col items-center gap-2'>
            <Link to='/login' className='text-purple-600 hover:underline'>
              Already have an account? Login
            </Link>
            <button
              onClick={create}
              className='button w-1/2 h-10 bg-gradient-to-bl from-gray-950 via-indigo-950 to-rose-950 text-white font-bold rounded-lg shadow-md hover:bg-purple-600 transition-colors'
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;