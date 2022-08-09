const express = require('express');
const router = express.Router();
const { initData, deleteAll, searchNearestLocation, searchNearestWareHouse } = require('../controllers/warehouseController');

router.post('/fill', initData);
router.delete('/clear', deleteAll);
router.get('/search', searchNearestLocation);
router.get('/nearest-search', searchNearestWareHouse);

module.exports = router;