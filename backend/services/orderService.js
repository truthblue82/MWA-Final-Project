const Order = require('../models/orders');

exports.fetchAll = async () => {
    try {
        const result = await Order.find();
        return result;
    } catch (err) {
        return { status: 500, error: err.message };
    }
};

exports.addOrder = async (order) => {
    try {
        const order = new Order(order);
        const result = await order.save();
        return result;
    } catch (err) {
        return { status: 500, error: err.message };
    }
};