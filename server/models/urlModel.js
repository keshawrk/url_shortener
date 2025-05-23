const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        required: true,
    },
    shortUrlCode: {
        type: String,
        required: true,
        unique: true, // Prevent duplicate short codes
    },
});

const Url = mongoose.model('Url', urlSchema);
module.exports = Url;