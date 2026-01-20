const SPOTIFY_CLIENT_ID =
  import.meta.env.VITE_SPOTIFY_CLIENT_ID?.trim() ||
  localStorage.getItem("spotify_client_id")?.trim();
const REDIRECT_URI = window.location.origin + "/callback";

export async function redirectToAuthCodeFlow() {
  if (!SPOTIFY_CLIENT_ID) {
    console.error(
      "Spotify Client ID is missing! Check your environment variables or settings.",
    );
    alert(
      "Spotify Client ID is not configured. Please check your Vercel environment variables or app settings.",
    );
    return;
  }

  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("code_verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", SPOTIFY_CLIENT_ID);
  params.append("response_type", "code");
  params.append("redirect_uri", REDIRECT_URI);
  params.append(
    "scope",
    "user-read-private user-read-email user-read-currently-playing user-read-playback-state",
  );
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function getAccessToken(code) {
  const verifier = localStorage.getItem("code_verifier");

  const params = new URLSearchParams();
  params.append("client_id", SPOTIFY_CLIENT_ID);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", REDIRECT_URI);
  params.append("code_verifier", verifier);

  const result = await fetch("/spotify/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  if (!result.ok) {
    const errorData = await result.json();
    console.error("Spotify token exchange error:", errorData);
    throw new Error(errorData.error_description || "Authentication failed");
  }

  const { access_token, refresh_token, expires_in } = await result.json();

  if (access_token) {
    saveUserToken(access_token, refresh_token, expires_in);
  }

  return access_token;
}

export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("spotify_refresh_token");
  if (!refreshToken) return null;

  const params = new URLSearchParams();
  params.append("client_id", SPOTIFY_CLIENT_ID);
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refreshToken);

  const result = await fetch("/spotify/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  if (!result.ok) return null;

  const data = await result.json();
  if (data.access_token) {
    saveUserToken(
      data.access_token,
      data.refresh_token || refreshToken,
      data.expires_in,
    );
    return data.access_token;
  }
  return null;
}

function saveUserToken(token, refreshToken, expiresIn) {
  const expireTime = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem("spotify_user_token", token);
  if (refreshToken) {
    localStorage.setItem("spotify_refresh_token", refreshToken);
  }
  localStorage.setItem("spotify_user_token_expires", expireTime);
  localStorage.setItem("spotify_token", token);
  localStorage.setItem("spotify_token_expires", expireTime);
  localStorage.setItem("is_user_logged_in", "true");
}

export function logout() {
  localStorage.removeItem("spotify_user_token");
  localStorage.removeItem("spotify_refresh_token");
  localStorage.removeItem("spotify_user_token_expires");
  localStorage.removeItem("spotify_token");
  localStorage.removeItem("spotify_token_expires");
  localStorage.removeItem("is_user_logged_in");
}

export function isUserLoggedIn() {
  return localStorage.getItem("is_user_logged_in") === "true";
}
