import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getUserProfile, RetrieveStudyPreference } from "../services/api";
import { StudyPreferenceData, UserData } from "../type";
import { Navbar } from "../components/common/navbar";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<UserData | undefined>(undefined);
  const [UserPreference, setUserPreference] = useState<
    StudyPreferenceData | undefined
  >(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile();
        setUser(userProfile);
        setLoading(false);
      } catch (err) {
        setError("Failed to load user profile.");
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchUserPreference = async () => {
      try {
        const userPreference = await RetrieveStudyPreference();
        setUserPreference(userPreference);
        console.log(userPreference);
        setLoading(false);
      } catch (err) {
        setError("Failed to load user preference profile.");
        setLoading(false);
      }
    };
    fetchUserPreference();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="h-screen w-screen bg-custom-gradient flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col justify-center items-center">
        <div className="profile flex border-2 border-white m-12 p-5 gap-12 rounded-3xl ">
          <img
            src="https://i.pinimg.com/564x/48/01/4c/48014c97571374fcc1d3d37c6c81ab98.jpg"
            alt="profile image"
            className="w-80 rounded-lg"
          />

          <div className="right ">
            <div>
              <h1 className="text-7xl font-bold py-5 text-slate-100">
                Hi, {user?.first_name}
              </h1>
              <p className="text-xs pb-3 text-gray-700">
                Feeling ready to make things happen today? Let’s turn those
                dreams into plans and those plans into action{" "}
                <span className="text-purple-700 font-semibold">
                  —your journey starts here!
                </span>
              </p>
            </div>
            <div className="flex gap-4">
              <div className="information py-5 rounded-lg flex flex-col gap-3 w-1/2 bg-white p-3 bg-opacity-30">
                <h1 className="font-bold pb-3 text-cyan-800">
                  Personal information
                </h1>
                <p className="border-b-2 text-gray-600">
                  <span className="text-cyan-600 pr-5"> First name </span>
                  {user?.first_name}
                </p>
                <p className="border-b-2 text-gray-600">
                  <span className="text-cyan-600 pr-5">Last name</span>{" "}
                  {user?.last_name}
                </p>
                <p className="border-b-2 text-gray-600">
                  <span className="text-cyan-600 pr-5">Email</span>{" "}
                  {user?.email}
                </p>
              </div>
              <div className="Preference  py-5 rounded-lg flex flex-col gap-3 w-1/2 bg-white p-3 bg-opacity-30 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil-square absolute right-0 top-0 text-"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                  />
                </svg>
                <h1 className="font-bold pb-3 text-cyan-800">
                  Study Preference
                </h1>
                <p>
                  Chronotype <span>{UserPreference?.chronotype}</span>
                </p>
                <p>
                  Concentration level
                  <span>{UserPreference?.concentration}</span>
                </p>
                <p>
                  Studying style <span>{UserPreference?.studying_style}</span>
                </p>
                <p>
                  Procrastination <span>{UserPreference?.procrastination}</span>
                </p>
                <p>
                  Hobbies <span>{UserPreference?.physical_activity}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
