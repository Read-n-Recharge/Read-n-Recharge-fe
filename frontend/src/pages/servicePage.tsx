import React from "react";
import { Header } from "../components/Header";
import { motion } from "framer-motion"; // Import Framer Motion components
import studyingImage from "../assets/studying.png";
import bgImage from "../assets/ocean.webp";
import moodtracking from "../assets/mood.webp";
import chargingPhone from "../assets/charging.webp";
import Faq from "../assets/FAQ.webp";
import { NavLink } from "react-router-dom";

export function ServicePage() {
  const motionProps = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
    transition: { duration: 0.5 },
    viewport: { once: false, amount: 0.1 },
  };

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center pb-12"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <nav className="bg-black bg-opacity-50 fixed top-0 w-full z-10">
          <Header />
        </nav>
        <div className="m-auto bg-black bg-opacity-50 pt-20 mb-0">
          {" "}
          <h1 className="text-white text-center p-12 text-3xl font-semibold">
            Let see our feature and service!
          </h1>
          <div className="flex flex-col items-center justify-center gap-12 m-auto px-12">
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-row p-2 text-sm gap-4 bg-white bg-opacity-80 w-full h-fit rounded-s-full">
                <img
                  src={studyingImage}
                  alt="studying image"
                  className="w-1/6 rounded-full p-1"
                />
                <div className="flex flex-col p-5">
                  <h1 className="font-bold text-blue-950 text-lg">
                    Study Plan
                  </h1>
                  <p className="pt-5 pb-1.5">
                    <b>Task Management </b>
                    Students can easily create and manage their tasks using our
                    system. This feature helps you stay organized and keep track
                    of all your assignments, projects, and study sessions.
                  </p>
                  <p className="py-1.5">
                    <b>Personalized Study Techniques </b>
                    Our system offers personalized study techniques tailored to
                    each student's unique learning style. Whether you prefer
                    visual aids, interactive exercises, or reading materials, we
                    provide the methods that work best for you.
                  </p>
                  <p className="py-1.5">
                    <b>Customizable Study Time </b>
                    We understand that every student has a different schedule.
                    Our platform allows you to customize your study time to fit
                    your personal needs. You can set up study sessions that suit
                    your routine and maximize your productivity.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div {...motionProps}>
              <div className="flex flex-row p-2 text-sm gap-4 bg-white bg-opacity-80 w-full h-fit rounded-s-full">
                <img
                  src={moodtracking}
                  alt="mood tracking image"
                  className="w-1/6 rounded-full p-1"
                />
                <div className="flex flex-col p-5">
                  <h1 className="font-bold text-blue-950 text-lg">
                    Emotional State Tracking
                  </h1>
                  <b className="pt-5 pb-1.5">
                    Our platform allows students to track their emotional state
                    at key times throughout the day:
                  </b>
                  <p className="py-1">
                    <b className="font-semibold">Upon Waking </b>
                    Record how you feel when you start your day
                    <br />
                    <b className="font-semibold">Before Study </b>
                    Log your emotions before you begin studying
                    <br />
                    <b className="font-semibold">After Study </b>
                    Reflect on your mood after studying
                    <br />
                    <b className="font-semibold">End of the Day </b>
                    Note your feelings at the end of the day
                  </p>
                  <h1 className="">Tracking your emotions for better life</h1>
                </div>
              </div>
            </motion.div>
            <motion.div {...motionProps}>
              <div className="flex flex-row p-2 text-sm gap-4 bg-white bg-opacity-80 w-full h-fit rounded-s-full">
                <img
                  src={chargingPhone}
                  alt="charging phone image"
                  className="w-1/6 rounded-full p-1"
                />
                <div className="flex flex-col p-5">
                  <h1 className="font-bold text-blue-950 text-lg">
                    Solar-Powered Charging Stations
                  </h1>
                  <p className="py-3">
                    <b className="font-semibold">Point Accumulation </b>
                    Earn points effortlessly by engaging with our study and
                    mood-tracking features. These points can be easily tracked
                    and viewed, helping you stay motivated and rewarded for your
                    efforts.
                  </p>
                  <p className="py-1">
                    <b className="font-semibold">
                      Solar-Powered Charging Stations
                    </b>
                    Make use of our eco-friendly solar-powered charging stations
                    to keep your devices charged. At these stations, you can
                    scan a QR code to redeem your accumulated points and
                    initiate the charging process. Choose to either use your
                    phone while it charges or leave it in a secure locker, where
                    you can pick it up later, fully charged and ready to go.
                    This seamless integration of point redemption and charging
                    options ensures convenience and sustainability.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div {...motionProps}>
              <div className="flex flex-row p-2 text-sm gap-4 bg-white bg-opacity-80 w-full h-fit rounded-s-full">
                <img
                  src={Faq}
                  alt="charging phone image"
                  className="w-1/6 rounded-full p-1"
                />
                <div className="flex flex-col p-5">
                  <h1 className="font-bold text-blue-950 text-lg pb-2">FAQ</h1>
                  <div className="space-y-2">
                    <div>
                      <p className="font-bold">Q: How do I earn points?</p>
                      <p className="pl-4">
                        A: You earn points by engaging with our study and
                        mood-tracking features. The more you use these features,
                        the more points you accumulate.
                      </p>
                    </div>
                    <div>
                      <p className="font-bold">Q: How do I redeem my points?</p>
                      <p className="pl-4">
                        A: To redeem your points, scan the QR code at one of our
                        solar-powered charging stations. Follow the prompts to
                        use your points for charging your device.
                      </p>
                    </div>

                    <div>
                      <p className="font-bold">
                        Q: How do I know the location of the nearest charging
                        station?
                      </p>
                      <p className="pl-4">
                        A: Our GPS feature allows you to check the availability
                        and location of the nearest charging station easily.
                      </p>
                    </div>
                    <div>
                      <p className="font-bold">
                        Q: Is my device secure while it’s charging?
                      </p>
                      <p className="pl-4">
                        A: Yes, your device is secure. You receive a randomly
                        generated password via an LED screen to unlock the
                        charging locker once your device is fully charged.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="flex justify-center items-center p-12 gap-12 text-white">
            <h1 className="text-xl font-semibold text-center">
              LET'S JOIN WITH US
            </h1>
            <NavLink
              to="/register"
              className="block p-3 rounded-full text-white bg-blue-950 hover:underline underline-offset-4 w-1/6 text-center border border-blue-700"
            >
              Register Now !
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
