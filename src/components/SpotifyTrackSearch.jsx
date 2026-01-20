import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { isUserLoggedIn } from '../services/spotifyLogin';
import { fetchCurrentlyPlaying } from '../services/spotifyApi';
import '../styles/SpotifyTrackSearch.css';

const SpotifyTrackSearch = ({ onFetchTrack, isLoading, setTrackData, setCardStyle, extractColorsFromImage }) => {
  const { t } = useLanguage();
  const [trackUrl, setTrackUrl] = useState('');
  const [isFetchingPlaying, setIsFetchingPlaying] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (trackUrl.trim()) {
      onFetchTrack(trackUrl.trim());
    }
  };

  const handleFetchCurrent = async () => {
    setIsFetchingPlaying(true);
    try {
      const data = await fetchCurrentlyPlaying();
      if (data) {
        // Since we have the data, we can call a callback or handle it here
        // But onFetchTrack usually takes a URL.
        // Let's modify the parent to accept full data too, or just pass the URL.
        // If we have data, let's trigger the parent's update logic.
        if (data.external_url) {
            onFetchTrack(data.external_url);
        }
      } else {
        alert("Nothing is playing on Spotify right now!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetchingPlaying(false);
    }
  }

  return (
    <div className="spotify-track-search">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={trackUrl}
            onChange={(e) => setTrackUrl(e.target.value)}
            placeholder={t?.creator?.searchPlaceholder || "Paste Spotify Link..."}
            className="track-url-input"
            disabled={isLoading || isFetchingPlaying}
          />
          <button 
            type="submit" 
            className="fetch-button"
            disabled={isLoading || !trackUrl.trim() || isFetchingPlaying}
          >
            {isLoading ? (t?.creator?.searching || 'Searching...') : (t?.creator?.searchButton || 'Fetch')}
          </button>
        </div>
      </form>
      {isUserLoggedIn() && (
        <button 
          className="fetch-playing-button" 
          onClick={handleFetchCurrent}
          disabled={isLoading || isFetchingPlaying}
        >
          {isFetchingPlaying ? (t?.creator?.searching || "Wait...") : (t?.creator?.loadPlaying || "🎵 Load Currently Playing")}
        </button>
      )}
      <div className="url-examples">
        <small>Example: https://open.spotify.com/track/ID or spotify:track:ID</small>
      </div>
    </div>
  );
};

export default SpotifyTrackSearch;