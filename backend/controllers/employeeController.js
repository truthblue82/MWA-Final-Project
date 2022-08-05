const { initData, deleteAll } = require('../services/employeeService');

exports.initData = async (req, res) => { 
  const result = await initData();
  res.status(200).json(result);
};

exports.deleteAll = async (req, res) => {
  const result = await deleteAll();
  res.status(200).json(result);
}