const { initData, deleteAll, searchNearestLocation } = require('../services/warehouseService');

exports.initData = async (req, res) => { 
  const result = await initData();
  if (result && result.code)
    res.status(result.code).json({ error: result.error });
  else
    res.status(200).json(result);
};

exports.deleteAll = async (req, res) => {
  const result = await deleteAll();
  if (result && result.code)
    res.status(result.code).json({ error: result.error });
  else
    res.status(200).json(result);
};

exports.searchNearestLocation = async (req, res) => {
  const result = await searchNearestLocation(req.query);
  if (result && result.code)
    res.status(result.code).json({ error: result.error });
  else
    res.status(200).json(result);
};