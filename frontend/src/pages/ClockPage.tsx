import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Clock } from "../components/clock";
import StudyMusic from "../components/studyMusic";
import { Navbar } from "../components/common/navbar";
import ManImage from "../assets/man.png";

const ClockPage = () => {
  const location = useLocation();
  const { method, customTime } = location.state;

  console.log("ClockPage - Method:", method);
  console.log("ClockPage - CustomTime:", customTime);

  return (
    <div className="flex flex-col items-center h-screen min-h-screen w-screen bg-cover bg-center relative bg-gradient-to-t from-green-300 to-blue-500">
      <img src={ManImage} width={550} className="absolute right-0 top-32" />
      <h1 className="text-5xl font-bold text-center text-slate-800">
        ONE STEP AT A TIME, YOU WILL GET THERE
      </h1>

      <h1 className=" pt-5 text-2xl ">{method}</h1>

      <div className="flex flex-col items-center h-full border-blue-100 border-t-2 gap-2">
        <div className="h-full items-center flex">
          <Clock method={method} customTime={customTime} />
        </div>
      </div>

      <Navbar />
      <div className="absolute left-0 top-64">
        <StudyMusic />
      </div>
    </div>
  );
};

export default ClockPage;
