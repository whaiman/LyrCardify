import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import SpotifyTrackSearch from './SpotifyTrackSearch';
import LyricsInput from './LyricsInput';
import CardStyleOptions from './CardStyleOptions';
import LyricsCardPreview from './LyricsCardPreview';
import { fetchSpotifyTrackData } from '../services/spotifyApi';
import '../styles/LyricsCardCreator.css';

const LyricsCardCreator = () => {
  const [trackData, setTrackData] = useState({
    image: null,
    artist: '',
    title: '',
    album: '',
    loaded: false,
  });
  const [lyrics, setLyrics] = useState('');
  const [cardStyle, setCardStyle] = useState({
    bgColor: '#191414',
    gradient: '#1DB954',
    textColor: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter, sans-serif',
    cardFormat: 'square',
    imageFilter: 'none',
    shadowIntensity: 0.25,
    blur: false,
    textShadow: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [disableAnimations, setDisableAnimations] = useState(false);

  const cardRef = useRef(null);

  const handleFetchTrack = async (trackUrl) => {
    if (!trackUrl) {
      setError('Please enter a valid Spotify track URL');
      return;
    }
    setIsLoading(true);
    setError('');

    try {
      const data = await fetchSpotifyTrackData(trackUrl);
      if (data) {
        setTrackData({
          image: data.image,
          artist: data.artist,
          title: data.title,
          album: data.album,
          loaded: true,
        });
      }
    } catch (err) {
      setError(`Failed to fetch track data: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLyricsChange = (text) => {
    setLyrics(text);
  };

  const handleStyleChange = (styleUpdates) => {
    setCardStyle((prevStyle) => ({ ...prevStyle, ...styleUpdates }));
  };

    const exportCard = async () => {
      if (!cardRef.current) return;

      try {
        setIsLoading(true);
        setDisableAnimations(true); // Отключаем анимации перед рендерингом
        cardRef.current.scrollTop = 0;

        // Ждем завершения обновления DOM
        await new Promise((resolve) => setTimeout(resolve, 100));

        const canvas = await html2canvas(cardRef.current, {
          scale: 2,
          useCORS: true,
          backgroundColor: null,
          width: cardRef.current.offsetWidth,
          height: cardRef.current.offsetHeight,
        });

        const link = document.createElement('a');
        link.download = `${trackData.artist} - ${trackData.title} lyrics.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (err) {
        setError(`Failed to export image: ${err.message}`);
      } finally {
        setIsLoading(false);
        setDisableAnimations(false); // Восстанавливаем анимации
      }
    };

  return (
    <div className="lyrics-card-creator">
      <div className="editor-panel fade-in">
        <h2>Create Your Lyrics Card</h2>

        <section className="section">
          <h3>1. Search Spotify Track</h3>
          <SpotifyTrackSearch onFetchTrack={handleFetchTrack} isLoading={isLoading} />
          {error && <div className="error-message">{error}</div>}
        </section>

        <section className="section">
          <h3>2. Enter Lyrics</h3>
          <LyricsInput onLyricsChange={handleLyricsChange} value={lyrics} />
        </section>

        <section className="section">
          <h3>3. Customize Style</h3>
          <CardStyleOptions cardStyle={cardStyle} onStyleChange={handleStyleChange} />
        </section>

        <button
          className="export-button"
          onClick={exportCard}
          disabled={!trackData.loaded || !lyrics || isLoading}
        >
          {isLoading ? 'Exporting...' : 'Export as Image'}
        </button>
      </div>

      <div className="preview-panel fade-in">
        <h2>Preview</h2>
        <LyricsCardPreview ref={cardRef} trackData={trackData} lyrics={lyrics} cardStyle={cardStyle} disableAnimations={disableAnimations} />
      </div>
    </div>
  );
};

export default LyricsCardCreator;