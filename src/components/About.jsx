import React from 'react';
import '../styles/About.css';
import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="about-page fade-in">
      <h1>{t.about.title}</h1>
      
      <section>
        <h2>{t.about.whatIsTitle}</h2>
        <p>
          {t.about.whatIsText}
        </p>
      </section>
      
      <section>
        <h2>{t.about.howToTitle}</h2>
        <ol>
          <li>{t.about.step1}</li>
          <li>{t.about.step2}</li>
          <li>{t.about.step3}</li>
          <li>{t.about.step4}</li>
        </ol>
      </section>
      
      <section>
        <h2>{t.about.apiTitle}</h2>
        <p>
          {t.about.apiText}
        </p>
        <ol>
          <li>
            {t.about.apiStep1} <a href="https://developer.spotify.com/dashboard/" target="_blank" rel="noopener noreferrer">{t.about.dashboard}</a>
          </li>
          <li>{t.about.apiStep2}</li>
          <li>{t.about.apiStep3}</li>
          <li>
            {t.about.apiStep4}
            <pre className="code-block">
{`VITE_SPOTIFY_CLIENT_ID=your_client_id_here
VITE_SPOTIFY_CLIENT_SECRET=your_client_secret_here`}
            </pre>
          </li>
        </ol>
      </section>
    </div>
  );
};

export default About;