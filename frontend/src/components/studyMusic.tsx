import React, { useState } from "react";
import axios from "axios";
import { Video } from "../type";

const API_KEY = "AIzaSyAh0DFOPpj9H3W5k_w_vwb46DqkmBvAi4o";

const fetchStudyMusic = async (): Promise<Video[]> => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          part: "snippet",
          q: "study music",
          type: "video",
          key: API_KEY,
          maxResults: 10,
        },
      }
    );
    return response.data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      url: `https://www.youtube.com/embed/${item.id.videoId}`,
    }));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching videos:", error.message);
      throw new Error(error.message);
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
};

const StudyMusic = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const displayAndPlayMusic = async () => {
    try {
      const fetchedVideos = await fetchStudyMusic();
      setVideos(fetchedVideos);
      if (fetchedVideos.length > 0) {
        setSelectedVideo(fetchedVideos[0].url);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUrl = e.target.value;
    setSelectedVideo(selectedUrl);
  };

  return (
    <div className="bg-blue-100 bg-opacity-30 p-2 rounded-lg shadow-lg flex flex-col items-center">
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="flex items-center">
        <button
          onClick={displayAndPlayMusic}
          className="p-3"
        >
          Choose Music!
        </button>
        {videos.length > 0 && (
          <select
            onChange={handleVideoChange}
            className="border border-gray-300 p-3 w-32 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            defaultValue={selectedVideo || ""}
          >
            {videos.map((video) => (
              <option key={video.id} value={video.url}>
                {video.title}
              </option>
            ))}
          </select>
        )}
      </div>
      {selectedVideo && (
        <div className="p-5">
          <iframe
            src={selectedVideo}
            className="rounded-lg shadow-lg"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default StudyMusic;
