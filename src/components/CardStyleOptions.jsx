import React from 'react';
import '../styles/CardStyleOptions.css';

const CardStyleOptions = ({ cardStyle, onStyleChange }) => {
  const fontFamilies = [
    { value: 'Inter, sans-serif', label: 'Inter' },
    { value: 'Arial, sans-serif', label: 'Arial' },
    { value: 'Helvetica, sans-serif', label: 'Helvetica' },
    { value: 'Georgia, serif', label: 'Georgia' },
    { value: 'Verdana, sans-serif', label: 'Verdana' },
    { value: 'Roboto, sans-serif', label: 'Roboto' },
    { value: 'Montserrat, sans-serif', label: 'Montserrat' },
  ];

  const cardFormats = [
    { value: 'square', label: 'Квадрат 1:1' },
    { value: 'portrait', label: 'Портрет 3:4' },
    { value: 'landscape', label: 'Альбом 4:3' },
    { value: 'story', label: 'История 9:16' },
  ];

  const imageFilters = [
    { value: 'none', label: 'Без фильтра' },
    { value: 'grayscale(100%)', label: 'Чёрно-белый' },
    { value: 'sepia(50%)', label: 'Сепия' },
    { value: 'contrast(120%) brightness(80%)', label: 'Дуотон' },
  ];

  return (
    <div className="card-style-options fade-in">
      <div className="style-row">
        <div className="style-group">
          <label>Цвет фона:</label>
          <input
            type="color"
            value={cardStyle.bgColor}
            onChange={(e) => onStyleChange({ bgColor: e.target.value })}
            className="color-picker"
          />
        </div>

        <div className="style-group">
          <label>Градиент (второй цвет):</label>
          <input
            type="color"
            value={cardStyle.gradient || cardStyle.bgColor}
            onChange={(e) => onStyleChange({ gradient: e.target.value })}
            className="color-picker"
          />
        </div>

        <div className="style-group">
          <label>Цвет текста:</label>
          <input
            type="color"
            value={cardStyle.textColor}
            onChange={(e) => onStyleChange({ textColor: e.target.value })}
            className="color-picker"
          />
        </div>
      </div>

      <div className="style-row">
        <div className="style-group">
          <label>Размер шрифта:</label>
          <div className="range-container">
            <input
              type="range"
              min="12"
              max="24"
              value={cardStyle.fontSize}
              onChange={(e) => onStyleChange({ fontSize: parseInt(e.target.value) })}
              className="range-slider"
            />
            <span className="range-value">{cardStyle.fontSize}px</span>
          </div>
        </div>

        <div className="style-group">
          <label>Шрифт:</label>
          <select
            value={cardStyle.fontFamily}
            onChange={(e) => onStyleChange({ fontFamily: e.target.value })}
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
          <label>Фильтр изображения:</label>
          <select
            value={cardStyle.imageFilter || 'none'}
            onChange={(e) => onStyleChange({ imageFilter: e.target.value })}
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
          <label>Интенсивность тени:</label>
          <div className="range-container">
            <input
              type="range"
              min="0"
              max="0.5"
              step="0.1"
              value={cardStyle.shadowIntensity || 0.3}
              onChange={(e) => onStyleChange({ shadowIntensity: parseFloat(e.target.value) })}
              className="range-slider"
            />
            <span className="range-value">{cardStyle.shadowIntensity}</span>
          </div>
        </div>
      </div>

      <div className="style-row">
        <div className="style-group">
          <label>Эффект размытия фона:</label>
          <input
            type="checkbox"
            checked={cardStyle.blur || false}
            onChange={(e) => onStyleChange({ blur: e.target.checked })}
          />
        </div>

        <div className="style-group">
          <label>Тень текста:</label>
          <input
            type="checkbox"
            checked={cardStyle.textShadow || false}
            onChange={(e) => onStyleChange({ textShadow: e.target.checked })}
          />
        </div>
      </div>

      <div className="style-row">
        <div className="style-group radio-group">
          <label>Формат карточки:</label>
          <div className="radio-options">
            {cardFormats.map((format) => (
              <label key={format.value} className="radio-label">
                <input
                  type="radio"
                  name="cardFormat"
                  value={format.value}
                  checked={cardStyle.cardFormat === format.value}
                  onChange={() => onStyleChange({ cardFormat: format.value })}
                />
                {format.label}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardStyleOptions;