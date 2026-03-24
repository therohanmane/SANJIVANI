const dbHelper = require('../utils/db');

// GET settings
const getSettings = async (req, res) => {
  try {
    const settings = await dbHelper.getSettings();
    res.status(200).json(settings);
  } catch (err) {
    console.error('Failed to get settings', err);
    res.status(500).json({ error: 'Failed to get settings', details: err.message });
  }
};

// PUT update settings
const updateSettings = async (req, res) => {
  try {
    const updated = await dbHelper.updateSettings(req.body);
    res.status(200).json(updated);
  } catch (err) {
    console.error('Failed to update settings', err);
    res.status(500).json({ error: 'Failed to update settings', details: err.message });
  }
};

module.exports = { getSettings, updateSettings };
