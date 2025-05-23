const express = require('express');
const router = express.Router();
const crypto = require('crypto'); // Added import
const urlModel = require('../models/urlModel');

const isValidUrl = (url) => {
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*(\?[\w=&%-]*)?$/;
    return urlRegex.test(url);
};
const generateShortCode = (longUrl) => {
    const hash = crypto.createHash('sha256').update(longUrl).digest('base64');
    return hash.replace(/[^a-zA-Z0-9]/g, '').substring(0, 8);
};

router.post('/shorten', async (req, res) => {
    const { longUrl, custom } = req.body;
    if (!isValidUrl(longUrl)) {
        return res.status(400).json({ message: 'Not a Valid Base URL' });
    }
    try {
        if (custom) {
            if (!/^[a-zA-Z0-9]{4,10}$/.test(custom)) {
                return res.status(400).json({ message: 'Custom URL must be 4-10 alphanumeric characters' });
            }
            const existingCustom = await urlModel.findOne({ shortUrlCode: custom });
            if (existingCustom) {
                return res.status(400).json({ message: 'Custom URL already in use' });
            }
            const url = new urlModel({
                longUrl,
                shortUrlCode: custom,
            });
            await url.save();
            return res.status(200).json({ shortUrl: `${process.env.CLIENT_URL}/${custom}` });
        }

        const alreadyExists = await urlModel.findOne({ longUrl });
        if (alreadyExists) {
            return res.status(200).json({ shortUrl: `${process.env.CLIENT_URL}/${alreadyExists.shortUrlCode}` });
        }

        const code = generateShortCode(longUrl);
        const url = new urlModel({
            longUrl,
            shortUrlCode: code,
        });
        await url.save();
        return res.status(200).json({ shortUrl: `${process.env.CLIENT_URL}/${url.shortUrlCode}` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:code', async (req, res) => {
    const { code } = req.params;
    try {
        const url = await urlModel.findOne({ shortUrlCode: code });
        if (url) {
            return res.json({ longUrl: url.longUrl }); // Ensure response matches frontend expectation
        } else {
            return res.status(404).json({ message: 'Short code not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;