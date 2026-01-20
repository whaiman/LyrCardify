# LyrCardify

Turn your favorite lyrics into art. LyrCardify picks up where Spotify's "Share" button leaves off, giving you the creative freedom to design beautiful, high-quality lyrics cards that are truly yours and ready for your social feed.

[![GitHub license](https://img.shields.io/github/license/whaiman/LyrCardify)](https://github.com/whaiman/LyrCardify/blob/main/LICENSE)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-purple?logo=vite)](https://vitejs.dev/)

[Русская версия документации](README.ru.md)

## Table of Contents

- [What is LyrCardify](#what-is-lyrcardify)
- [What you can do](#what-you-can-do)
- [Getting Started](#getting-started)
- [A Note on Spotify API](#a-note-on-spotify-api)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## What is LyrCardify?

We believe that great song lyrics deserve to look just as good as they sound. LyrCardify is a simple yet powerful tool to create Spotify-style visuals that go far beyond the basic presets. Whether you want to capture a mood for your Instagram Story or save a meaningful verse for your personal collection, LyrCardify makes it effortless.

## What you can do

- 🎵 **Magic Spotify Search:** Just paste a track link. We'll handle the rest—fetching the exact album art and track details in seconds.
- 🎨 **Visual Harmony:** Want the background to match the cover? Use our "Auto-Color" feature to extract the perfect palette directly from the album art.
- �️ **Deep Creative Control:** Customize typography, play with text shadows, or apply aesthetic filters like Duotone, Sepia, or Grayscale.
- 🖼️ **Format for Anywhere:** Instantly switch between Square (1:1), Portrait (3:4), Landscape (4:3), or Story (9:16) layouts.
- � **Make it Yours:** Don't want the album art? Upload your own background image to create something completely unique.
- 💾 **High-Quality Export:** One click and your creation is ready as a high-res PNG.

## Getting Started

To run LyrCardify locally:

1. **Grab the code:**

   ```bash
   git clone https://github.com/whaiman/LyrCardify.git
   cd LyrCardify
   ```

2. **Install what's needed:**

   ```bash
   npm install
   ```

3. **Secure connection:**
   The project uses HTTPS to ensure everything works smoothly with modern browser APIs. If you have `mkcert` installed, it will handle certificates automatically.

4. **Launch:**
   ```bash
   npm run dev
   ```

## A Note on Spotify API

To fetch real track data, you'll need your own Spotify Client ID. You can easily set this up once in the **Settings** page of the app. Your keys stay in your browser and are never shared with us.

Alternatively, you can create a `.env` file in the root:

```env
VITE_SPOTIFY_CLIENT_ID=your_id
VITE_SPOTIFY_CLIENT_SECRET=your_secret
```

_Get your credentials at the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)._

## Usage

1. **Search**: Paste a Spotify track link (e.g., `https://open.spotify.com/track/...`).
2. **Lyrics**: Paste the lyrics you want to highlight.
3. **Style**: Use the sidebar to adjust colors, fonts, and layout. Try the "Presets" for quick results!
4. **Export**: Click "Export as Image" to save your card.

## Contributing

Got an idea to make LyrCardify better? We'd love to see it. Feel free to fork the repo and open a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - feel free to build upon it!
