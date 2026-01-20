import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LyricsCardCreator from './components/LyricsCardCreator';
import SpotifyCallback from './components/SpotifyCallback';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Settings from './components/Settings';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<LyricsCardCreator />} />
          <Route path="/callback" element={<SpotifyCallback />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;