import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { useLanguage } from "../contexts/LanguageContext";
import SpotifyTrackSearch from "./SpotifyTrackSearch";
import LyricsInput from "./LyricsInput";
import CardStyleOptions from "./CardStyleOptions";
import LyricsCardPreview from "./LyricsCardPreview";
import { fetchSpotifyTrackData } from "../services/spotifyApi";
import { extractColorsFromImage } from "../utils/colorExtractor";
import "../styles/LyricsCardCreator.css";

const LyricsCardCreator = () => {
  const { t } = useLanguage();
  const [trackData, setTrackData] = useState({
    image: null,
    artist: "",
    title: "",
    album: "",
    loaded: false,
  });
  const [lyrics, setLyrics] = useState("");
  const [cardStyle, setCardStyle] = useState({
    bgColor: "#191414",
    gradient: "#1DB954",
    bgMode: "dynamic",
    backgroundImage: null,
    textColor: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Inter, sans-serif",
    cardFormat: "square",
    imageFilter: "none",
    shadowIntensity: 0.4,
    blur: true,
    textShadow: true,
    activePreset: "classic",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [disableAnimations, setDisableAnimations] = useState(false);

  const cardRef = useRef(null);

  const handleFetchTrack = async (trackUrl) => {
    if (!trackUrl) {
      setError(t.creator.error);
      return;
    }

    setIsLoading(true);
    setError("");

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

        // Auto extract colors on new track
        if (data.image) {
          const colors = await extractColorsFromImage(data.image);
          setCardStyle((prev) => ({
            ...prev,
            bgColor: colors.primary,
            gradient: colors.secondary,
            textColor: colors.text,
          }));
        }
      }
    } catch (err) {
      setError(`${t.creator.fetchError}: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAutoColor = async () => {
    if (trackData.image) {
      setIsLoading(true);
      try {
        const colors = await extractColorsFromImage(trackData.image);
        setCardStyle((prev) => ({
          ...prev,
          bgColor: colors.primary,
          gradient: colors.secondary,
          textColor: colors.text,
          activePreset: null,
        }));
      } catch (err) {
        console.error("Auto-color error:", err);
      } finally {
        setIsLoading(false);
      }
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
      setDisableAnimations(true);
      cardRef.current.scrollTop = 0;

      await new Promise((resolve) => setTimeout(resolve, 100));

      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        width: cardRef.current.offsetWidth,
        height: cardRef.current.offsetHeight,
      });

      const link = document.createElement("a");
      link.download = `${trackData.artist} - ${trackData.title} lyrics.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      setError(`Failed to export image: ${err.message}`);
    } finally {
      setIsLoading(false);
      setDisableAnimations(false);
    }
  };

  return (
    <div className="lyrics-card-creator">
      <div className="editor-panel fade-in">
        <h2>{t.creator.title}</h2>

        <section className="section">
          <h3>{t.creator.step1}</h3>
          <SpotifyTrackSearch
            onFetchTrack={handleFetchTrack}
            isLoading={isLoading}
            t={t}
          />
          {error && <div className="error-message">{error}</div>}
        </section>

        <section className="section">
          <h3>{t.creator.step2}</h3>
          <LyricsInput
            onLyricsChange={handleLyricsChange}
            value={lyrics}
            t={t}
          />
        </section>

        <section className="section">
          <h3>{t.creator.step3}</h3>
          <CardStyleOptions
            cardStyle={cardStyle}
            onStyleChange={handleStyleChange}
            t={t}
            onAutoColor={handleAutoColor}
          />
        </section>

        <button
          className="export-button"
          onClick={exportCard}
          disabled={!trackData.loaded || !lyrics || isLoading}
        >
          {isLoading ? t.creator.exporting : t.creator.export}
        </button>
      </div>

      <div className="preview-panel fade-in">
        <h2>Preview</h2>
        <LyricsCardPreview
          ref={cardRef}
          trackData={trackData}
          lyrics={lyrics}
          cardStyle={cardStyle}
          disableAnimations={disableAnimations}
        />
      </div>
    </div>
  );
};

export default LyricsCardCreator;
