import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>Lyrcardify - Создавайте красивые карточки текста песен Spotify</p>
        <p className="disclaimer">
          Это приложение не связано со Spotify и является неофициальным. 
          Логотип Spotify используется только для визуального оформления карточек.
        </p>
      </div>
    </footer>
  );
};

export default Footer;