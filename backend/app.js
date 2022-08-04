const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const logStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' });

// setup the logger: combined
app.use(morgan('combined', { stream: logStream }));

app.listen(process.env.PORT || 3000, () => console.log('Server is running on port ' + process.env.PORT || 3000));