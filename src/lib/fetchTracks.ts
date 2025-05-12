import { Track } from "./types";
import { fetchTracksByIds } from "./spotify";

export async function fetchTracks(): Promise<Track[]> {
  try {
    // First get the token
    const tokenResponse = await fetch("/api/spotify-token");
    const { access_token } = await tokenResponse.json();
    
    if (!access_token) {
      throw new Error("Failed to obtain Spotify access token");
    }
    
    // Fetch tracks data
    return await fetchTracksByIds(access_token);
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return [];
  }
} 