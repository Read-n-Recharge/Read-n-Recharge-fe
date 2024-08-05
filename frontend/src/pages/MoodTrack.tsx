import React, { useState } from "react";
import { Navbar } from "../components/common/navbar";
import moment from "moment";
import { extendMoment } from "moment-range";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function MoodTrack() {
  const extendedMoment = extendMoment(moment);
  const [currentDate, setcurrentDate] = useState(moment());
  const [flashMessage, setFlashMessage] = useState("");
  const navigate = useNavigate();

  const startOfMonth = currentDate.clone().startOf("month");
  const endOfMonth = currentDate.clone().endOf("month");
  const startOfWeek = startOfMonth.clone().startOf("week");
  const endOfWeek = endOfMonth.clone().endOf("week");

  const range = extendedMoment.range(startOfWeek, endOfWeek);
  const weeks = Array.from(range.by("weeks"));

  const prevMonth = () => {
    setcurrentDate(currentDate.clone().subtract(1, "month"));
  };
  const NextMonth = () => {
    setcurrentDate(currentDate.clone().add(1, "month"));
  };
  const handleDateClick = (day) => {
    if (day.isAfter(moment(), "day")) {
      setFlashMessage("That day is not coming yet!");
      setTimeout(() => setFlashMessage(""), 3000);
    } else {
      navigate(`/record-mood/${day.format("Do MMM YY")}`);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center pt-5">
        <div className="w-2/4">
          <h1 className="text-xl font-semibold border-b border-black pb-2">
            Record your Mood !
          </h1>
          <div className="extenddate flex flex-row justify-between mt-5 bg-blue-100 p-3 rounded-full">
            <button onClick={prevMonth} className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-caret-left-fill"
                viewBox="0 0 16 16"
              >
                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
              </svg>
            </button>
            <p className="font-semibold">{currentDate.format("MMMM YYYY")}</p>
            <button onClick={NextMonth} className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-caret-right-fill"
                viewBox="0 0 16 16"
              >
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 pt-14">
            {moment.weekdaysShort().map((day, index) => (
              <div key={index} className="text-center font-bold">
                {day}
              </div>
            ))}
            {weeks.map((week, i) => {
              const weekStart = week.clone().startOf("week");

              return Array(7)
                .fill(0)
                .map((_, dayIndex) => {
                  const day = weekStart.clone().add(dayIndex, "days");
                  const isCurrentDate = day.isSame(moment(), "day");
                  return (
                    <div
                      key={day.toString()}
                      className={`text-center cursor-pointer ${
                        !day.isSame(currentDate, "month")
                          ? ""
                          : isCurrentDate
                          ? "bg-blue-100 rounded-full"
                          : "text-black"
                      } ${
                        day.isSame(currentDate, "month")
                          ? "hover:bg-gray-200 hover:rounded-full py-6"
                          : ""
                      }`}
                      onClick={() => handleDateClick(day)}
                    >
                      {day.isSame(currentDate, "month") ? day.date() : ""}
                    </div>
                  );
                });
            })}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {flashMessage && (
          <motion.div
            className="fixed top-0 left-0 right-0 bg-red-400 text-white text-center py-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            {flashMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
