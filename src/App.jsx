import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LyricsCardCreator from './components/LyricsCardCreator';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<LyricsCardCreator />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;