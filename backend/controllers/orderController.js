
const { fetchAll, addOrder, getOrderById, updateOrderById, deleteOrderById } = require('../services/orderService');

exports.fetchAll = async (req, res) => {
    const result = await fetchAll();
    if (result && result.status)
        res.status(result.status).json({ error: result.error });
    else
        res.status(200).json(result);
};

exports.addOrder = async (req, res) => {
    const result = await addOrder(req);
    if (result && result.status)
        res.status(result.status).json({ error: result.error });
    else
        res.status(200).json(result);
};

exports.getOrderById = async (req, res) => {
    const result = await getOrderById(req.params.id);
    if (result && result.status)
        res.status(result.status).json({ error: result.error });
    else
        res.status(200).json(result);
};

exports.updateOrderById = async (req, res) => {
    const result = await updateOrderById(req.params.id, req);
    if (result && result.status)
        res.status(result.status).json({ error: result.error });
    else
        res.status(200).json(result);
};

exports.deleteOrderById = async (req, res) => {
    const result = await deleteOrderById(req.params.id);
    if (result && result.status)
        res.status(result.status).json({ error: result.error });
    else
        res.status(200).json(result);
};