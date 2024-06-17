import React, { useState } from "react";
import { submitStudyPreference } from "../services/api";

interface StudyFormProps {
  userId: number;
}

const StudyForm: React.FC<StudyFormProps> = ({ userId }) => {
  const [chronotype, setChronotype] = useState("");
  const [concentration, setConcentration] = useState("");
  const [studyingStyle, setStudyingStyle] = useState("");
  const [procrastination, setProcrastination] = useState(false);
  const [physicalActivity, setPhysicalActivity] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const preferenceData = {
        chronotype,
        concentration,
        studying_style: studyingStyle,
        procrastination,
        physical_activity: physicalActivity,
      };
      await submitStudyPreference(userId, preferenceData);
      setSuccess(true);
    } catch (error: any) {
      console.error("Failed to submit study preference:", error.response.data);
      setError(error.message || "Submission failed");
    }
  };

  if (success) {
    return <div>Study preference submitted successfully!</div>;
  }

  return (
    <div className="p-5">
      <div className="text-center pb-5">
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl py-3 text-center">
          Personal study preference
        </h1>
        <p className="" >Select for what you are</p>
      </div>

      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="chronotype"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Select your vibe
          </label>
          <select
            id="chronotype"
            value={chronotype}
            onChange={(e) => setChronotype(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          >
            <option value="" disabled hidden>Are you a morning person or a night owl?</option>
            <option value="early_bird">Early Bird</option>
            <option value="night_owl">Night Owl</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="concentration"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Rate your focus level
          </label>
          <select
            id="concentration"
            value={concentration}
            onChange={(e) => setConcentration(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          >
            <option value="" disabled hidden>How focused are you</option>
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="studyingStyle"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Pick your study style
          </label>
          <select
            id="studyingStyle"
            value={studyingStyle}
            onChange={(e) => setStudyingStyle(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          >
            <option value="" disabled hidden>Solo or with friends</option>
            <option value="group">Group Study</option>
            <option value="solo">Solo Study</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="procrastination"
            className="block mb-2 text-sm font-medium text-gray-900"
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
              Yes, I’m procrastinate person
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
            className="block mb-2 text-sm font-medium text-gray-900"
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

        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
        >
          Submit
        </button>
        {error && <div className="text-red-600">{error}</div>}
      </form>
    </div>
  );
};

export default StudyForm;
