const Url = require('../models/Url');
const shortid = require('shortid');

exports.createShortUrl = async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  const shortCode = shortid.generate();

  try {
    const newUrl = await Url.create({
      url,
      shortCode
    });

    res.status(201).json(newUrl);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
