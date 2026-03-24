import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './MobileWarning.css';

const MobileWarning = () => {
  const { t } = useLanguage();

  return (
    <div className="mobile-warning-overlay">
      <div className="mobile-warning-card">
        <div className="mobile-warning-icon">📱</div>
        <h1>{t.mobileWarning.title}</h1>
        <p>{t.mobileWarning.description}</p>
        
        <div className="spotify-hint">
          <small>{t.mobileWarning.hint}</small>
        </div>
      </div>
    </div>
  );
};

export default MobileWarning;
