const orderService = require('../services/orderService');

exports.fetchAll = async (req, res) => {
    const result = await orderService.fetchAll();
    if (result && result.status)
        res.status(result.status).json({ error: result.error });
    else
        res.status(200).json(result);
};