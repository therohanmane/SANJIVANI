require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const coursesRoutes = require('./routes/courses');
const servicesRoutes = require('./routes/services');
const productsRoutes = require('./routes/products');
const inquiriesRoutes = require('./routes/inquiries');
const settingsRoutes = require('./routes/settings');

app.use('/api/courses', coursesRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/inquiries', inquiriesRoutes);
app.use('/api/settings', settingsRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.send('SANJIVANI API Pipeline is running...');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
