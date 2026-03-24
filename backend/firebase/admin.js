const admin = require('firebase-admin');

// IMPORTANT: Replace this with actual path or env var for serviceAccountKey.json
// Example: const serviceAccount = require('../../serviceAccountKey.json');
// Or configure using environment variables in production.

try {
  admin.initializeApp({
    // credential: admin.credential.cert(serviceAccount)
    // For local dev, if you use standard GOOGLE_APPLICATION_CREDENTIALS env var
    credential: admin.credential.applicationDefault()
  });
  console.log('Firebase Admin initialized successfully.');
} catch (error) {
  console.warn('Firebase Admin initialization skipped or failed:', error.message);
  console.log('Ensure you provide a valid service account credential before using Firestore.');
}

const db = admin.apps.length ? admin.firestore() : null;

module.exports = { admin, db };
