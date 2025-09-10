import React from 'react';
import '../styles/LyricsInput.css';

const LyricsInput = ({ onLyricsChange }) => {
  return (
    <div className="lyrics-input">
      <textarea
        placeholder="Вставьте текст песни здесь..."
        onChange={(e) => onLyricsChange(e.target.value)}
        className="lyrics-textarea"
      />
      <div className="lyrics-tips">
        <small>Совет: Разделяйте строки и куплеты, как в оригинальной песне</small>
      </div>
    </div>
  );
};

export default LyricsInput;