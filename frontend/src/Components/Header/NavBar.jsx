import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/logo1.png'
function NavBar() {
  return (
    <div>
      <div className="navbar bg-base-100 text-white font-semibold">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Health Predictor</a>
              </li>
              {/* <li>
                <a>t</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li> */}
              <li>
                <a>Self Diagnosis</a>
              </li>
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-2xl font-bold">
            <img src={logo} alt="" className="h-28"/>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="diagnosis">Self Diagnosis</Link>
            </li>
            {/* <li>
              <details>
                <summary>Tools</summary>
                <ul className="p-2">
                  <li>
                    <a>Health Predictor</a>
                  </li>
                  <li>
                    <a>Hospital Locator</a>
                  </li>
                </ul>
              </details>
            </li> */}
            <li>
              <a href="http://localhost:8501">Health Predictor</a>
            </li>
            <li>
              <Link to='/calories'>Calorie Intake Plan</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end " >
          <Link to="/sosrequest" className="btn ">
          <span className='text-xl font-bold bg-gradient-to-r from-blue-400 via-pink-500 to-red-500 bg-clip-text text-transparent'>
            Emergency
          </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
