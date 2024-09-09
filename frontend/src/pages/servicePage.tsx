import React from "react";
import { Header } from "../components/common/Header";
import task from "../assets/task.png";
import mood from "../assets/mood.png";
import phone from "../assets/phone.png";
import { motion } from "framer-motion"; // Import Framer Motion components

export function ServicePage() {
  const motionProps = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
    transition: { duration: 0.9 },
    viewport: { once: false, amount: 0.1 },
  };

  return (
    <div className="min-h-screen bg-cover bg-center pb-12 bg-custom-gradient">
      <nav className="border-b fixed top-0 w-full z-10 pb-3">
        <Header />
      </nav>

      <motion.div className="content py-14 px-5 text-white" {...motionProps}>
        <div className="box1 w-full flex items-center relative">
          <img src={task} alt="Task managements img" className="w-1/2" />
          <div className="des absolute right-12 p-4 w-1/2">
            <h1 className="font-bold text-xl py-3">Study Plan</h1>
            <p className="text-sm pb-10">
              Students can customize their study schedules by managing tasks and
              choosing study methods like Pomodoro or 90-minute sessions. They
              can also play background music from a library to stay focused
              during study periods.
            </p>
            <a
              href="/"
              className="border rounded-full p-3 text-xs font-semibold"
            >
              Get Started
            </a>
          </div>
        </div>

        <div className="box1 w-full flex items-center relative py-24">
          <img
            src={mood}
            alt="Task managements img"
            className="w-96 absolute right-24"
          />
          <div className="des absolute left-32 p-4 w-1/2">
            <h1 className="font-bold text-xl py-3">Mood Tracking</h1>
            <p className="text-sm pb-10">
              Mood tracking System allows users to record their emotional state
              at various times throughout the day, including upon waking, before
              study, after study, and at the end of the day. It provides
              insights and patterns in their mood over time, which can be used
              to improve their emotions and reduce stress.
            </p>
            <a
              href="/"
              className="border rounded-full p-3 text-xs font-semibold"
            >
              Get Started
            </a>
          </div>
        </div>
        <div className="box1 w-full flex items-center relative pt-4">
          <img src={phone} alt="Task managements img" className="w-1/2" />
          <div className="des absolute right-12 p-4 w-1/2">
            <h1 className="font-bold text-xl py-3">Phone Charging Station</h1>
            <p className="text-sm pb-10">
              The Charging System uses a solar-powered system with sustainable
              and environmentally friendly features, harnessing the power of
              solar energy to provide a renewable source of electricity for
              charging devices. This system integrates solar cells energy
              storage batteries to ensure reliable and efficient charging
              capabilities, even in the locations where electrical wiring cannot
              be routed.
            </p>
            <a
              href="/"
              className="border rounded-full p-3 text-xs font-semibold"
            >
              Get Started
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
