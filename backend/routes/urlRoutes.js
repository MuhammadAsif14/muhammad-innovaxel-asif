const express = require('express');
const router = express.Router();
const {
  createShortUrl,
  getOriginalUrl,
  updateUrl,
  deleteUrl
} = require('../controllers/urlController');

router.post('/', createShortUrl);
router.get('/:shortCode', getOriginalUrl);
router.put('/:shortCode', updateUrl);
router.delete('/:shortCode', deleteUrl); 

module.exports = router;
