const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const settingsFile = path.join(__dirname, '../data/settings.json');

// GET /api/settings - Get current site settings
router.get('/', (req, res) => {
  try {
    const data = fs.readFileSync(settingsFile, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading settings:', error);
    res.status(500).json({ error: 'Failed to read settings' });
  }
});

// PUT /api/settings - Update site settings
router.put('/', (req, res) => {
  try {
    const newSettings = req.body;
    
    // Validate we're not saving empty objects or breaking formatting
    if (!newSettings || Object.keys(newSettings).length === 0) {
      return res.status(400).json({ error: 'Invalid settings data provided' });
    }

    fs.writeFileSync(settingsFile, JSON.stringify(newSettings, null, 2), 'utf8');
    res.json({ message: 'Settings updated successfully', settings: newSettings });
  } catch (error) {
    console.error('Error writing settings:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

module.exports = router;
