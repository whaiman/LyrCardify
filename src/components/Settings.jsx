import React, { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import "../styles/Settings.css";

const Settings = () => {
  const { t } = useLanguage();
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedId = localStorage.getItem("spotify_client_id") || "";
    const savedSecret = localStorage.getItem("spotify_client_secret") || "";

    // Fallback values from environment if local is empty
    const envId = import.meta.env.VITE_SPOTIFY_CLIENT_ID || "";
    const envSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET || "";

    setClientId(savedId || envId);
    setClientSecret(savedSecret || envSecret);
  }, []);

  const handleSave = () => {
    localStorage.setItem("spotify_client_id", clientId);
    localStorage.setItem("spotify_client_secret", clientSecret);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="settings-page fade-in">
      <h1>{t.settings.title}</h1>
      <p className="description">{t.settings.description}</p>

      <div className="settings-card">
        {import.meta.env.VITE_SPOTIFY_CLIENT_ID ? (
          <div className="global-config-badge">
            <span className="icon">✅</span>
            <p>
              {t.settings.globalConfigActive ||
                "Приложение настроено разработчиком. Ввод собственных ключей не требуется."}
            </p>
          </div>
        ) : (
          <>
            <div className="input-group">
              <label htmlFor="clientId">{t.settings.clientId}</label>
              <input
                id="clientId"
                type="text"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                placeholder="e.g. 7d25... (32 chars)"
              />
            </div>

            <div className="input-group">
              <label htmlFor="clientSecret">{t.settings.clientSecret}</label>
              <div className="password-input-wrapper">
                <input
                  id="clientSecret"
                  type={showSecret ? "text" : "password"}
                  value={clientSecret}
                  onChange={(e) => setClientSecret(e.target.value)}
                  placeholder="e.g. a1b2... (32 chars)"
                />
                <button
                  type="button"
                  className="visibility-toggle"
                  onClick={() => setShowSecret(!showSecret)}
                >
                  {showSecret ? "👁️" : "🕶️"}
                </button>
              </div>
            </div>

            <button className="save-button" onClick={handleSave}>
              {isSaved ? t.settings.saved : t.settings.save}
            </button>
          </>
        )}
      </div>

      <section className="how-to">
        <h2>{t.settings.howTo}</h2>
        <ol>
          <li>
            <a
              href="https://developer.spotify.com/dashboard/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.settings.step1}
            </a>
          </li>
          <li>{t.settings.step2}</li>
        </ol>
        <p className="instruction">{t.settings.instruction}</p>
      </section>
    </div>
  );
};

export default Settings;
