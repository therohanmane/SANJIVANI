const { db } = require('../firebase/admin');

const handleError = (res, err, message) => {
  console.error(message, err);
  res.status(500).json({ error: message, details: err.message });
};

const getAllProducts = async (req, res) => {
  try {
    if (!db) return res.status(500).json({ error: 'Database not initialized' });
    const snapshot = await db.collection('products').get();
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(products);
  } catch (err) { handleError(res, err, 'Failed to get products'); }
};

const getProductById = async (req, res) => {
  try {
    const doc = await db.collection('products').doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (err) { handleError(res, err, 'Failed to get product'); }
};

const createProduct = async (req, res) => {
  try {
    const docRef = await db.collection('products').add(req.body);
    res.status(201).json({ id: docRef.id, ...req.body });
  } catch (err) { handleError(res, err, 'Failed to create product'); }
};

const updateProduct = async (req, res) => {
  try {
    await db.collection('products').doc(req.params.id).update(req.body);
    res.status(200).json({ id: req.params.id, ...req.body });
  } catch (err) { handleError(res, err, 'Failed to update product'); }
};

const deleteProduct = async (req, res) => {
  try {
    await db.collection('products').doc(req.params.id).delete();
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) { handleError(res, err, 'Failed to delete product'); }
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
