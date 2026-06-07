 # CineBox Expo Movie App

 ![App Screenshot](file:///c:/Users/Faheem%20Wajid/Downloads/2.png)

 A complete Expo app for browsing movies and TV series using TMDb data. This repository is built with Expo Router, React Native, NativeWind, and local authentication using AsyncStorage.

 ## 🔥 What this app does

 - User authentication with sign in and sign up.
 - Home feed with featured movies, top rated items, and popular movies/series.
 - Category sections for:
   - Hollywood
   - Anime
   - Bollywood
   - Punjabi
 - Combined top-rated category lists for movies and TV series.
 - Movie details screen with overview, trailer support, cast, and similar titles.
 - TV series details screen with trailer support, cast, and similar series.
 - Person details screen showing biography and known-for credits.
 - Search page for movies and TV using TMDb search endpoints.

 ## 🧭 Architecture & routing

 ### Main app structure

 - `app/_layout.tsx` — root stack navigator
 - `app/index.tsx` — redirects to `/login`
 - `app/login.tsx` — login screen
 - `app/signup.tsx` — signup screen
 - `app/(tabs)/_layout.tsx` — bottom tab navigator
 - `app/(tabs)/Home.tsx` — main home feed combining movies and series sections
 - `app/(tabs)/Movies.tsx` — movie-only feed
 - `app/(tabs)/Series.tsx` — series-only feed
 - `app/DetailsPage/[id].tsx` — movie detail screen
 - `app/SeriesDetails/[id].tsx` — series detail screen
 - `app/PersonDetails/[id].tsx` — person/actor detail screen

 ### Important components

 - `app/components/Topbar.tsx` — global header with logo and search access
 - `app/components/MovieApiFetching.tsx` — featured movie section
 - `app/components/SeriesApiFetching.tsx` — featured series section
 - `app/components/MoviesApiTopRated.tsx` — top rated movies
 - `app/components/SeriesApiTopRated.tsx` — top rated series
 - `app/components/PopularMovies.tsx` — popular movie list
 - `app/components/PopularSeries.tsx` — popular series list
 - `app/components/CategorySeriesList.tsx` — reusable category list for movie/series queries
 - `app/components/CategoryTopRatedCombined.tsx` — combined top-rated category view
 - `app/components/SearchPage.tsx` — search results screen
 - `app/components/SearchBar.tsx` — search input UI
 - `app/components/Skeleton.tsx` — loading placeholder UI
 - `app/components/CreditsMoviesAPi.tsx` — cast fetcher for movie details
 - `app/components/CreditSeriesApi.tsx` — cast fetcher for series details
 - `app/components/SimilerMoviesApi.tsx` — similar movie suggestions
 - `app/components/SimilerSeriesApi.tsx` — similar series suggestions

 ## 📦 Tech stack

 - Expo `^54.0.0`
 - React Native `0.81.5`
 - React `19.1.0`
 - Expo Router `~6.0.15`
 - NativeWind `^4.1.23`
 - React Navigation bottom tabs
 - AsyncStorage for local account persistence
 - TMDb API for movie and series data
 - TypeScript
 - ESLint + Prettier + Tailwind CSS

 ## 🚀 Quick start

 ### Install dependencies

 ```bash
 npm install
 ```

 ### Run the project

 ```bash
 npx expo start
 ```

 Then choose one of:

 - Android Emulator
 - iOS Simulator
 - Web browser
 - Expo Go on a physical device

 ### Run on Android

 ```bash
 npm run android
 ```

 ### Run on iOS

 ```bash
 npm run ios
 ```

 ### Web preview

 ```bash
 npm run web
 ```

 ### Lint the project

 ```bash
 npm run lint
 ```

 ### Reset starter project

 ```bash
 npm run reset-project
 ```

 This script moves starter code into `app-example/` and creates a blank `app/` folder.

 ## 🧪 Authentication details

 ### Login

 - Accepts saved account credentials from AsyncStorage.
 - Also accepts built-in demo credentials:
   - Email: `group@gmail.com`
   - Password: `group123`

 ### Signup

 - Saves name, email, and password to AsyncStorage.
 - Validates required fields and password confirmation.
 - On success, redirects to the app home.

 ## 🌐 Data source

 The app uses The Movie Database (TMDb) API to fetch:

 - movie and TV details
 - search results
 - popular and top rated lists
 - trailers
 - credits
 - similar titles
 - person details and credits

 ## ⚠️ Important notes

 - The app currently contains a hard-coded TMDb API key in source files.
 - For production, move the key to environment variables and avoid committing it.
 - The search page is accessible via the top bar search button.
 - Some screens use local mock auth and are not connected to a backend service.

 ## 🧩 How navigation works

 1. `app/index.tsx` redirects to `/login`
 2. `app/login.tsx` or `app/signup.tsx` lets the user authenticate
 3. Successful login redirects to `/ (tabs) / Home`
 4. Tabs are configured in `app/(tabs)/_layout.tsx`
 5. Details and person pages are nested routes:
    - `/DetailsPage/[id]`
    - `/SeriesDetails/[id]`
    - `/PersonDetails/[id]`

 ## ✅ Key app flows

 - Browse featured movie content on Home
 - View top rated and popular movies/series
 - Scroll category lists by genre/search keyword
 - Tap any item to open details
 - Watch trailers on YouTube when available
 - Open cast member profiles and related credits
 - Search across movies and TV shows

 ## 🧹 Best practices for developers

 - Keep `app/components/*` reusable and separated by responsibility.
 - Abstract API key usage into a single config or `.env` file.
 - Use `expo-router` file-based routing to add new screens quickly.
 - Use `react-query` or caching for better network handling in future updates.

 ## 📁 Useful files

 - `package.json` — app scripts and dependencies
 - `app/_layout.tsx` — root stack config
 - `app/(tabs)/_layout.tsx` — bottom tab layout
 - `app/login.tsx`, `app/signup.tsx` — auth flow
 - `app/(tabs)/Home.tsx`, `app/(tabs)/Movies.tsx`, `app/(tabs)/Series.tsx` — main screens
 - `app/DetailsPage/[id].tsx` — movie details
 - `app/SeriesDetails/[id].tsx` — series details
 - `app/PersonDetails/[id].tsx` — person details
 - `app/components/Topbar.tsx` — header and search entry
 - `app/components/SearchPage.tsx` — search UI and results

 ## 📌 Future improvements

 - Move TMDb API key into `.env`
 - Add backend authentication or Firebase auth
 - Add favorites/watchlist storage
 - Add better offline support
 - Improve error handling and loading states
 - Add support for web-specific layout enhancements

 ## 💡 Project goal

 This repository is a complete Expo-based movie app prototype designed to help you explore how file-based routing, API integration, search, detail screens, and local auth work together in one React Native app.

 ---

 If you'd like, I can also help add a Polish README in Urdu/Hindi style or translate this into a mixed Urdu-English version for your team.
