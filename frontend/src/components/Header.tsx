import React from "react";
import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <div>
      <nav>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto pt-3">
          <a href="#">
            <span className="text-2xl font-semibold whitespace-nowrap text-white">
              Read 'n' Recharge
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-solid-bg"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 "
            aria-controls="navbar-solid-bg"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-solid-bg"
          >
            <ul className="flex flex-col font-medium mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 px-2 md:px-6 rounded-3xl text-white hover:shadow-glow hover:bg-glow${
                      isActive ? "shadow-glow bg-glow" : ""
                    }`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/service"
                  className={({ isActive }) =>
                    `block py-2 px-2 md:px-6 rounded-3xl text-white hover:shadow-glow hover:bg-glow ${
                      isActive ? "shadow-glow bg-glow" : ""
                    }`
                  }
                >
                  Service
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 px-2 md:px-6 rounded-3xl text-white border-sky-100 border-solid border hover:bg-glow hover:shadow-glow-blue ${
                      isActive ? "bg-glow-blue" : ""
                    }`
                  }
                >
                  Log in
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `block py-2 px-2 md:px-6 rounded-3xl text-white border-sky-100 border-solid border hover:bg-glow-blue hover:shadow-glow-blue ${
                      isActive ? "bg-glow-blue" : ""
                    }`
                  }
                >
                  Register
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
