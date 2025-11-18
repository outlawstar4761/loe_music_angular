# 🎵 **LOE Music Angular App**

A Progressive Web App (PWA) for browsing, playing, and managing music using the **LOE REST Client** and **OAuth2 authentication**.

This application provides a full UI for interacting with the LOE Music API — including browsing albums, playing tracks, rating songs, and managing personal playlists.

It is built in **Angular 14**, uses **Material UI**, integrates **SoundManager2**, and authenticates via **OAuth2 (authorization code + PKCE)** through your updated `@outlawdesigns/loe-rest-client`.

A Dockerized deployment workflow is included for easy hosting.

---

# 🚀 Features

### 🎧 Music Features

* Browse recent albums
* Search songs by various fields
* View album details
* Play songs with SoundManager2
* Generate random playlists
* Save and load personal playlists
* Rate songs

### 🔐 Authentication

* Full OAuth2 PKCE flow
* Internal integration with `@outlawdesigns/loe-rest-client`
* Automatic token verification and silent refresh
* Authorization callback handler route

### 📦 Architecture

* Angular 14
* Angular Material
* Service worker support (PWA)
* Configurable runtime settings via `/assets/config/config.json`
* Dockerfile + entrypoint for environment-based configuration

---

# 📂 Project Structure (High-Level)

```
/src
  /app
    /components         → UI components (albums, player, search, rating…)
    /services           → ApiService, config loader, DI tokens
    /models             → Song, Album, Playlist…
    app.module.ts       → Angular module setup
    app-routing.module  → Router
  /assets/config        → config.json (runtime config)
  environments          → Angular build-time environments
entrypoint.sh           → Sets env values before runtime
server.js               → Express static server
docker-compose.yml
Dockerfile
```

---

# ⚙️ Runtime Configuration (`/assets/config/config.json`)

This JSON file allows you to control API endpoints and OAuth2 discovery URLs **without rebuilding the Angular app**:

Example:

```json
{
  "API_ENDPOINT": "https://your-music-api/api",
  "LOE_DOMAIN": "https://your-music-api/",
  "AUTH_DISCOVERY_URI": "https://your-auth/.well-known/openid-configuration",
  "AUTH_CLIENT_ID": "loe-music-client",
  "AUTH_REDIRECT_URL": "https://your.app/auth/callback",
  "AUTH_LOGOUT_URL": "https://your-auth/logout",
  "AUTH_SCOPE": "openid profile loe.music"
}
```

These values are injected via Angular DI tokens in `AppModule`.

---

# 🔌 How OAuth2 Works in This App

The Angular app uses your redesigned `loe-rest-client`:

### Initialization (inside ApiService)

```ts
loeClient.init(apiUrl, authScope);
await loeClient.get().auth.init(authDiscoveryUri, authClientId);
```

### Authorization Code Flow (PKCE)

```ts
const challenge = await loeClient.get().auth.authorizationCodeFlow(
  authRedirectUrl,
  authScope,
  [apiUrl]
);

window.location.href = challenge.redirectUri;
```

### Completing the flow

```ts
await loeClient.get().auth.completeAuthFlow(url, state, verifier);
const tokenSet = loeClient.get().auth.getTokenSet();
cookie.set('oathTokenSet', JSON.stringify(tokenSet));
```

### Token Verification

```ts
await loeClient.get().auth.verifyAccessToken(
  tokenSet.access_token,
  [apiUrl]
);
```

---

# 🎼 Using the API Service

The app maps all music API calls through methods like:

```ts
getRecent(limit): Observable<Song[]>
search(field, query): Observable<Song[]>
getSong(UID): Observable<Song>
rateSong(id, rating)
getMyPlaylists()
savePlaylist(playlist)
getRandomPlayList(genre, limit)
```

All results are mapped through Angular models and sanitized with domain replacement.

---

# 🐳 Docker Deployment

### Build & Run

```sh
docker build -t loe-music-angular .
docker run -p 8080:8080 loe-music-angular
```

### Using docker-compose

```sh
docker-compose up -d
```

---

# 🏗 Dockerfile Explained

Your Dockerfile uses **two stages**:

### **1. Build Stage**

* Node 20
* Installs dependencies
* Runs `npm run build`
* Outputs Angular dist files

### **2. Runtime Stage**

* Node 20
* Copies `dist/`
* Includes `server.js` (Express static host)
* Includes `entrypoint.sh` (for dynamic config replacement)
* Exposes port `8080`

---

# 🔧 entrypoint.sh

Used to replace config values at runtime before starting the server.

This allows deploying the same Docker image across environments while adjusting:

* API endpoint
* OAuth discovery URL
* Client ID
* Redirect URL
* Scope

…without rebuilding Angular.

---

# 🖥 Development Setup

### Install dependencies:

```sh
npm install
```

### Run dev server:

```sh
npm start
```

App runs at:

```
http://localhost:3000
```

### Build production bundle:

```sh
npm run build
```

---

# 📡 API & Auth Dependencies

This application depends on:

### ✔ LOE REST Client

`@outlawdesigns/loe-rest-client`

### ✔ LOE Music API

Backend that serves:

* Songs
* Playlists
* Ratings
* Random & recent lists

### ✔ OAuth2 Authorization Server

Must support:

* Discovery document
* Code + PKCE
* Client credentials (for internal APIs)

---

# 🧪 Testing

The app includes Karma/Jasmine setup.

Run:

```sh
npm test
```

---

# 📙 Summary

This Angular application is a complete front-end music browser/player that integrates deeply with:

* LOE Music API
* Your OAuth2 server
* The `loe-rest-client` SDK
* Docker runtime config injection

It functions as a PWA and comes with a robust UI, playlist management, album browsing, search, OAuth2 login, and mobile-friendly layout.
