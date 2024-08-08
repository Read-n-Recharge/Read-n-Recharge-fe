import React, { useEffect } from "react";
import { RetrieveMoodRecords } from "../services/api";
import { Navbar } from "../components/common/navbar";

export default function Activity() {
  useEffect(() => {
    const fetchMoodRecords = async () => {
      try {
        const allRecords = await RetrieveMoodRecords();
      } catch (error) {
        console.error("Error fetching mood records:", error.message);
      }
    };

    fetchMoodRecords();
  }, []);

  return (
    <div>
      <p className="text-5xl m-auto text-center">coming soon</p>
      <Navbar />
    </div>
  );
}
