import React, { useState, useEffect } from "react";
import { StudyPreferenceData } from "../../type";
import { UpdatePreference } from "../../services/api";
import FlashCard from "../common/FlashCard";

interface PopupComponentProps {
  preference?: StudyPreferenceData;
  onClose: () => void;
}

const UpdatePreferencePopUp: React.FC<PopupComponentProps> = ({
  preference = {} as StudyPreferenceData,
  onClose,
}) => {
  const [chronotype, setChronotype] = useState(preference.chronotype || "");
  const [concentration, setConcentration] = useState(
    preference.concentration || ""
  );
  const [studyingStyle, setStudyingStyle] = useState(
    preference.studying_style || ""
  );
  const [procrastination, setProcrastination] = useState(
    preference.procrastination || false
  );
  const [physicalActivity, setPhysicalActivity] = useState(
    preference.physical_activity || ""
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (preference) {
      setChronotype(preference.chronotype || "");
      setConcentration(preference.concentration || "");
      setStudyingStyle(preference.studying_style || "");
      setProcrastination(preference.procrastination || false);
      setPhysicalActivity(preference.physical_activity || "");
    }
  }, [preference]);

  const handleSubmit = async () => {
    const updatedPreference: Partial<StudyPreferenceData> = {
      chronotype,
      concentration,
      studying_style: studyingStyle,
      procrastination,
      physical_activity: physicalActivity,
    };
    try {
      await UpdatePreference(updatedPreference);

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      setError("Error updating preferences. Please try again.");
      console.error("Update preference error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Study Preferences
        </h2>
        <div>
          <label
            htmlFor="chronotype"
            className="block pt-3 text-sm font-medium text-gray-900"
          >
            Select your vibe
          </label>
          <select
            id="chronotype"
            value={chronotype}
            onChange={(e) => setChronotype(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          >
            <option value="" disabled hidden>
              Are you a morning person or a night owl?
            </option>
            <option value="early_bird">Early Bird</option>
            <option value="night_owl">Night Owl</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="concentration"
            className="block  pt-3 text-sm font-medium text-gray-900"
          >
            Rate your focus level
          </label>
          <select
            id="concentration"
            value={concentration}
            onChange={(e) => setConcentration(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          >
            <option value="">How focused are you</option>
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="studyingStyle"
            className="block  pt-3 text-sm font-medium text-gray-900"
          >
            Pick your study style
          </label>
          <select
            id="studyingStyle"
            value={studyingStyle}
            onChange={(e) => setStudyingStyle(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          >
            <option value="" disabled hidden>
              Solo or with friends
            </option>
            <option value="group">Group Study</option>
            <option value="solo">Solo Study</option>
          </select>
        </div>

        <div className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
          <label
            htmlFor="procrastination"
            className="block pb-2 text-sm font-medium text-gray-900"
          >
            Are you a procrastinator?
          </label>
          <div>
            <input
              type="radio"
              id="procrastinationYes"
              name="procrastination"
              value="yes"
              checked={procrastination === true}
              onChange={() => setProcrastination(true)}
              className="mr-2"
            />
            <label htmlFor="procrastinationYes" className="mr-4">
              Yes, I’m a procrastinating person
            </label>
            <input
              type="radio"
              id="procrastinationNo"
              name="procrastination"
              value="no"
              checked={procrastination === false}
              onChange={() => setProcrastination(false)}
              className="mr-2"
            />
            <label htmlFor="procrastinationNo">Not,really!</label>
          </div>
        </div>

        <div>
          <label
            htmlFor="physicalActivity"
            className="block pt-3 text-sm font-medium text-gray-900"
          >
            Physical Activity
          </label>
          <textarea
            id="physicalActivity"
            value={physicalActivity}
            onChange={(e) => setPhysicalActivity(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          />
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <FlashCard message="Preferences updated successfully!" />}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePreferencePopUp;
