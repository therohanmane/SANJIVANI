const { db } = require('../firebase/admin');
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const getFilePath = (collection) => path.join(DATA_DIR, `${collection}.json`);

const readJson = (collection) => {
  try {
    const file = getFilePath(collection);
    if (!fs.existsSync(file)) return [];
    const data = fs.readFileSync(file, 'utf8');
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error(`Error reading ${collection}.json`, err);
    return [];
  }
};

const writeJson = (collection, data) => {
  try {
    const file = getFilePath(collection);
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error(`Error writing ${collection}.json`, err);
  }
};

const generateId = () => Date.now().toString() + Math.random().toString(36).substring(2, 7);

const dbHelper = {
  async getAll(collection) {
    if (db) {
      try {
        const snap = await db.collection(collection).get();
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (e) {
        console.warn('Firebase error, falling back to JSON for', collection);
      }
    }
    return readJson(collection);
  },
  
  async getById(collection, id) {
    if (db) {
      try {
        const doc = await db.collection(collection).doc(id).get();
        if (doc.exists) return { id: doc.id, ...doc.data() };
      } catch (e) {
        console.warn('Firebase error, falling back to JSON for', collection);
      }
    }
    const data = readJson(collection);
    return data.find(item => item.id === id) || null;
  },
  
  async add(collection, item) {
    if (db) {
      try {
        const docRef = await db.collection(collection).add(item);
        return { id: docRef.id, ...item };
      } catch (e) {
        console.warn('Firebase error, falling back to JSON for', collection);
      }
    }
    const data = readJson(collection);
    const newItem = { id: generateId(), ...item };
    data.push(newItem);
    writeJson(collection, data);
    return newItem;
  },
  
  async update(collection, id, item) {
    if (db) {
      try {
        await db.collection(collection).doc(id).update(item);
        return { id, ...item };
      } catch (e) {
        console.warn('Firebase error, falling back to JSON for', collection);
      }
    }
    const data = readJson(collection);
    const index = data.findIndex(d => d.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...item };
      writeJson(collection, data);
      return data[index];
    }
    throw new Error('Document not found in fallback JSON');
  },
  
  async remove(collection, id) {
    if (db) {
      try {
        await db.collection(collection).doc(id).delete();
        return true;
      } catch (e) {
        console.warn('Firebase error, falling back to JSON for', collection);
      }
    }
    let data = readJson(collection);
    data = data.filter(d => d.id !== id);
    writeJson(collection, data);
    return true;
  },

  async getSettings() {
    if (db) {
       try {
         const doc = await db.collection('settings').doc('global').get();
         if (doc.exists) return doc.data();
       } catch (e) {
         console.warn('Firebase error, falling back to JSON for settings');
       }
    }
    const file = getFilePath('settings');
    if (!fs.existsSync(file)) return {};
    const data = fs.readFileSync(file, 'utf8');
    return data ? JSON.parse(data) : {};
  },

  async updateSettings(settings) {
    if (db) {
      try {
         await db.collection('settings').doc('global').set(settings, { merge: true });
         return settings;
      } catch (e) {
         console.warn('Firebase error, falling back to JSON for settings');
      }
    }
    const file = getFilePath('settings');
    let current = {};
    if (fs.existsSync(file)) {
      const data = fs.readFileSync(file, 'utf8');
      if (data) current = JSON.parse(data);
    }
    const updated = { ...current, ...settings };
    fs.writeFileSync(file, JSON.stringify(updated, null, 2), 'utf8');
    return updated;
  }
};

module.exports = dbHelper;
