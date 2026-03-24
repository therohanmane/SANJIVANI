const { db } = require('../firebase/admin');

const handleError = (res, err, message) => {
  console.error(message, err);
  res.status(500).json({ error: message, details: err.message });
};

const getAllServices = async (req, res) => {
  try {
    if (!db) return res.status(500).json({ error: 'Database not initialized' });
    const snapshot = await db.collection('services').get();
    const services = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(services);
  } catch (err) { handleError(res, err, 'Failed to get services'); }
};

const getServiceById = async (req, res) => {
  try {
    const doc = await db.collection('services').doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: 'Service not found' });
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (err) { handleError(res, err, 'Failed to get service'); }
};

const createService = async (req, res) => {
  try {
    const docRef = await db.collection('services').add(req.body);
    res.status(201).json({ id: docRef.id, ...req.body });
  } catch (err) { handleError(res, err, 'Failed to create service'); }
};

const updateService = async (req, res) => {
  try {
    await db.collection('services').doc(req.params.id).update(req.body);
    res.status(200).json({ id: req.params.id, ...req.body });
  } catch (err) { handleError(res, err, 'Failed to update service'); }
};

const deleteService = async (req, res) => {
  try {
    await db.collection('services').doc(req.params.id).delete();
    res.status(200).json({ message: 'Service deleted' });
  } catch (err) { handleError(res, err, 'Failed to delete service'); }
};

module.exports = { getAllServices, getServiceById, createService, updateService, deleteService };
