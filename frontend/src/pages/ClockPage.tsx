import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Clock } from "../components/clock";
import StudyMusic from "../components/studyMusic";
const ClockPage = () => {
  const location = useLocation();
  const { method, customTime } = location.state;

  console.log("ClockPage - Method:", method);
  console.log("ClockPage - CustomTime:", customTime);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 mt-10 border-b-2 border-black w-3/4">
        Study Timer
      </h1>
      <div className="flex flex-col items-center">
        <Clock method={method} customTime={customTime} />
      </div>

      <StudyMusic />
    </div>
  );
};

export default ClockPage;
