import React, { useState } from "react";
import { login, getUserProfile } from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthCredentials } from "../types";
import { AnimatePresence } from "framer-motion";
import PopupComponent from "./common/popupErr";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setError(null);
    setIsSubmitting(true);
    const credentials: AuthCredentials = { email, password };

    try {
      const response = await login(credentials);
      console.log("Login successful:", response);

      await getUserProfile();
      navigate("/todo-list");
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClosePopup = () => {
    setError(null);
  };

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-2xl font-bold text-gray-900">
        Sign in to your account
      </h1>
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <a
            href="#"
            className="text-sm font-medium hover:underline dark:text-primary-500"
          >
            Reset password?
          </a>
        </div>
        <button
          type="submit"
          className="w-full bg-slate-900 text-white p-3 rounded-2xl"
          disabled={isSubmitting}
        >
          Sign in
        </button>
      </form>

      <AnimatePresence>
        {error && <PopupComponent error={error} onClose={handleClosePopup} />}
      </AnimatePresence>
    </div>
  );
};

export default LoginPage;
