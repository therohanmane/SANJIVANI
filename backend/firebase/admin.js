const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const serviceAccountPath = path.join(__dirname, '../serviceAccountKey.json');
let db = null;

if (process.env.GOOGLE_APPLICATION_CREDENTIALS || fs.existsSync(serviceAccountPath)) {
  try {
    const cert = fs.existsSync(serviceAccountPath) 
      ? admin.credential.cert(require(serviceAccountPath))
      : admin.credential.applicationDefault();

    admin.initializeApp({
      credential: cert
    });
    db = admin.firestore();
    console.log('Firebase Admin initialized with credentials.');
  } catch (error) {
    console.warn('Firebase Admin initialization failed:', error.message);
  }
} else {
  console.log('Using local JSON storage for data (serviceAccountKey.json not detected).');
}

module.exports = { admin, db };
