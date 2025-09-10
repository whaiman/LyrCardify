import React, { forwardRef } from 'react';
import '../styles/LyricsCardPreview.css';
import SpotifyLogo from './SpotifyLogo';

const LyricsCardPreview = forwardRef(({ trackData, lyrics, cardStyle, disableAnimations }, ref) => {
  const lyricLines = lyrics.split('\n').filter(line => line.trim() !== '');
  const formatClass = `card-format-${cardStyle.cardFormat}`;

  const backgroundStyle = cardStyle.gradient
    ? { 
        background: `linear-gradient(135deg, ${cardStyle.bgColor || '#191414'} 30%, ${cardStyle.gradient || '#1DB954'} 100%)` 
      }
    : { backgroundColor: cardStyle.bgColor || '#191414' };

  return (
    <div className="lyrics-card-preview-container fade-in">
      <div
        ref={ref}
        className={`lyrics-card-preview ${formatClass}`}
        style={{
          ...backgroundStyle,
          color: cardStyle.textColor || '#FFFFFF',
          fontFamily: cardStyle.fontFamily || 'Inter, sans-serif',
          boxShadow: `0 8px 24px rgba(0, 0, 0, ${cardStyle.shadowIntensity || 0.25})`,
          backdropFilter: cardStyle.blur ? 'blur(8px)' : 'none',
          backgroundColor: cardStyle.blur ? 'rgba(255, 255, 255, 0.08)' : undefined,
        }}
      >
        <div className="track-header">
          {trackData.loaded && (
            <div className="track-cover">
              <img
                src={trackData.image}
                alt="Album cover"
                style={{ filter: cardStyle.imageFilter || 'none' }}
                loading="lazy"
              />
            </div>
          )}

          {trackData.loaded ? (
            <div className="track-info">
              <div className="now-playing">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5V19L19 12L8 5Z" />
                </svg>
                Now Playing
              </div>
              <div className="track-title">{trackData.title}</div>
              <div className="track-artist">{trackData.artist}</div>
              <div className="track-album">{trackData.album}</div>
            </div>
          ) : (
            <div className="no-track-data">Select a track to start...</div>
          )}
        </div>

        <div
          className="lyrics-content overflow-y-auto custom-scrollbar"
          style={{
            fontSize: `${cardStyle.fontSize || 16}px`,
            textShadow: cardStyle.textShadow
              ? `0 1px 3px rgba(0, 0, 0, ${cardStyle.shadowIntensity || 0.25})`
              : 'none',
          }}
        >
          {lyricLines.length > 0 ? (
            lyricLines.map((line, index) => (
              <div
                key={index}
                className={`lyrics-line ${line.trim() === '' ? 'empty-line' : ''}`}
                style={{ animationDelay: disableAnimations ? '0s' : `${index * 0.08}s` }}
              >
                {line}
              </div>
            ))
          ) : (
            <div className="empty-lyrics">
              Add lyrics to display
            </div>
          )}
        </div>

        <div className="spotify-logo-container">
          <SpotifyLogo textColor={cardStyle.textColor} />
        </div>
      </div>
    </div>
  );
});

export default LyricsCardPreview;