const { initData, deleteAll, searchNearestLocation } = require('../services/warehouseService');

exports.initData = async (req, res) => { 
  const result = await initData();
  res.status(200).json(result);
};

exports.deleteAll = async (req, res) => {
  const result = await deleteAll();
  res.status(200).json(result);
};

exports.searchNearestLocation = async (req, res) => {
  const result = await searchNearestLocation(req.query);
  res.status(200).json(result);
};