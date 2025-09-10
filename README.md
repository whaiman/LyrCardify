# LyrCardify

![LyrCardify Preview](https://via.placeholder.com/800x400.png?text=LyrCardify+Preview)

LyrCardify is a web application that allows you to create beautiful, Spotify-inspired lyrics cards. Share your favorite song lyrics with stunning visuals, perfect for social media or personal collections.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## About

LyrCardify is built with **React** and **Vite**, offering a fast and modern development experience with Hot Module Replacement (HMR) and ESLint for clean code. This project is designed to help users create visually appealing lyrics cards with customizable backgrounds, fonts, and layouts, mimicking the aesthetic of Spotify's lyrics sharing feature.

## Features

- 🎵 Create Spotify-style lyrics cards with ease
- 🖌️ Customize fonts, colors, and backgrounds
- 📱 Responsive design for mobile and desktop
- ⚡ Fast development with Vite's HMR
- ✅ ESLint rules for consistent code quality

## Installation

To get started with LyrCardify, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/whaiman/LyrCardify.git
   ```

2. Navigate to the project directory:

   ```bash
   cd LyrCardify
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the following environment variables:

   ```bash
   VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
   VITE_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   ```

   Replace `your_spotify_client_id` and `your_spotify_client_secret` with your actual Spotify API credentials.

5. Start the development server:

   ```bash
   npm run dev
   ```

## Usage

1. Open the application in your browser (usually at `http://localhost:5173`).
2. Enter the lyrics you want to feature on your card.
3. Customize the card's appearance using the provided options (e.g., fonts, colors, backgrounds).
4. Save or share your lyrics card directly from the app.

For production builds:

```bash
npm run build
```

## Contributing

Contributions are welcome! To contribute to LyrCardify:

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes and commit them:

   ```bash
   git commit -m "Add your feature description"
   ```

4. Push to your branch:

   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a pull request.

For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
