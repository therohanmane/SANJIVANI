const { db } = require('../firebase/admin');
const fs = require('fs');
const path = require('path');

const servicesFile = path.join(__dirname, '../data/services.json');
const onlineServicesFile = path.join(__dirname, '../data/online_services.json');

const readLocalData = (file) => {
  try {
    if (!fs.existsSync(file)) return [];
    return JSON.parse(fs.readFileSync(file, 'utf8') || '[]');
  } catch (e) {
    console.error(`Error reading ${file}:`, e);
    return [];
  }
};

const writeLocalData = (file, data) => {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (e) {
    console.error(`Error writing ${file}:`, e);
    return false;
  }
};

const handleError = (res, err, message) => {
  console.error(message, err);
  res.status(500).json({ error: message, details: err.message });
};

const getAllServices = async (req, res) => {
  try {
    if (!db) {
      return res.status(200).json(readLocalData(servicesFile));
    }
    const snapshot = await db.collection('services').get();
    if (snapshot.empty) {
      return res.status(200).json(readLocalData(servicesFile));
    }
    const services = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(services);
  } catch (err) { 
    res.status(200).json(readLocalData(servicesFile));
  }
};

const getOnlineServices = async (req, res) => {
  try {
    res.status(200).json(readLocalData(onlineServicesFile));
  } catch (err) {
    handleError(res, err, 'Failed to get online services');
  }
};

const getServiceById = async (req, res) => {
  try {
    if (!db) {
      const items = readLocalData(servicesFile);
      const svc = items.find(s => s.id === req.params.id);
      if (!svc) return res.status(404).json({ error: 'Service not found' });
      return res.status(200).json(svc);
    }
    const doc = await db.collection('services').doc(req.params.id).get();
    if (!doc.exists) {
      const items = readLocalData(servicesFile);
      const svc = items.find(s => s.id === req.params.id);
      if (!svc) return res.status(404).json({ error: 'Service not found' });
      return res.status(200).json(svc);
    }
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (err) { handleError(res, err, 'Failed to get service'); }
};

const createService = async (req, res) => {
  try {
    const newService = { id: req.body.id || 'svc_' + Date.now(), ...req.body };
    if (!db) {
      const items = readLocalData(servicesFile);
      items.push(newService);
      writeLocalData(servicesFile, items);
      return res.status(201).json(newService);
    }
    const docRef = await db.collection('services').add(newService);
    res.status(201).json({ id: docRef.id, ...newService });
  } catch (err) { handleError(res, err, 'Failed to create service'); }
};

const updateService = async (req, res) => {
  try {
    if (!db) {
      const items = readLocalData(servicesFile);
      const idx = items.findIndex(s => s.id === req.params.id);
      if (idx !== -1) {
        items[idx] = { ...items[idx], ...req.body };
        writeLocalData(servicesFile, items);
        return res.status(200).json(items[idx]);
      }
    }
    await db.collection('services').doc(req.params.id).update(req.body);
    res.status(200).json({ id: req.params.id, ...req.body });
  } catch (err) { handleError(res, err, 'Failed to update service'); }
};

const deleteService = async (req, res) => {
  try {
    if (!db) {
      const items = readLocalData(servicesFile);
      const filtered = items.filter(s => s.id !== req.params.id);
      writeLocalData(servicesFile, filtered);
      return res.status(200).json({ message: 'Service deleted' });
    }
    await db.collection('services').doc(req.params.id).delete();
    res.status(200).json({ message: 'Service deleted' });
  } catch (err) { handleError(res, err, 'Failed to delete service'); }
};

module.exports = { 
  getAllServices, 
  getOnlineServices, 
  getServiceById, 
  createService, 
  updateService, 
  deleteService 
};
