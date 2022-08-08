const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const checkAuth = require('./middlewares/checkAuth');

const app = express();

mongoose.connect(process.env.ATLAS_MONGODB_URL_FOR_APP, { useNewUrlParser: true, useUnifiedTopology: true });

const employeeRouter = require('./routers/employeeRouter');
const warehouseRouter = require('./routers/warehouseRouter');
const orderRouter = require('./routers/orderRouter');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const logStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' });

app.use(morgan('combined', { stream: logStream }));

app.use('/images', express.static(path.join(__dirname, 'assets', 'images')));

app.use('/employees', checkAuth, employeeRouter);
app.use('/warehouses', checkAuth, warehouseRouter);
app.use('/orders', checkAuth, orderRouter);

app.use((req, res, next) => {
  //need to build page 404
  next(new Error('Page Not Found'));
})

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.error });
})

app.listen(process.env.PORT || 3000, () => console.log('Server is running on port ' + process.env.PORT || 3000));