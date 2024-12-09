import React, { useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loggedInUser, signUpUser } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';
import { validateLogin, validateSignUp } from '../Validation/Validation';
import api from '../API/AxiosSetup';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [signInStatus, setSignInStatus] = useState(false); 
  const [errors, setErrors] = useState({}); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validateLogin({ email});

    if (validationErrors.emailError ) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await api.post(
        '/auth/login',
        { email, password },
        { withCredentials: true }
      );
      console.log(response.data);
      dispatch(loggedInUser(response.data));
      navigate('/dashboard');
    } catch (error) {
      alert(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const validationErrors = validateSignUp({ name, email, password });

    if (validationErrors.emailError || validationErrors.passwordError) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await api.post(
        '/auth/register',
        { name, email, password },
        { withCredentials: true }
      );
      console.log(response.data);
      dispatch(signUpUser(response.data));
      navigate('/dashboard');
    } catch (error) {
      alert(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  const handleSignInStatus = () => {
    setSignInStatus(false);
    setErrors({}); 
  };

  const handleSignUpStatus = () => {
    setSignInStatus(true);
    setErrors({}); 
  };

  return (
    <>
      <Header />
      {signInStatus === false ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
          <div className="bg-gray-800 p-10 rounded-xl shadow-lg w-full max-w-lg transform transition duration-300 hover:scale-105">
            <h2 className="text-4xl font-semibold text-center mb-6 text-indigo-500">Welcome Back</h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <label className="block">
                <span className="text-gray-400">Email</span>
                <input
                  type="email"
                  className="input input-bordered w-full mt-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errors.emailError && <p className="text-red-500 text-sm">{errors.emailError}</p>}
              </label>
              <label className="block">
                <span className="text-gray-400">Password</span>
                <input
                  type="password"
                  className="input input-bordered w-full mt-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {errors.passwordError && <p className="text-red-500 text-sm">{errors.passwordError}</p>}
              </label>
              <button
                type="submit"
                className="btn btn-primary w-full mt-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </form>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-400">
                Don't have an account?{' '}
                <button onClick={handleSignUpStatus} className="text-indigo-500 hover:underline">
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
          <div className="bg-gray-800 p-10 rounded-xl shadow-lg w-full max-w-lg transform transition duration-300 hover:scale-105">
            <h2 className="text-4xl font-semibold text-center mb-6 text-indigo-500">Create an Account</h2>
            <form onSubmit={handleSignUp} className="space-y-6">
              <label className="block">
                <span className="text-gray-400">Name</span>
                <input
                  type="text"
                  className="input input-bordered w-full mt-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label className="block">
                <span className="text-gray-400">Email</span>
                <input
                  type="email"
                  className="input input-bordered w-full mt-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errors.emailError && <p className="text-red-500 text-sm">{errors.emailError}</p>}
              </label>
              <label className="block">
                <span className="text-gray-400">Password</span>
                <input
                  type="password"
                  className="input input-bordered w-full mt-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {errors.passwordError && <p className="text-red-500 text-sm">{errors.passwordError}</p>}
              </label>
              <button
                type="submit"
                className="btn btn-primary w-full mt-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            </form>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-400">
                Already have an account?{' '}
                <button onClick={handleSignInStatus} className="text-indigo-500 hover:underline">
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
