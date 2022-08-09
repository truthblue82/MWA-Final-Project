const path = require('path');
const Order = require('../models/orders');
const jwt = require('jsonwebtoken');
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
        
        if (orderObj.routes) {
            const routes = JSON.parse(orderObj.routes);
            
            //add last route from last warehouse to receiver home
            const lastRoute = routes[routes.length-1];

            routes.push({
                name: `House of ${orderObj.receiverName}`,
                from: {
                    ...lastRoute.to
                },
                to: {
                    name: `House of ${orderObj.receiverName}`,
                    address: orderObj.receiverAddress,
                    contac: orderObj.receiverPhone
                },
                color: '',
                note: ''
            });
            
            orderObj.routes = routes;
        }
        
        const token = req.headers.authorization.replace(/Bearer /gi, '');
        const decode = jwt.decode(token, {
            complete: true
        });
        orderObj.orderCreater = decode.payload.employeeId;

        if (req.file && req.file.filename) {
            const pictureName = req.file.filename;
            const picturePath = path.join('/', 'images', pictureName);
            orderObj.images = picturePath;
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
                from: {
                    name: 'Start point',
                    address: result.senderAddress,
                    contact: result.senderPhone
                },
                to: {
                    name: '',
                    address: '',
                    contact: ''
                },
                assignee: {
                    id: '',
                    name: ''
                },
                routeStatus: 'Arrived'
            })
        }
        result.routes.push({
            name: 'End point',
            from: {
                name: '',
                address: '',
                contact: ''
            },
            to: {
                name: result.receiverName,
                address: result.receiverAddress,
                contact: result.receiverPhone
            },
            assignee: {
                id: '',
                name: ''
            },
            routeStatus: 'New'
        });
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
        console.log(orderObj.trackingNumber);
        if (!orderObj.trackingNumber) {
            orderObj.trackingNumber = trackingNumberGenerator();
            console.log(orderObj.trackingNumber);
        }
        if (req.file && req.file.filename) {
            const pictureName = req.file.filename;
            const picturePath = path.join('/', 'images', pictureName);
            orderObj.images = picturePath;
        }
        if (orderObj.routes) {
            const routes = JSON.parse(orderObj.routes);
            //add last route from last warehouse to receiver home
            const lastRoute = routes[routes.length - 1];
            routes.push({
                name: `House of ${orderObj.receiverName}`,
                from: {
                    ...lastRoute.to
                },
                to: {
                    name: `House of ${orderObj.receiverName}`,
                    address: orderObj.receiverAddress,
                    contac: orderObj.receiverPhone
                },
                color: '',
                note: ''
            });
            orderObj.routes = routes;
        }
        const token = req.headers.authorization.replace(/Bearer /gi, '');
        const decode = jwt.decode(token, {
            complete: true
        });
        orderObj.orderCreater = decode.payload.employeeId;
        
        const result = await Order.findOneAndUpdate({ _id: orderId }, orderObj);
        
        console.log('result',result);
        return orderObj;
    } catch (err) {
        console.log(err.message)
        return { status: 500, error: err.message };
    }
}

exports.deleteOrderById = async (order_id) => {
    try {
        return await Order.deleteOne({ _id: order_id });
    } catch (err) {
        return { status: 500, error: err.message };
    }
}
