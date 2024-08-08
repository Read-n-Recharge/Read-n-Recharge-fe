import React, { useEffect, useState } from "react";
// import { RetrieveMoodRecords } from "../services/api";
// import { moodImages } from "../components/utils/moodImages";
// import { MoodRecord } from "../type";

export default function Activity() {
  // const [moodRecords, setMoodRecords] = useState<MoodRecord[]>([]);
  // useEffect(() => {
  //   const fetchMoodRecords = async () => {
  //     try {
  //       const allRecords = await RetrieveMoodRecords();
  //       setMoodRecords(allRecords);
  //     } catch (error) {
  //       console.error("Error fetching mood records:", error.message);
  //     }
  //   };

  //   fetchMoodRecords();
  // }, []);

  return (
    <div className="flex flex-col justify-center items-center m-">
      {" "}
      history
      {/* {moodRecords.length > 0 ? (
        <div className="mt-3 overflow-y-auto w-full">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {moodRecords.map((record) => (
              <li key={record.id} className="py-2">
                <div className="moodbox flex bg-blue-300 p-5 rounded-md items-center">
                  <img
                    src={moodImages[record.mood]}
                    alt={record.mood}
                    className="w-20 h-20 mr-4 bg-white rounded-full"
                  />
                  <div className="detailed">
                    <p>
                      <strong>Mood:</strong> {record.mood}
                    </p>
                    <p>
                      <strong>Context:</strong> {record.context}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No mood records for this day.</p>
      )} */}
    </div>
  );
}
