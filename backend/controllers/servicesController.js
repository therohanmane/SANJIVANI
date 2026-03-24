const dbHelper = require('../utils/db');

// Generic error handler
const handleError = (res, err, message) => {
  console.error(message, err);
  res.status(500).json({ error: message, details: err.message });
};

// GET all services
const getAllServices = async (req, res) => {
  try {
    const services = await dbHelper.getAll('services');
    res.status(200).json(services);
  } catch (err) {
    handleError(res, err, 'Failed to get services');
  }
};

// GET single service
const getServiceById = async (req, res) => {
  try {
    const service = await dbHelper.getById('services', req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.status(200).json(service);
  } catch (err) {
    handleError(res, err, 'Failed to get service');
  }
};

// POST new service
const createService = async (req, res) => {
  try {
    const newService = await dbHelper.add('services', req.body);
    res.status(201).json(newService);
  } catch (err) {
    handleError(res, err, 'Failed to create service');
  }
};

// PUT update service
const updateService = async (req, res) => {
  try {
    const updated = await dbHelper.update('services', req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    handleError(res, err, 'Failed to update service');
  }
};

// DELETE service
const deleteService = async (req, res) => {
  try {
    await dbHelper.remove('services', req.params.id);
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (err) {
    handleError(res, err, 'Failed to delete service');
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
};
