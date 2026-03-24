const dbHelper = require('../utils/db');

// Generic error handler
const handleError = (res, err, message) => {
  console.error(message, err);
  res.status(500).json({ error: message, details: err.message });
};

// GET all inquiries
const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await dbHelper.getAll('inquiries');
    res.status(200).json(inquiries);
  } catch (err) {
    handleError(res, err, 'Failed to get inquiries');
  }
};

// GET single inquiry
const getInquiryById = async (req, res) => {
  try {
    const inquiry = await dbHelper.getById('inquiries', req.params.id);
    if (!inquiry) return res.status(404).json({ error: 'Inquiry not found' });
    res.status(200).json(inquiry);
  } catch (err) {
    handleError(res, err, 'Failed to get inquiry');
  }
};

// POST new inquiry
const createInquiry = async (req, res) => {
  try {
    const newInquiry = await dbHelper.add('inquiries', { ...req.body, status: 'pending', timestamp: new Date().toISOString() });
    res.status(201).json(newInquiry);
  } catch (err) {
    handleError(res, err, 'Failed to create inquiry');
  }
};

// PUT update inquiry (e.g. resolve)
const updateInquiry = async (req, res) => {
  try {
    const updated = await dbHelper.update('inquiries', req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    handleError(res, err, 'Failed to update inquiry');
  }
};

// DELETE inquiry
const deleteInquiry = async (req, res) => {
  try {
    await dbHelper.remove('inquiries', req.params.id);
    res.status(200).json({ message: 'Inquiry deleted successfully' });
  } catch (err) {
    handleError(res, err, 'Failed to delete inquiry');
  }
};

module.exports = {
  getAllInquiries,
  getInquiryById,
  createInquiry,
  updateInquiry,
  deleteInquiry
};
