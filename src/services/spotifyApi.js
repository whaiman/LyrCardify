const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

import { refreshAccessToken, isUserLoggedIn } from "./spotifyLogin";

export async function getSpotifyAccessToken() {
  // 1. Check if user is logged in and has a token
  if (isUserLoggedIn()) {
    const userToken = localStorage.getItem("spotify_user_token");
    const expires = localStorage.getItem("spotify_user_token_expires");

    if (userToken && expires) {
      if (new Date().getTime() < parseInt(expires)) {
        return userToken;
      } else {
        // Token expired, try refreshing
        console.log("User token expired, refreshing...");
        const newToken = await refreshAccessToken();
        if (newToken) return newToken;
      }
    }
  }

  // 2. Fallback to Client Credentials flow
  const localId = localStorage.getItem("spotify_client_id");
  const localSecret = localStorage.getItem("spotify_client_secret");

  const clientId = localId || SPOTIFY_CLIENT_ID;
  const clientSecret = localSecret || SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "Spotify API keys are not configured. Please go to Settings.",
    );
  }

  try {
    const cachedToken = getStoredToken();
    if (cachedToken) {
      return cachedToken;
    }
    const authString = `${clientId}:${clientSecret}`;
    const base64Auth = btoa(authString);

    const response = await fetch("/spotify/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${base64Auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ошибка API: ${response.status} ${errorText}`);
    }

    const data = await response.json();

    if (data.access_token) {
      saveToken(data.access_token, data.expires_in);
      return data.access_token;
    } else {
      throw new Error("Не удалось получить токен доступа");
    }
  } catch (error) {
    console.error("Ошибка при получении токена:", error);
    throw error;
  }
}

function saveToken(token, expiresIn) {
  const expireTime = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem("spotify_token", token);
  localStorage.setItem("spotify_token_expires", expireTime);
}

function getStoredToken() {
  const token = localStorage.getItem("spotify_token");
  const expires = localStorage.getItem("spotify_token_expires");

  if (token && expires) {
    if (new Date().getTime() < parseInt(expires)) {
      return token;
    }
  }

  return null;
}

export async function fetchCurrentlyPlaying() {
  try {
    const token = await getSpotifyAccessToken();
    if (!isUserLoggedIn()) {
      throw new Error(
        "User must be logged in to fetch currently playing track.",
      );
    }

    const response = await fetch("/api/spotify/me/player/currently-playing", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 204 || response.status === 404) {
      return null; // Nothing playing
    }

    if (!response.ok) {
      throw new Error("Failed to fetch currently playing track");
    }

    const data = await response.json();
    if (!data || !data.item) return null;

    const track = data.item;
    return {
      id: track.id,
      title: track.name,
      artist: track.artists.map((artist) => artist.name).join(", "),
      album: track.album.name,
      image: track.album.images[0]?.url || null,
      external_url: track.external_urls.spotify,
    };
  } catch (error) {
    console.error("Error fetching currently playing:", error);
    return null;
  }
}

function extractTrackId(url) {
  if (!url) return null;

  let trackId = null;

  if (url.includes("track/")) {
    trackId = url.split("track/")[1].split("?")[0];
  } else if (url.includes("spotify:track:")) {
    trackId = url.split("spotify:track:")[1];
  }

  console.log("Извлеченный trackId:", trackId);
  return trackId;
}

export async function fetchSpotifyTrackData(trackUrl) {
  try {
    const trackId = extractTrackId(trackUrl);

    if (!trackId) {
      throw new Error("Неверный формат ссылки на трек Spotify");
    }

    const token = await getSpotifyAccessToken();

    console.log("Запрос данных трека с trackId:", trackId);
    const response = await fetch(`/api/spotify/tracks/${trackId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 401) {
        console.log("Токен истек, очищаем кэш");
        localStorage.removeItem("spotify_token");
        localStorage.removeItem("spotify_token_expires");
        return await fetchSpotifyTrackData(trackUrl);
      }
      throw new Error(`API ответил с кодом: ${response.status} ${errorText}`);
    }

    const data = await response.json();

    return {
      id: data.id,
      title: data.name,
      artist: data.artists.map((artist) => artist.name).join(", "),
      album: data.album.name,
      image: data.album.images[0]?.url || null,
      external_url: data.external_urls.spotify,
    };
  } catch (error) {
    console.error("Ошибка при получении данных трека:", error);
    throw error;
  }
}
