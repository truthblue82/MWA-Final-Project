const express = require('express');

const router = express.Router();

const { fetchAll, addOrder } = require('../controllers/orderController');

router.get('/', fetchAll);
router.post('', addOrder);
// router.get('/:id',);
// router.put('/:id',);
// router.patch('/:id',);
// router.delete('/:id',);

module.exports = router;