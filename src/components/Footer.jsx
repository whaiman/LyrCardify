import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/Footer.css';

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>{t?.footer?.text || "Lyrcardify - Create beautiful Spotify lyrics cards"}</p>
        <p className="disclaimer">
          {t?.footer?.disclaimer || "This application is not affiliated with Spotify. The Spotify logo is used for visual card design only."}
        </p>
      </div>
    </footer>
  );
};

export default Footer;