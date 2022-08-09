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

exports.getOrderById = async (id) => {
    try {
        const result = await Order.findOne({"_id": id});
        if (result.routes.length <= 0) {
            result.routes.push({
                name: 'Start point',
                address: result.senderAddress,
                PIC: 'N/A',
                status: 'Arrived'
            })
        }
        result.routes.push({
            name: 'End point',
            address: result.receiverAddress || "No address",
            PIC: 'N/A',
            status: 'New'});
        return result;
    } catch (err) {
        return { status: 500, error: err.message };
    }
};