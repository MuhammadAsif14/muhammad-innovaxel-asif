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
exports.updateUrl = async (req, res) => {
  const { shortCode } = req.params;
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const urlEntry = await Url.findOne({ shortCode });

    if (!urlEntry) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    urlEntry.url = url;
    urlEntry.updatedAt = new Date();

    await urlEntry.save();

    res.status(200).json(urlEntry);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
exports.deleteUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const result = await Url.findOneAndDelete({ shortCode });

    if (!result) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
exports.getStats = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const urlEntry = await Url.findOne({ shortCode });

    if (!urlEntry) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    res.status(200).json(urlEntry);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
