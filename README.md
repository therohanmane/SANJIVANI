# SANJIVANI Web Application

A full-stack web application designed for the SANJIVANI Cyber Cafe and IT Training Institute. 

## Features
- **Frontend**: React + Vite + Tailwind CSS v4 (Modern responsive UI)
- **Backend**: Node.js + Express + Firebase Admin
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth

## Project Structure
- `/frontend`: The React application
- `/backend`: The Express server API

## Running Locally

### 1. Firebase Setup
1. Create a Firebase project at console.firebase.google.com
2. Get your Web App config and paste it into `/frontend/src/firebase/config.js`
3. Generate a new Service Account Key (JSON) from Project Settings > Service Accounts
4. Add it to your backend or export it via `GOOGLE_APPLICATION_CREDENTIALS` for `/backend/firebase/admin.js` to pick it up.

### 2. Backend
```bash
cd backend
npm install
node server.js
```
The server will run on `http://localhost:5000`

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
The App will run on `http://localhost:5173`

## Deployment

### Frontend (vercel / Firebase Hosting)
- **Vercel**: Connect your GitHub repository to Vercel. Ensure the Build Command is `npm run build` and Output Directory is `dist`. Vercel will auto-detect Vite.
- **Firebase**: Run `npm run build`, then `firebase init hosting` and `firebase deploy --only hosting`.

### Backend (Render / Railway)
- Deploy the `/backend` directory. Make sure to set up your environment variables (Firebase Service Account Key) on the server.
