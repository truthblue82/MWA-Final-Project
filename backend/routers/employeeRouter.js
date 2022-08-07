const express = require('express');

const { initData, deleteAll, login, signup, getAll,
  getEmployeeById, updateEmployeeById, updateEmployeePassword } = require('../controllers/employeeController');

const router = express.Router();

router.post('/fill', initData);
router.delete('/clear', deleteAll);
router.post('/signup', signup);
router.post('/login', login);
router.get('', getAll);
router.get('/:id', getEmployeeById);
router.put('/:id', updateEmployeeById);
router.patch('/:id', updateEmployeePassword);

module.exports = router;
