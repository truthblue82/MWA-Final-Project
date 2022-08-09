const express = require('express');

const router = express.Router();

const { fetchAll, addOrder, getOrderById, updateOrderById } = require('../controllers/orderController');

router.get('/', fetchAll);
router.post('', addOrder);
router.get('/:id', getOrderById);
router.put('/:id', updateOrderById);
// router.patch('/:id',);
// router.delete('/:id',);

module.exports = router;