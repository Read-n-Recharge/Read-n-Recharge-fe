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
    <div className="bg-blue-100 flex flex-col items-center">
      <h1 className="p-5">Study Music</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-5">
        <button
          onClick={displayAndPlayMusic}
          className="p-2 bg-green-500 text-white rounded"
        >
          choose study music!
        </button>
        {videos.length > 0 && (
          <>
            <h2>Select a Study Music Video</h2>
            <select
              onChange={handleVideoChange}
              className="border p-2 rounded w-full mt-2"
              defaultValue={selectedVideo || ""}
            >
              {videos.map((video) => (
                <option key={video.id} value={video.url}>
                  {video.title}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
      {selectedVideo && (
        <div className="mt-5">
          <iframe src={selectedVideo} className="rounded-xs"></iframe>
        </div>
      )}
    </div>
  );
};

export default StudyMusic;
