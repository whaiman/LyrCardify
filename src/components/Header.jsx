import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from '../contexts/LanguageContext';
import "../styles/Header.css";

const Header = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const { t, language, toggleLanguage } = useLanguage();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="app-header fade-in">
      <div className="logo">
        <Link to="/">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-icon">
            <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM16.75 16.5C16.5 16.75 16 17 15.75 16.75C13.25 15.25 10.25 15 6.25 15.75C6 15.75 5.75 15.5 5.75 15.25C5.75 15 6 14.75 6.25 14.75C10.5 14 13.75 14.25 16.5 15.75C16.75 16 16.75 16.25 16.75 16.5Z" fill="currentColor" />
          </svg>
          <span>LyrCardify</span>
        </Link>
      </div>
      <nav className="main-nav">
        <ul>
          <li><Link to="/" className="nav-link">{t.nav.create}</Link></li>
          <li><Link to="/about" className="nav-link">{t.nav.about}</Link></li>
          <li><Link to="/settings" className="nav-link settings-icon" title={t.nav.settings}>⚙️</Link></li>
          <li>
            <button onClick={toggleTheme} className="theme-toggle" title={theme === 'light' ? t.nav.theme.dark : t.nav.theme.light}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </li>
          <li>
            <button onClick={toggleLanguage} className="theme-toggle lang-toggle">
              {t.header.toggleLang}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
