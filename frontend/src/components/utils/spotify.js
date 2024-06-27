import { useEffect } from "react";
import queryString from "query-string";

const authEndPoint = "https://accounts.spotify.com/authorize";
const clientID = "c1fc43c35a124563b80df2247dedce09";
const redirectURI = "http://localhost:5173/callback";
const scopes = [
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
];

const loginURL = `${authEndPoint}?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const SpotifyAuth = () => {
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      const parsedHash = queryString.parse(hash.substring(1));
      token = parsedHash.access_token;
      window.localStorage.setItem("token", token);
      window.location.hash = "";
    }
  }, []);

  const handleLogin = () => {
    window.location = loginURL;
  };

  return (
    <div>
      {!window.localStorage.getItem("token") ? (
        <button onClick={handleLogin}>Login to Spotify</button>
      ) : (
        <p>You are already logged in!</p>
      )}
    </div>
  );
};

export default SpotifyAuth;
