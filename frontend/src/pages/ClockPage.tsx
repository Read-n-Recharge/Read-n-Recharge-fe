import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Clock } from "../components/clock";

const ClockPage = () => {
  const location = useLocation();
  const { method, customTime } = location.state;

  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const fetchStudyPlaylists = async () => {
    const token = window.localStorage.getItem('token');
    if (token) {
      const response = await axios.get('https://api.spotify.com/v1/search', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: 'study',
          type: 'playlist',
          limit: 10,
        },
      });
      return response.data.playlists.items;
    }
    return [];
  };
  

  useEffect(() => {
    const fetchPlaylists = async () => {
      const playlists = await fetchStudyPlaylists();
      setPlaylists(playlists);
    };
    fetchPlaylists();
  }, []);

  const playPlaylist = async (playlistUri) => {
    const token = window.localStorage.getItem('token');
    if (token) {
      await axios.put(
        `https://api.spotify.com/v1/me/player/play`,
        {
          context_uri: playlistUri,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedPlaylist(playlistUri);
    }
  };

  return (
    <div className="bg-blue-100 flex flex-col items-center">
      <h1 className="p-5">Study Timer</h1>
      <Clock method={method} customTime={customTime} />
      <div className="mt-5">
        <h2>Select a Study Playlist</h2>
        <div className="mt-5">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="mb-2">
              <p>{playlist.name}</p>
              <button onClick={() => playPlaylist(playlist.uri)} className="p-2 bg-green-500 text-white rounded">Play</button>
            </div>
          ))}
        </div>
      </div>
      {selectedPlaylist && (
        <div className="mt-5">
          <iframe
            src={`https://open.spotify.com/embed/playlist/${selectedPlaylist.split(':').pop()}`}
            width="300"
            height="380"
            frameBorder="0"
            allowTransparency="true"
            allow="encrypted-media"
            title="Spotify Player"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default ClockPage;
