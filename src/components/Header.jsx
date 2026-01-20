import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from '../contexts/LanguageContext';
import { isUserLoggedIn, redirectToAuthCodeFlow, logout } from '../services/spotifyLogin';
import "../styles/Header.css";

const Header = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [isLogged, setIsLogged] = useState(isUserLoggedIn());
  const { t, language, toggleLanguage } = useLanguage();

  useEffect(() => {
    // Check login state when component mounts and when localStorage changes
    const handleStorageChange = () => {
      setIsLogged(isUserLoggedIn());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogin = () => {
    redirectToAuthCodeFlow();
  };

  const handleLogout = () => {
    logout();
    setIsLogged(false);
    window.location.reload(); // Refresh to update all components
  };

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
          <li>
            {isLogged ? (
               <button onClick={handleLogout} className="spotify-auth-btn logout" title="Logout from Spotify">
                 🚪
               </button>
            ) : (
               <button onClick={handleLogin} className="spotify-auth-btn login" title="Login with Spotify">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.49 17.306c-.215.353-.674.463-1.026.248-2.857-1.745-6.453-2.14-10.686-1.173-.404.093-.811-.164-.904-.568-.093-.404.164-.811.568-.904 4.636-1.06 8.603-.61 11.78 1.336.353.215.463.674.268 1.059zm1.464-3.26c-.271.442-.846.582-1.288.31-3.265-2.007-8.243-2.589-12.103-1.417-.497.151-1.022-.129-1.173-.626-.151-.497.129-1.022.626-1.173 4.412-1.339 9.9-1.037 13.638 1.258.442.271.582.846.3 1.288zm.135-3.376c-3.914-2.325-10.366-2.54-14.122-1.4c-.6.182-1.233-.158-1.415-.757-.182-.6.158-1.233.757-1.415 4.316-1.31 11.439-1.06 15.918 1.6.539.319.719 1.01.4 1.549-.318.54-.01.72-1.538.423z"/>
                 </svg>
               </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
