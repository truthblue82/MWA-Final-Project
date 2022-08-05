const express = require('express');

const { initData, deleteAll } = require('../controllers/employeeController');

const router = express.Router();

router.post('/fill', initData);
router.delete('/clear', deleteAll);

module.exports = router;
