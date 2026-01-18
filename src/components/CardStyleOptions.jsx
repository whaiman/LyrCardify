import React from 'react';
import '../styles/CardStyleOptions.css';

const CardStyleOptions = ({ cardStyle, onStyleChange, t, onAutoColor }) => {
  const safeT = t || { style: { formats: {}, filters: {}, groups: {}, presetList: {} } };

  const fontFamilies = [
    { value: 'Inter, sans-serif', label: 'Inter' },
    { value: 'Montserrat, sans-serif', label: 'Montserrat' },
    { value: 'Roboto, sans-serif', label: 'Roboto' },
    { value: 'Playfair Display, serif', label: 'Playfair Display' },
    { value: 'Oswald, sans-serif', label: 'Oswald' },
    { value: 'Lobster, display', label: 'Lobster' },
    { value: 'Dancing Script, cursive', label: 'Dancing Script' },
    { value: 'Pacifico, cursive', label: 'Pacifico' },
    { value: 'Caveat, cursive', label: 'Caveat' },
    { value: 'Arial, sans-serif', label: 'Arial' },
    { value: 'Helvetica, sans-serif', label: 'Helvetica' },
    { value: 'Georgia, serif', label: 'Georgia' },
    { value: 'Verdana, sans-serif', label: 'Verdana' },
  ];

  const cardFormats = [
    { value: 'square', label: safeT.style?.formats?.square || 'Square 1:1' },
    { value: 'portrait', label: safeT.style?.formats?.portrait || 'Portrait 3:4' },
    { value: 'landscape', label: safeT.style?.formats?.landscape || 'Landscape 4:3' },
    { value: 'story', label: safeT.style?.formats?.story || 'Story 9:16' },
  ];

  const imageFilters = [
    { value: 'none', label: safeT.style?.filters?.none || 'No Filter' },
    { value: 'grayscale(100%)', label: safeT.style?.filters?.grayscale || 'Black & White' },
    { value: 'sepia(50%)', label: safeT.style?.filters?.sepia || 'Sepia' },
    { value: 'contrast(120%) brightness(80%)', label: safeT.style?.filters?.duotone || 'Duotone' },
  ];

  const bgModes = [
    { value: 'dynamic', label: safeT.style?.bgModes?.dynamic || 'Dynamic' },
    { value: 'color', label: safeT.style?.bgModes?.color || 'Color' },
    { value: 'custom', label: safeT.style?.bgModes?.custom || 'Custom' },
  ];

  const presets = [
    {
      id: 'classic',
      label: safeT.style?.presetList?.classic || 'Classic',
      style: { bgColor: '#191414', gradient: '#1DB954', textColor: '#FFFFFF', blur: true, shadowIntensity: 0.4, textShadow: true, fontFamily: 'Inter, sans-serif' }
    },
    {
      id: 'modern',
      label: safeT.style?.presetList?.modern || 'Modern',
      style: { bgColor: '#FFFFFF', gradient: '#F0F0F0', textColor: '#000000', blur: false, shadowIntensity: 0.1, textShadow: false, fontFamily: 'Montserrat, sans-serif', fontSize: 20 }
    },
    {
      id: 'neon',
      label: safeT.style?.presetList?.neon || 'Neon',
      style: { bgColor: '#000000', gradient: '#FF00FF', textColor: '#00FFFF', blur: true, shadowIntensity: 0.8, textShadow: true, fontFamily: 'Oswald, sans-serif', imageFilter: 'contrast(150%) brightness(120%)' }
    },
    {
      id: 'retro',
      label: safeT.style?.presetList?.retro || 'Retro',
      style: { bgColor: '#F4E4BC', gradient: '#D2B48C', textColor: '#3E2723', blur: false, shadowIntensity: 0.3, textShadow: false, fontFamily: 'Playfair Display, serif', imageFilter: 'sepia(50%)' }
    },
    {
      id: 'minimal',
      label: safeT.style?.presetList?.minimal || 'Minimal',
      style: { bgColor: '#121212', gradient: '#121212', textColor: '#888888', blur: true, shadowIntensity: 0, textShadow: false, fontFamily: 'Inter, sans-serif', fontSize: 14 }
    }
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onStyleChange({ backgroundImage: reader.result, bgMode: 'custom' });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="card-style-options fade-in">
      {/* PRESETS GROUP */}
      <div className="style-subgroup">
        <h4 className="subgroup-title">{safeT.style?.groups?.presets || 'Presets'}</h4>
        <div className="presets-grid">
          {presets.map((preset) => (
            <button 
              key={preset.id} 
              className={`preset-btn ${cardStyle.activePreset === preset.id ? 'active' : ''}`}
              onClick={() => onStyleChange({ ...preset.style, activePreset: preset.id })}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* BACKGROUND GROUP */}
      <div className="style-subgroup">
        <h4 className="subgroup-title">{safeT.style?.groups?.background || 'Background'}</h4>
        
        <div className="style-row">
          <div className="style-group radio-group">
            <label className="input-label">{safeT.style?.bgMode || 'Type'}:</label>
            <div className="radio-options">
              {bgModes.map((mode) => (
                <label key={mode.value} className="radio-label">
                  <input
                    type="radio"
                    name="bgMode"
                    value={mode.value}
                    checked={cardStyle.bgMode === mode.value}
                    onChange={() => onStyleChange({ bgMode: mode.value, activePreset: null })}
                  />
                  {mode.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="style-row">
            <button className="auto-color-btn" onClick={onAutoColor}>
                ✨ {safeT.style?.autoColor || 'Auto Color from Art'}
            </button>
        </div>

        {cardStyle.bgMode === 'color' && (
          <div className="style-row">
            <div className="style-group">
              <label className="input-label">{safeT.style?.bgColor || 'Color'}:</label>
              <input
                type="color"
                value={cardStyle.bgColor}
                onChange={(e) => onStyleChange({ bgColor: e.target.value, activePreset: null })}
                className="color-picker"
              />
            </div>
            <div className="style-group">
              <label className="input-label">{safeT.style?.gradient || 'Gradient'}:</label>
              <input
                type="color"
                value={cardStyle.gradient || cardStyle.bgColor}
                onChange={(e) => onStyleChange({ gradient: e.target.value, activePreset: null })}
                className="color-picker"
              />
            </div>
          </div>
        )}

        {cardStyle.bgMode === 'custom' && (
          <div className="style-row">
            <div className="style-group">
              <label className="input-label">{safeT.style?.customBg || 'Custom Background'}:</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <label className="custom-file-upload">
                  <input type="file" onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }} />
                  {safeT.style?.uploadBg || 'Upload'}
                </label>
                {cardStyle.backgroundImage && (
                  <button 
                    onClick={() => onStyleChange({ backgroundImage: null })}
                    className="remove-bg-btn"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="style-row">
          <div className="style-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={cardStyle.blur || false}
                onChange={(e) => onStyleChange({ blur: e.target.checked, activePreset: null })}
              />
              {safeT.style?.blur || 'Background Blur'}
            </label>
          </div>
        </div>
      </div>

      {/* TYPOGRAPHY GROUP */}
      <div className="style-subgroup">
        <h4 className="subgroup-title">{safeT.style?.groups?.typography || 'Typography'}</h4>
        
        <div className="style-row">
          <div className="style-group">
            <label className="input-label">{safeT.style?.textColor || 'Color'}:</label>
            <input
              type="color"
              value={cardStyle.textColor}
              onChange={(e) => onStyleChange({ textColor: e.target.value, activePreset: null })}
              className="color-picker"
            />
          </div>
          <div className="style-group">
            <label className="input-label">{safeT.style?.fontFamily || 'Font Family'}:</label>
            <select
              value={cardStyle.fontFamily}
              onChange={(e) => onStyleChange({ fontFamily: e.target.value, activePreset: null })}
              className="select-input"
            >
              {fontFamilies.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="style-row">
          <div className="style-group">
            <label className="input-label">{safeT.style?.fontSize || 'Size'}:</label>
            <div className="range-container">
              <input
                type="range"
                min="12"
                max="24"
                value={cardStyle.fontSize}
                onChange={(e) => onStyleChange({ fontSize: parseInt(e.target.value), activePreset: null })}
                className="range-slider"
              />
              <span className="range-value">{cardStyle.fontSize}px</span>
            </div>
          </div>
          <div className="style-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={cardStyle.textShadow || false}
                onChange={(e) => onStyleChange({ textShadow: e.target.checked, activePreset: null })}
              />
              {safeT.style?.textShadow || 'Text Shadow'}
            </label>
          </div>
        </div>
      </div>

      {/* LAYOUT GROUP */}
      <div className="style-subgroup">
        <h4 className="subgroup-title">{safeT.style?.groups?.layout || 'Layout & Effects'}</h4>

        <div className="style-row">
          <div className="style-group radio-group">
            <label className="input-label">{safeT.style?.cardFormat || 'Card Format'}:</label>
            <div className="radio-options">
              {cardFormats.map((format) => (
                <label key={format.value} className="radio-label">
                  <input
                    type="radio"
                    name="cardFormat"
                    value={format.value}
                    checked={cardStyle.cardFormat === format.value}
                    onChange={() => onStyleChange({ cardFormat: format.value, activePreset: null })}
                  />
                  {format.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="style-row">
          <div className="style-group">
            <label className="input-label">{safeT.style?.imageFilter || 'Art Filter'}:</label>
            <select
              value={cardStyle.imageFilter || 'none'}
              onChange={(e) => onStyleChange({ imageFilter: e.target.value, activePreset: null })}
              className="select-input"
            >
              {imageFilters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>
          <div className="style-group">
            <label className="input-label">{safeT.style?.shadowIntensity || 'Shadow Intensity'}:</label>
            <div className="range-container">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={cardStyle.shadowIntensity || 0.4}
                onChange={(e) => onStyleChange({ shadowIntensity: parseFloat(e.target.value), activePreset: null })}
                className="range-slider"
              />
              <span className="range-value">{cardStyle.shadowIntensity}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardStyleOptions;