import React, { forwardRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/LyricsCardPreview.css';
import SpotifyLogo from './SpotifyLogo';

const LyricsCardPreview = forwardRef(({ trackData, lyrics, cardStyle, disableAnimations }, ref) => {
  const { t } = useLanguage(); 
  const lyricLines = lyrics.split('\n').filter(line => line.trim() !== '');
  const formatClass = `card-format-${cardStyle.cardFormat}`;

  const backgroundStyle = cardStyle.bgMode === 'custom' && cardStyle.backgroundImage
    ? {
        backgroundImage: `url(${cardStyle.backgroundImage})`,
      }
    : cardStyle.bgMode === 'dynamic' && trackData.image
    ? {
        backgroundImage: `url(${trackData.image})`,
      }
    : cardStyle.gradient && cardStyle.gradient !== cardStyle.bgColor
    ? { 
        background: `linear-gradient(135deg, ${cardStyle.bgColor || '#191414'} 0%, ${cardStyle.gradient || '#1DB954'} 100%)` 
      }
    : { backgroundColor: cardStyle.bgColor || '#191414' };

  const getTextStyle = () => {
    return {
      fontSize: `${cardStyle.fontSize || 16}px`,
      fontFamily: cardStyle.fontFamily || 'Inter, sans-serif',
      color: cardStyle.textColor || '#FFFFFF',
      textShadow: cardStyle.textShadow
        ? `0 2px 8px rgba(0, 0, 0, ${cardStyle.shadowIntensity || 0.4})`
        : 'none',
    };
  };

  return (
    <div className="lyrics-card-preview-container fade-in">
      <div
        ref={ref}
        className={`lyrics-card-preview ${formatClass}`}
        style={{
          color: cardStyle.textColor || '#FFFFFF',
          fontFamily: cardStyle.fontFamily || 'Inter, sans-serif',
        }}
      >
        {/* Background Layer */}
        <div 
          className="card-background-layer" 
          style={{
            ...backgroundStyle,
            filter: cardStyle.blur ? 'blur(20px) brightness(0.7)' : 'none',
            transform: cardStyle.blur ? 'scale(1.1)' : 'scale(1)', // Hide blurred edges
          }}
        />
        
        {/* Semi-transparent overlay for better text readability */}
        <div className="card-overlay" style={{ opacity: cardStyle.blur ? 0.3 : 0 }} />

        <div className="card-content-wrapper">
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
                  {t?.preview?.nowPlaying || 'Now Playing'}
                </div>
                <div className="track-title">{trackData.title}</div>
                <div className="track-artist">{trackData.artist}</div>
                <div className="track-album">{trackData.album}</div>
              </div>
            ) : (
              <div className="no-track-data">{t?.preview?.selectTrack || 'Select a track to start...'}</div>
            )}
          </div>

          <div
            className="lyrics-content custom-scrollbar"
            style={getTextStyle()}
          >
            {lyricLines.length > 0 ? (
              lyricLines.map((line, index) => (
                <div
                  key={index}
                  className={`lyrics-line ${line.trim() === '' ? 'empty-line' : ''}`}
                  style={{ 
                    animationDelay: disableAnimations ? '0s' : `${index * 0.08}s`,
                  }}
                >
                  {line}
                </div>
              ))
            ) : (
              <div className="empty-lyrics">
                {t?.preview?.addLyrics || 'Add lyrics to display'}
              </div>
            )}
          </div>

          <div className="spotify-logo-container">
            <SpotifyLogo textColor={cardStyle.textColor} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default LyricsCardPreview;