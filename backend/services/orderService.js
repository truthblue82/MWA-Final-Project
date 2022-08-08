const Orders = require('../models/orders');

exports.fetchAll = async () => {
    try {
        const result = await Orders.find();
        return result;
    } catch (err) {
        return { status: 500, error: err.message };
    }
};