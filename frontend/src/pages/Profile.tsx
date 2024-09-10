import React, { useEffect, useState } from "react";
import { getUserProfile, RetrieveStudyPreference } from "../services/api";
import { StudyPreferenceData, UserData } from "../type";
import { Navbar } from "../components/common/navbar";
import UpdatePreferencePopUp from "../components/forms/UpdatePreferenceForm";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<UserData | undefined>(undefined);
  const [userPreference, setUserPreference] = useState<
    StudyPreferenceData | undefined
  >(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

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
        setLoading(false);
      } catch (err) {
        setError("Failed to load user preference profile.");
        setLoading(false);
      }
    };
    fetchUserPreference();
  }, []);

  const handlePopupToggle = () => {
    setShowPopup(!showPopup);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  const handleUpdatePreferences = async () => {
    try {
      const updatedPreference = await RetrieveStudyPreference(); // Refetch preferences
      setUserPreference(updatedPreference);
    } catch (err) {
      setError("Failed to update preferences.");
    }
  };

  return (
    <div className="h-screen w-screen bg-custom-gradient flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col justify-center items-center mx-28">
        <div className="profile flex border-2 border-white p-5 gap-12 rounded-3xl">
          <img
            src="https://i.pinimg.com/564x/48/01/4c/48014c97571374fcc1d3d37c6c81ab98.jpg"
            alt="profile image"
            className="w-96 rounded-3xl"
          />

          <div className="right">
            <div>
              <h1 className="text-6xl font-bold py-5 text-slate-100">
                Hi, {user?.first_name}
              </h1>
              <p className="text-md pb-3 text-gray-700">
                Feeling ready to make things happen today? Let’s turn those
                dreams into plans and those plans into action{" "}
                <span className="text-purple-700 font-semibold">
                  —your journey starts here!
                </span>
              </p>
            </div>
            <div className="flex gap-4">
              <div className="information rounded-3xl flex flex-col gap-3 bg-white bg-opacity-30 w-2/3 p-5 relative">
                <h1 className="font-bold pb-3 text-cyan-800 text-center">
                  Personal information
                </h1>
                <div className="information flex gap-5">
                  <div className="flex flex-col gap-2 text-cyan-600">
                    <span className=""> Name</span>
                    <span className=""> lastname</span>
                    <span className=""> Email</span>
                  </div>
                  <div className="flex flex-col gap-2 text-gray-700">
                    <span> {user?.first_name}</span>
                    <span> {user?.last_name}</span>
                    <span> {user?.email}</span>
                  </div>
                </div>
              </div>
              <div className="Preference rounded-3xl flex flex-col gap-3 bg-white bg-opacity-30 w-2/3 p-5 relative">
                <h1 className="font-bold pb-3 text-cyan-800 text-center">
                  Study Preference
                </h1>
                <div className="information flex gap-5">
                  <div className="flex flex-col gap-2 text-cyan-600">
                    <span className=""> Chronotype</span>

                    <span className=""> Concentration</span>

                    <span className=""> Studying style</span>

                    <span className="">Procrastination</span>

                    <span className=""> Hobbies</span>
                  </div>
                  <div className="flex flex-col gap-2 text-gray-700">
                    <span> {userPreference?.chronotype}</span>

                    <span> {userPreference?.concentration}</span>

                    <span> {userPreference?.studying_style}</span>

                    <span>
                      {userPreference?.procrastination
                        ? "Yes, I tend to procrastinate"
                        : "No, I don't procrastinate"}
                    </span>

                    <span> {userPreference?.physical_activity}</span>
                  </div>
                </div>
                <button
                  onClick={handlePopupToggle}
                  className="bg-cyan-500 p-2 rounded-xl text-white "
                >
                  Edit Preference
                </button>
              </div>
            </div>
          </div>
        </div>
        {showPopup && (
          <div className="absolute top-0 right-0 bg-white border p-4 rounded shadow-lg">
            <UpdatePreferencePopUp
              preference={userPreference}
              onClose={() => {
                handlePopupToggle();
                handleUpdatePreferences();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
