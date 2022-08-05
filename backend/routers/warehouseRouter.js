const express = require('express');
const router = express.Router();

const { initData, deleteAll, searchNearestLocation } = require('../controllers/warehouseController');

router.post('/fill', initData);
router.delete('/clear', deleteAll);
router.get('/search', searchNearestLocation);

module.exports = router;