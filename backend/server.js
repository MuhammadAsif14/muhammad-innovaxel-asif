const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const urlRoutes = require('./routes/urlRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend
app.use(express.static(path.resolve(__dirname, '../frontend')));

// API routes
app.use('/shorten', urlRoutes);

// Serve index.html at root
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/index.html'));
});

// Serve redirect.html directly
app.get('/redirect.html', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/redirect.html'));
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
