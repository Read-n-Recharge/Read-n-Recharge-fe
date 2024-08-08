import React from "react";
import { useEffect, useState } from "react";
import "../styles/App.css";
import StudyMusic from "./studyMusic";
export function Clock({ method, customTime }) {
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    switch (method) {
      case "Pomodoro technique":
        setTime({ minutes: 25, seconds: 0 });
        console.log("Setting Pomodoro technique time: 25 minutes");
        break;
      case "52-17 method":
        setTime({ minutes: 52, seconds: 0 });
        console.log("Setting 52-17 method time: 52 minutes");
        break;
      case "90-minute focus sessions":
        setTime({ minutes: 90, seconds: 0 });
        console.log("Setting 90-minute focus sessions time: 90 minutes");
        break;
      case "custom time":
        if (customTime) setTime({ minutes: customTime.minutes, seconds: 0 });
        console.log(`Setting custom time: ${customTime.minutes} minutes`);
        break;
      default:
        setTime({ minutes: 0, seconds: 0 });
    }
  }, [method, customTime]);

  useEffect(() => {
    let timer;
    if (isRunning && (time.minutes > 0 || time.seconds > 0)) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime.seconds === 0) {
            return { minutes: prevTime.minutes - 1, seconds: 59 };
          }
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  const handleStartTime = () => setIsRunning(true);
  const handleStopTime = () => setIsRunning(false);

  return (
    <div className="w-full flex items-center justify-center flex-col">
      <div className="clock flex text-9xl">
        <div className="bg-white p-3 rounded-xl">
          {String(time.minutes).padStart(2, "0")}
 
        </div>
        :{" "}
        <div className="bg-white p-3 rounded-xl">
          {String(time.seconds).padStart(2, "0")}
        </div>
      </div>
      <div className="pt-12">
        {isRunning ? (
          <button
            onClick={handleStopTime}
            className="bg-red-300 text-white font-bold rounded hover:bg-red-400 p-3 w-48"
          >
            stop
          </button>
        ) : (
          <button
            onClick={handleStartTime}
            className="bg-blue-300 text-white font-bold rounded hover:bg-blue-400 p-3 w-48"
          >
            start
          </button>
        )}
      </div>
     
     
    </div>
  );
}
