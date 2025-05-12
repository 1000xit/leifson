// Utility functions for Spotify API authentication and data fetching
import querystring from "querystring";

export const getClientCredentialsToken = async () => {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  
  if (!client_id || !client_secret) {
    throw new Error('Missing Spotify API credentials. Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env.local');
  }
  
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64")
    },
    body: new URLSearchParams({
      grant_type: "client_credentials"
    })
  });
  
  if (!response.ok) {
    throw new Error('Failed to obtain Spotify access token');
  }
  
  const data = await response.json();
  return data.access_token;
};

// For authentication flow
export const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize";
export const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";

export const generateRandomString = (length: number): string => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const getAuthorizationUrl = (state: string): string => {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const redirect_uri = process.env.REDIRECT_URI || "http://localhost:3000/api/callback";
  const scope = "user-read-private user-read-email user-top-read";
  
  return (
    SPOTIFY_AUTH_URL +
    "?" +
    querystring.stringify({
      response_type: "code",
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
    })
  );
};

export const getAccessToken = async (
  code: string
): Promise<{ access_token: string; refresh_token: string }> => {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = process.env.REDIRECT_URI || "http://localhost:3000/api/callback";
  
  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    body: querystring.stringify({
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get access token");
  }

  return response.json();
};

export const refreshAccessToken = async (
  refresh_token: string
): Promise<{ access_token: string }> => {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  
  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh access token");
  }

  return response.json();
};

// List of track IDs you want to display
export const TRACK_IDS = [
  "0xVgfhlmU1mHDPhRGNVVMn", // WAKEY WAKEY by SLOE JACK
  "50WJyEZ6eJvjReXpguyXqO", // SHE DON'T WANT NO PUNK by WHO SHOT SCOTT
  "6fu1AWvQQMh8hLiyFDiEp6", // Contra by Khary, Abhi The Nomad
  "175BsnpIED4cR4PLpfdE59", // LIL BIT OF HOT by WHO SHOT SCOTT
  "5uafwYMZvzdOxgZISqOwmF", // LOVER by SLOE JACK
  "4lVjJUL2eWu7A8SyWhhgSL", // MISSISSIPPI by Billy Marchiafava
  "6SpLc7EXZIPpy0sVko0aoU", // MONTERO (Call Me By Your Name) by Lil Nas X
  "6HU7h9RYOaPRFeh0R3UeAr", // Doja Cat - Say So
  "4pt5fDVTg5GhEvEtlz9dKk", // Trap Queen by Fetty Wap
  "2xLMifQCjDGFmkHkpNLD9h", // SiR - Satisfaction
  "7ytR5pFWmSjzHJIeQkgog4", // JID - NEVER
  "2r4JRwcbIeuAoWtWN9pTrY", // A$AP Ferg - Plain Jane
];

// Fetch multiple tracks by their IDs
export const fetchTracksByIds = async (accessToken: string) => {
  const response = await fetch(
    `https://api.spotify.com/v1/tracks?ids=${TRACK_IDS.join(",")}`, 
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch tracks from Spotify');
  }
  
  const data = await response.json();
  return data.tracks;
}; 