const express = require('express');
const router = express.Router();
const {
  createShortUrl,
  getOriginalUrl,
  updateUrl
} = require('../controllers/urlController');

router.post('/', createShortUrl);
router.get('/:shortCode', getOriginalUrl);
router.put('/:shortCode', updateUrl); // 👈 this line


module.exports = router;
