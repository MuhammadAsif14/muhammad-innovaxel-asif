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
exports.getOriginalUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const urlEntry = await Url.findOne({ shortCode });
    if (!urlEntry) return res.status(404).json({ error: 'Short URL not found' });

    urlEntry.accessCount += 1;
    urlEntry.updatedAt = new Date();
    await urlEntry.save();

    res.status(200).json(urlEntry);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
