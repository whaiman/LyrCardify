import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      <h1>О проекте Lyrcardify</h1>
      
      <section>
        <h2>Что такое Lyrcardify?</h2>
        <p>
          Lyrcardify - это веб-приложение, которое позволяет создавать стильные 
          карточки с текстом песен в стиле Spotify. Просто вставьте ссылку на трек 
          из Spotify, добавьте текст песни и настройте внешний вид карточки по своему 
          вкусу. Готовую карточку можно скачать как изображение и поделиться в 
          социальных сетях.
        </p>
      </section>
      
      <section>
        <h2>Как использовать</h2>
        <ol>
          <li><strong>Найдите трек</strong> - Вставьте ссылку на трек из Spotify</li>
          <li><strong>Добавьте текст</strong> - Вставьте текст песни</li>
          <li><strong>Настройте дизайн</strong> - Выберите цвета и шрифт</li>
          <li><strong>Экспортируйте</strong> - Скачайте карточку как изображение</li>
        </ol>
      </section>
      
      <section>
        <h2>Настройка API Spotify</h2>
        <p>
          Для полноценной работы приложения необходимо настроить доступ к API Spotify.
          Следуйте этим шагам:
        </p>
        <ol>
          <li>Зарегистрируйтесь на <a href="https://developer.spotify.com/dashboard/" target="_blank" rel="noopener noreferrer">Spotify Developer Dashboard</a></li>
          <li>Создайте новое приложение</li>
          <li>Получите Client ID и Client Secret</li>
          <li>Вставьте эти данные в файл <code>src/services/spotifyApi.js</code></li>
        </ol>
      </section>
    </div>
  );
};

export default About;