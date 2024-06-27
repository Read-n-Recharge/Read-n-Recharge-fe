import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Clock } from "../components/clock";
import StudyMusic from "../components/studyMusic";
const ClockPage = () => {
  const location = useLocation();
  const { method, customTime } = location.state;

  return (
    <div className="bg-blue-100">
      <h1>Study Timeer</h1>
      <Clock method={method} customTime={customTime} />
      <StudyMusic />
    </div>
  );
};

export default ClockPage;
