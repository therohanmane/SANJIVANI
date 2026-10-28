const { db } = require('../firebase/admin');
const fs = require('fs');
const path = require('path');

const getFilePath = (collectionName) => {
  return path.join(__dirname, `../data/${collectionName}.json`);
};

const readLocalData = (collectionName) => {
  const filePath = getFilePath(collectionName);
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '[]', 'utf8');
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (e) {
    console.error(`Error reading ${collectionName} local file:`, e);
    return [];
  }
};

const writeLocalData = (collectionName, data) => {
  const filePath = getFilePath(collectionName);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (e) {
    console.error(`Error writing ${collectionName} local file:`, e);
    return false;
  }
};

const handleError = (res, err, message) => {
  console.error(message, err);
  res.status(500).json({ error: message, details: err.message });
};

const handleGet = async (req, res, collectionName) => {
  try {
    if (!db) {
      const items = readLocalData(collectionName);
      return res.status(200).json(items);
    }
    const snapshot = await db.collection(collectionName).orderBy('createdAt', 'desc').get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(items);
  } catch (err) { 
    // Fallback to local if Firestore fails
    try {
      const items = readLocalData(collectionName);
      return res.status(200).json(items);
    } catch {
      handleError(res, err, `Failed to get ${collectionName}`); 
    }
  }
};

const handlePost = async (req, res, collectionName) => {
  try {
    const docData = { 
      id: 'inq_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      ...req.body, 
      createdAt: new Date().toISOString() 
    };
    
    if (!db) {
      const current = readLocalData(collectionName);
      current.unshift(docData);
      writeLocalData(collectionName, current);
      return res.status(201).json(docData);
    }

    const docRef = await db.collection(collectionName).add(docData);
    res.status(201).json({ id: docRef.id, ...docData });
  } catch (err) {
    // Fallback to local write if Firestore fails
    try {
      const docData = { 
        id: 'inq_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        ...req.body, 
        createdAt: new Date().toISOString() 
      };
      const current = readLocalData(collectionName);
      current.unshift(docData);
      writeLocalData(collectionName, current);
      return res.status(201).json(docData);
    } catch {
      handleError(res, err, `Failed to submit ${collectionName}`);
    }
  }
};

const handleDelete = async (req, res, collectionName) => {
  try {
    if (!db) {
      const current = readLocalData(collectionName);
      const filtered = current.filter(item => item.id !== req.params.id);
      writeLocalData(collectionName, filtered);
      return res.status(200).json({ message: 'Deleted successfully' });
    }
    await db.collection(collectionName).doc(req.params.id).delete();
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) { 
    handleError(res, err, `Failed to delete ${collectionName}`); 
  }
};

module.exports = {
  getContacts: (req, res) => handleGet(req, res, 'contacts'),
  postContact: (req, res) => handlePost(req, res, 'contacts'),
  deleteContact: (req, res) => handleDelete(req, res, 'contacts'),

  getEnrollments: (req, res) => handleGet(req, res, 'enrollments'),
  postEnrollment: (req, res) => handlePost(req, res, 'enrollments'),
  deleteEnrollment: (req, res) => handleDelete(req, res, 'enrollments'),

  getServiceRequests: (req, res) => handleGet(req, res, 'service_requests'),
  postServiceRequest: (req, res) => handlePost(req, res, 'service_requests'),
  deleteServiceRequest: (req, res) => handleDelete(req, res, 'service_requests')
};
