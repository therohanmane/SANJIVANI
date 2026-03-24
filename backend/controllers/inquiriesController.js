const { db } = require('../firebase/admin');

const handleError = (res, err, message) => {
  console.error(message, err);
  res.status(500).json({ error: message, details: err.message });
};

const handleGet = async (req, res, collectionName) => {
  try {
    if (!db) return res.status(500).json({ error: 'Database not initialized' });
    const snapshot = await db.collection(collectionName).orderBy('createdAt', 'desc').get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(items);
  } catch (err) { handleError(res, err, `Failed to get ${collectionName}`); }
};

const handlePost = async (req, res, collectionName) => {
  try {
    const docData = { ...req.body, createdAt: new Date().toISOString() };
    const docRef = await db.collection(collectionName).add(docData);
    res.status(201).json({ id: docRef.id, ...docData });
  } catch (err) { handleError(res, err, `Failed to submt ${collectionName}`); }
};

const handleDelete = async (req, res, collectionName) => {
   try {
    await db.collection(collectionName).doc(req.params.id).delete();
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) { handleError(res, err, `Failed to delete ${collectionName}`); }
}

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
