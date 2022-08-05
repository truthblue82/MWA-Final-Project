const express = require('express');

const { initData, deleteAll, login, signup } = require('../controllers/employeeController');

const router = express.Router();

router.post('/fill', initData);
router.delete('/clear', deleteAll);
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
