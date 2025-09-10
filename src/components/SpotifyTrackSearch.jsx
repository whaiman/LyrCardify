import React, { useState } from 'react';
import '../styles/SpotifyTrackSearch.css';

const SpotifyTrackSearch = ({ onFetchTrack, isLoading }) => {
  const [trackUrl, setTrackUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (trackUrl.trim()) {
      onFetchTrack(trackUrl.trim());
    }
  };

  return (
    <div className="spotify-track-search">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={trackUrl}
            onChange={(e) => setTrackUrl(e.target.value)}
            placeholder="https://open.spotify.com/track/... или spotify:track:..."
            className="track-url-input"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="fetch-button"
            disabled={isLoading || !trackUrl.trim()}
          >
            {isLoading ? 'Загрузка...' : 'Получить данные'}
          </button>
        </div>
      </form>
      <div className="url-examples">
        <small>Примеры: https://open.spotify.com/track/ID или spotify:track:ID</small>
      </div>
    </div>
  );
};

export default SpotifyTrackSearch;