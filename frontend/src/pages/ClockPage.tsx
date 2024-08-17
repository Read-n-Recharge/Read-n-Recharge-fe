import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Clock } from "../components/clock";
import StudyMusic from "../components/studyMusic";
import { Navbar } from "../components/common/navbar";
import ManImage from "../assets/man.png";
import botImg from "../assets/bot.png";
const ClockPage = () => {
  const location = useLocation();
  const { method, customTime } = location.state;

  console.log("ClockPage - Method:", method);
  console.log("ClockPage - CustomTime:", customTime);

  return (
    <div className="h-screen w-screen items-center flex flex-col bg-cover bg-center  bg-gradient-to-b from-teal-700 to-cyan-300 overflow-hidden">
      <Navbar />
      <div className="md:w-full h-full flex flex-col items-center gap-10 p-5  w-8/12">
        <img
          src={ManImage}
          className="absolute right-[-50px]  md:flex md:right-0 top-36 w-56 md:w-[500px]"
        />
        <img
          src={botImg}
          className="absolute  md:flex w-40 left-0 bottom-0 md:w-[300px]"
        />

        <h1 className=" text-3xl mt-20 md:text-5xl font-bold text-center text-slate-100">
          ONE STEP AT A TIME, YOU WILL GET THERE
        </h1>

        <h1 className=" text-xl md:text-2xl mt-20 text-white">{method}</h1>

        <StudyMusic />
        <div className="flex w-10/12  flex-col items-center h-full border-blue-100 gap-2">
          <Clock method={method} customTime={customTime} />
        </div>
      </div>
    </div>
  );
};

export default ClockPage;
