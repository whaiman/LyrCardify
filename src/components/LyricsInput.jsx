import React from 'react';
import '../styles/LyricsInput.css';

const LyricsInput = ({ onLyricsChange, value, t }) => {
  return (
    <div className="lyrics-input-container">
      <textarea
        className="lyrics-textarea custom-scrollbar"
        placeholder={t?.creator?.lyricsPlaceholder || "Paste lyrics here..."}
        value={value}
        onChange={(e) => onLyricsChange(e.target.value)}
      />
    </div>
  );
};

export default LyricsInput;