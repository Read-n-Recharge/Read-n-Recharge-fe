import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Clock } from "../components/clock";
import StudyMusic from "../components/studyMusic";
import { Navbar } from "../components/common/navbar";
import bgImage from "../assets/bg-todo.png";
const ClockPage = () => {
  const location = useLocation();
  const { method, customTime } = location.state;

  console.log("ClockPage - Method:", method);
  console.log("ClockPage - CustomTime:", customTime);

  return (
    <div
      className="flex flex-col items-center pt-10 h-screen min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <h1 className="text-5xl font-bold text-center text-blue-900">
        ONE STEP AT A TIME, YOU WILL GET THERE
      </h1>
      <h1 className=" p-1 text-2xl ">{method}</h1>
      <div className="flex flex-col items-center h-full border-blue-100 border-t-2 gap-2">
        <div className="h-full items-center flex">
          <Clock method={method} customTime={customTime} />
        </div>
      </div>

      <Navbar />
      <div className="absolute left-1 top-56">
        <StudyMusic />
      </div>
    </div>
  );
};

export default ClockPage;
