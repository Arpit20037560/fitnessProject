import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const userSelector = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const userName = userSelector?.name || 'Guest';


  const isLoggedIn = Boolean(userSelector);

  // Handle the logout action
  const handleLogout = async () => {
    axios.post("http://localhost:3000/auth/logout");
    dispatch(logOutUser());
    navigate("/");
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="navbar bg-base-100 shadow-lg">
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-2xl">FitnessApp</a>
          </div>
          <div className="flex-none gap-2 lg:gap-4">
            <button className="btn btn-ghost">Home</button>

            {/* Profile and Logout Section */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost avatar">
                {/* Display user name or fallback */}
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content w-12 rounded-full">
                    <span>{userName[0]}</span>
                  </div>
                </div>
                {userName}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Profile</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>

            {/* Dropdown Menu for Small Screens */}
            <div className="dropdown dropdown-end lg:hidden">
              <label tabIndex={0} className="btn btn-ghost">
                Menu
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li><a>Home</a></li>
                <li><a>About</a></li>
                <li><a>Workouts</a></li>
                <li><a>Records</a></li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="navbar bg-base-100">
          <a className="btn btn-ghost text-xl">FitnessApp</a>
        </div>
      )}
    </>
  );
};

export default Header;
