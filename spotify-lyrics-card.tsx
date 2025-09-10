import React, { useState, useRef } from 'react';

const SpotifyLyricsCard = () => {
  const [spotifyUrl, setSpotifyUrl] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [trackData, setTrackData] = useState({
    image: null,
    artist: '',
    title: '',
    loaded: false
  });
  const [customBgColor, setCustomBgColor] = useState('#121212');
  const [customTextColor, setCustomTextColor] = useState('#FFFFFF');
  const cardRef = useRef(null);

  // Функция для извлечения данных из URL Spotify
  // В реальном приложении здесь был бы API-запрос
  const fetchTrackData = () => {
    // Имитация получения данных
    // В реальном приложении вы бы использовали Spotify API
    
    // Извлекаем ID трека из URL
    let trackId = '';
    if (spotifyUrl.includes('track/')) {
      trackId = spotifyUrl.split('track/')[1].split('?')[0];
    }
    
    if (!trackId) {
      alert('Пожалуйста, введите корректную ссылку на трек Spotify');
      return;
    }
    
    // Имитация данных (в реальном приложении здесь был бы ответ от API)
    const mockResponse = {
      image: '/api/placeholder/500/500',
      artist: 'Исполнитель',
      title: 'Название трека'
    };
    
    setTrackData({
      ...mockResponse,
      loaded: true
    });
  };

  // Функция для экспорта карточки как изображения
  // Заметка: в этой среде функциональность экспорта ограничена
  const exportAsImage = () => {
    alert('В полной версии приложения здесь была бы функция экспорта изображения');
  };

  // Разделение текста песни на строки
  const lyricLines = lyrics.split('\n').filter(line => line.trim() !== '');

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center mb-4">Генератор карточек текста песен Spotify</h1>
      
      {/* Форма ввода */}
      <div className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium">Ссылка на трек Spotify:</label>
          <input 
            type="text" 
            value={spotifyUrl}
            onChange={(e) => setSpotifyUrl(e.target.value)}
            placeholder="https://open.spotify.com/track/..."
            className="w-full p-2 border rounded"
          />
          <button 
            onClick={fetchTrackData}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Получить данные
          </button>
        </div>
        
        <div>
          <label className="block mb-2 text-sm font-medium">Текст песни:</label>
          <textarea
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            placeholder="Вставьте текст песни..."
            className="w-full p-2 border rounded h-32"
          />
        </div>

        <div className="flex space-x-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Цвет фона:</label>
            <input 
              type="color" 
              value={customBgColor}
              onChange={(e) => setCustomBgColor(e.target.value)}
              className="p-1 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Цвет текста:</label>
            <input 
              type="color" 
              value={customTextColor}
              onChange={(e) => setCustomTextColor(e.target.value)}
              className="p-1 border rounded"
            />
          </div>
        </div>
      </div>
      
      {/* Предпросмотр карточки */}
      <div className="mt-8">
        <h2 className="text-xl font-medium mb-4">Предпросмотр карточки:</h2>
        
        <div 
          ref={cardRef}
          className="w-full aspect-square max-w-md mx-auto rounded-lg overflow-hidden shadow-lg"
          style={{ backgroundColor: customBgColor }}
        >
          <div className="relative h-full w-full flex flex-col">
            {/* Обложка альбома */}
            {trackData.loaded && (
              <div className="w-24 h-24 absolute top-4 left-4 z-10 shadow-md rounded">
                <img 
                  src={trackData.image} 
                  alt="Album cover" 
                  className="w-full h-full object-cover rounded"
                />
              </div>
            )}
            
            {/* Информация о треке */}
            {trackData.loaded && (
              <div className="pt-4 pl-32 pr-4" style={{ color: customTextColor }}>
                <div className="text-xs opacity-80">NOW PLAYING</div>
                <div className="text-sm font-bold truncate">{trackData.title}</div>
                <div className="text-xs opacity-80 truncate">{trackData.artist}</div>
              </div>
            )}
            
            {/* Текст песни */}
            <div 
              className="flex-1 px-4 pt-12 pb-4 overflow-hidden"
              style={{ color: customTextColor }}
            >
              <div className="h-full overflow-y-auto custom-scrollbar">
                {lyricLines.map((line, index) => (
                  <div key={index} className={`mb-3 text-base ${index === 0 ? 'font-bold text-lg' : ''}`}>
                    {line}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Логотип Spotify */}
            <div className="absolute right-4 bottom-4">
              <div className="flex items-center text-xs font-medium" style={{ color: customTextColor }}>
                <span className="mr-1">Spotify</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM16.75 16.5C16.5 16.75 16 17 15.75 16.75C13.25 15.25 10.25 15 6.25 15.75C6 15.75 5.75 15.5 5.75 15.25C5.75 15 6 14.75 6.25 14.75C10.5 14 13.75 14.25 16.5 15.75C16.75 16 16.75 16.25 16.75 16.5ZM18 13.5C17.75 13.75 17.25 14 17 13.75C14 12 9.75 11.5 6.5 12.5C6.25 12.5 5.75 12.25 5.75 12C5.75 11.75 6 11.5 6.25 11.5C10 10.5 14.5 11 17.75 12.75C18 13 18 13.25 18 13.5ZM18 10.5C14.5 8.75 9 8.5 6 9.5C5.5 9.5 5.25 9.25 5.25 8.75C5.25 8.25 5.5 8 6 8C9.5 7 15.25 7.25 19.25 9.25C19.75 9.5 19.75 9.75 19.5 10.25C19.25 10.5 19 10.75 18 10.5Z" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center">
          <button 
            onClick={exportAsImage}
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Экспортировать как изображение
          </button>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Примечание: Эта демо-версия показывает только интерфейс. В полноценном приложении необходимо:</p>
        <ul className="list-disc ml-5 mt-2">
          <li>Подключить Spotify API для получения реальных данных о треке</li>
          <li>Реализовать функцию экспорта карточки как изображения</li>
        </ul>
      </div>
    </div>
  );
};

export default SpotifyLyricsCard;