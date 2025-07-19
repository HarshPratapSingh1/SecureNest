const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/download', async (req, res) => {
  const { url } = req.query;

  if (!url) return res.status(400).send('Missing URL');

  try {
    const response = await axios.get(url, { responseType: 'stream' });

    // Extract filename from Cloudinary URL (or default to 'file')
    const filename = url.split('/').pop().split('?')[0] || 'file';

    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', response.headers['content-type']);

    response.data.pipe(res); // Pipe the file stream to the response
  } catch (err) {
    console.error('Download proxy failed:', err);
    res.status(500).send('Failed to download image.');
  }
});

module.exports = router;
