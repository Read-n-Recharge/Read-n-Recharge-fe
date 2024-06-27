import React from "react";
import { useEffect, useState } from "react";

export function Clock({ method, customTime }) {
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    switch (method) {
      case "Pomodoro technique":
        setTime({ minutes: 25, seconds: 0 });
        break;
      case "52-17 method":
        setTime({ minutes: 52, seconds: 0 });
        break;
      case "90-minute focus sessions":
        setTime({ minutes: 90, seconds: 0 });
        break;
      case "custom time":
        if (customTime) setTime({ minutes: customTime.minutes, seconds: 0 });
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
    <div className="">
      <div className="text-5xl">
        {String(time.minutes).padStart(2, "0")}:
        {String(time.seconds).padStart(2, "0")}
      </div>

      {isRunning ? (
        <button onClick={handleStopTime}>Stop</button>
      ) : (
        <button onClick={handleStartTime}>Start</button>
      )}
    </div>
  );
}
