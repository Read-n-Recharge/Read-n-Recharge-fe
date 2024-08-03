import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/error.png";
const ErrorPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center px-8 py-24"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="text-white p-44">
        <h1 className="text-8xl">Oops!</h1>
        <p className="py-16 text-xl">
          Sorry, we are not able to find what you were looking for.{" "}
        </p>
        <Link to="/" className="border p-5 rounded-full ">
          Go to Login Page
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
