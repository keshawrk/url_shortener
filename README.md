# URL Shortener

A URL shortening service built with Node.js, Express, MongoDB (backend), and React with TypeScript (frontend).

## Setup
### Backend
1. Navigate to `server/`.
2. Install dependencies: `npm install`.
3. Ensure MongoDB is running (`mongod`).
4. Create a `.env` file:

MONGO_URI=mongodb://localhost:27017/url-shortener
CLIENT_URL=http://localhost:5173

5. Start the server: `npm start`.

### Frontend
1. Navigate to `shortener/`.
2. Install dependencies: `npm install`.
3. Start the development server: `npm run dev`.

## Usage
- Enter a long URL and optional custom code at `http://localhost:5173`.
- Click "Shorten URL" to get a short URL.
- Visit the short URL to redirect to the original URL.