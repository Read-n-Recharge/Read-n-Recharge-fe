import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "../components/Header";
import bgImage from "../assets/bg-login.png";
import { LoginPage } from "../components/Login";
import { RegisterPage } from "../components/Register";

const formVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

export function AuthPage({ isLogin: initialIsLogin }) {
  const [isLogin, setIsLogin] = useState(initialIsLogin);

  useEffect(() => {
    setIsLogin(initialIsLogin);
  }, [initialIsLogin]);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Header />
      <section>
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white rounded-3xl sm:max-w-lg p-2 bg-opacity-80 border-2 m-8 px-5 w-full">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={formVariants}
                >
                  <LoginPage />
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={formVariants}
                >
                  <RegisterPage />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="text-center mt-4">
              {isLogin ? (
                <p className="text-sm font-light text-gray-500">
                  Don’t have an account yet?{" "}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="font-medium text-blue-400 hover:underline"
                  >
                    Register
                  </button>
                </p>
              ) : (
                <p className="text-sm font-light text-gray-500">
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="font-medium text-blue-400 hover:underline"
                  >
                    Login
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
