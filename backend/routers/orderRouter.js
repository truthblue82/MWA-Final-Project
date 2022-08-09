const express = require('express');

const router = express.Router();

const { fetchAll, addOrder, getOrderById } = require('../controllers/orderController');

router.get('/', fetchAll);
router.post('', addOrder);
router.get('/:id', getOrderById);
// router.put('/:id',);
// router.patch('/:id',);
// router.delete('/:id',);

module.exports = router;