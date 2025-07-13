const express = require('express');
const router = express.Router();
const { createShortUrl } = require('../controllers/urlController');

// POST /shorten
router.post('/', createShortUrl);

module.exports = router;
