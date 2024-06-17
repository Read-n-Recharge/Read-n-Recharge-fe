import React, { useState } from "react";
import { register } from "../services/api";
import StudyForm from "./StudyForm";
import PopupComponent from "./popup";
import { AnimatePresence } from "framer-motion";
import { UserData } from "../type";


const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const registerData: UserData = {
      email,
      password,
      confirm_password: confirmPassword,
      first_name: firstName,
      last_name: lastName,
    };

    try {
      const response = await register(registerData);

      console.log("Registration successful:", response);
      if (response.user_id) {
        setUserId(response.user_id);
        setSuccess(true);
      } else {
        throw new Error("User ID not returned from registration");
      }
    } catch (error: any) {
      console.error("Registration failed:", error.response.data);
      setError(error.response.data);
    }
  };

  if (success && userId !== null) {
    return <StudyForm userId={userId} />;
  }
  const handleClosePopup = () => {
    setError(null);
  };

  const validatePassword = (password: string) => {
    const lengthPassword = /.{8,}/;
    const numberPassword = /(?=.*\d)/;
    const letterPassword = /(?=.*[a-zA-Z])/;

    if (
      !lengthPassword.test(password) ||
      !letterPassword.test(password) ||
      !numberPassword.test(password)
    ) {
      return "Password must contain at least one number and one letter, and at least 8 or more characters";
    }
    return null;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const validationError = validatePassword(newPassword);
    setPasswordError(validationError);
    setError(null);
  };
  const validateConfirmPassword = (
    confirmPassword: string,
    password: string
  ) => {
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError(null);
    }
  };
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    validateConfirmPassword(newConfirmPassword, password);
  };

  return (
    <div className="p-4 space-y-2 md:space-y-3 sm:p-4">
      <h1 className="text-xl font-bold text-gray-900 md:text-2xl py-3 text-center">
        Create an account
      </h1>

      <AnimatePresence>
        {error && <PopupComponent error={error} onClose={handleClosePopup} />}
      </AnimatePresence>
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="firstName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="First name"
            required
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="Last name"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="••••••••"
            title="Password must contain at least one number and one letter, and at least 8 or more characters"
            required
          />
          {passwordError && (
            <p className="text-red-500 text-xs mt-2">{passwordError}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Confirm password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="••••••••"
            required
          />
          {confirmPasswordError && (
            <p className="text-red-500 text-xs mt-2">{confirmPasswordError}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
        >
          Create an account
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
