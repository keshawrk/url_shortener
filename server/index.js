const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
}));
app.use(express.json());
const PORT = process.env.PORT || 8000;

require('./connection');

app.use('/api', require('./routes/urlRoute'));

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});