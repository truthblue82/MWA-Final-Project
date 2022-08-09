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

exports.getOrderById = async (orderId) => {
    try {
        return await Order.findById(orderId);
    } catch (err) {
        return { status: 500, error: err.message };
    }
};

exports.updateOrderById = async (orderId, updatedOrder) => {
    try {
        const result = await Order.findOneAndUpdate({ _id: orderId }, updateOrder);
        return updatedOrder;
    } catch (err) {
        return { status: 500, error: err.message };
    }
}