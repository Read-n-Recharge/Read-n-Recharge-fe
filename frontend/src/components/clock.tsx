import React, { useEffect, useState } from "react";
import "../styles/App.css";
import { Modal } from "../components/common/modal";

export function Clock({ method, customTime }) {
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [round, setRound] = useState(1);
  const [isBreak, setIsBreak] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    switch (method) {
      case "Pomodoro technique":
        setTime({ minutes: 25, seconds: 0 });
        setRound(1);
        setIsBreak(false);
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
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime.minutes === 0 && prevTime.seconds === 0) {
            clearInterval(timer);
            handleSessionComplete();
            return prevTime;
          } else if (prevTime.seconds === 0) {
            return { minutes: prevTime.minutes - 1, seconds: 59 };
          } else {
            return { ...prevTime, seconds: prevTime.seconds - 1 };
          }
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, time]);

  const handleSessionComplete = () => {
    const message = isBreak
      ? `Break complete. Round: ${round}`
      : `Session complete. Round: ${round}`;

    setModalMessage(message);
    setIsModalOpen(true);

    setIsRunning(false);
  };

  const handleStartTime = () => setIsRunning(true);
  const handleStopTime = () => setIsRunning(false);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleNextSession = () => {
    if (method === "Pomodoro technique") {
      if (isBreak) {
        if (round < 4) {
          setRound(round + 1);
          setTime({ minutes: 25, seconds: 0 });
          setIsBreak(false);
          console.log(`Round ${round + 1}: Starting 25-minute session`);
          setIsRunning(true);
        } else {
          setRound(1);
          setTime({ minutes: 20, seconds: 0 });
          setIsBreak(true);
          setIsRunning(true);
        }
      } else {
        setIsBreak(true);
        if (round < 4) {
          setTime({ minutes: 5, seconds: 0 }); // Regular break time
        } else {
          setTime({ minutes: 20, seconds: 0 });
        }
        setIsRunning(true);
      }
    }
    handleCloseModal();
  };

  return (
    <div className="w-full flex items-center justify-center flex-col">
      <div className="clock gap-3 flex w-full h-full items-center justify-center text-7xl">
        <div className="bg-white aspect-square w-32 flex items-center justify-center bg-opacity-25 p-5 rounded-xl">
          {String(time.minutes).padStart(2, "0")}
        </div>
        :
        <div className="bg-white aspect-square w-32 flex items-center justify-center p-5 bg-opacity-25 rounded-xl">
          {String(time.seconds).padStart(2, "0")}
        </div>
      </div>
      <div className="pt-12">
        {isRunning ? (
          <button
            onClick={handleStopTime}
            className="bg-red-500 text-white font-bold rounded-lg hover:bg-opacity-35 p-3 w-48"
          >
            stop
          </button>
        ) : (
          <button
            onClick={handleStartTime}
            className="bg-blue-500 text-white font-bold rounded hover:bg-opacity-35 p-3 w-48"
          >
            start
          </button>
        )}
      </div>
      {method === "Pomodoro technique" && (
        <div className="mt-4 text-lg">
          Round: {round} {isBreak && "  Break"}
        </div>
      )}
      {isModalOpen && (
        <Modal
          message={modalMessage}
          onClose={handleCloseModal}
          onNextSession={
            method === "Pomodoro technique" && round < 4
              ? handleNextSession
              : null
          }
          round={round}
        />
      )}
    </div>
  );
}
