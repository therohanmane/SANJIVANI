const dbHelper = require('../utils/db');

// Generic error handler
const handleError = (res, err, message) => {
  console.error(message, err);
  res.status(500).json({ error: message, details: err.message });
};

// GET all products
const getAllProducts = async (req, res) => {
  try {
    const products = await dbHelper.getAll('products');
    res.status(200).json(products);
  } catch (err) {
    handleError(res, err, 'Failed to get products');
  }
};

// GET single product
const getProductById = async (req, res) => {
  try {
    const product = await dbHelper.getById('products', req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    handleError(res, err, 'Failed to get product');
  }
};

// POST new product
const createProduct = async (req, res) => {
  try {
    const newProduct = await dbHelper.add('products', req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    handleError(res, err, 'Failed to create product');
  }
};

// PUT update product
const updateProduct = async (req, res) => {
  try {
    const updated = await dbHelper.update('products', req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    handleError(res, err, 'Failed to update product');
  }
};

// DELETE product
const deleteProduct = async (req, res) => {
  try {
    await dbHelper.remove('products', req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    handleError(res, err, 'Failed to delete product');
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
