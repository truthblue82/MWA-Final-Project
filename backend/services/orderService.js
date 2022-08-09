const path = require('path');
const Order = require('../models/orders');
const { trackingNumberGenerator } = require('../utils/utils');

exports.fetchAll = async () => {
    try {
        const result = await Order.find();
        return result;
    } catch (err) {
        return { status: 500, error: err.message };
    }
};

exports.addOrder = async (req) => {
    try {
        //generate trackingNumber
        const orderObj = req.body;
        orderObj.trackingNumber = trackingNumberGenerator();
        console.log(orderObj);

        if (req.file && req.file.filename) {
            const pictureName = req.file.filename;
            const picturePath = path.join('/', 'images', pictureName);
            orderObj.images = [picturePath];
        }

        const order = new Order(orderObj);
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

exports.getOrderById2 = async (orderId) => {
    try {
        return await Order.findById(orderId);
    } catch (err) {
        return { status: 500, error: err.message };
    }
};

exports.updateOrderById = async (orderId, req) => {
    try {
        const orderObj = req.body;
        if(!orderObj.trackingNumber)
            orderObj.trackingNumber = trackingNumberGenerator();
        if (req.file && req.file.filename) {
            const pictureName = req.file.filename;
            const picturePath = path.join('/', 'images', pictureName);
            orderObj.images = [picturePath];
        }
        const result = await Order.findOneAndUpdate({ _id: orderId }, orderObj);
        return orderObj;
    } catch (err) {
        return { status: 500, error: err.message };
    }
}
