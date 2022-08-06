const { initData, deleteAll, signup, login } = require('../services/employeeService');

exports.initData = async (req, res) => { 
  const result = await initData();
  res.status(200).json({ message: 'Init employees collection', result: result });
};

exports.deleteAll = async (req, res) => {
  const result = await deleteAll();
  res.status(200).json({ message: 'Employees collection was cleared', result: result });
}

exports.signup = async (req, res) => {
  const employee = req.body;
  const result = await signup(employee);
  res.status(201).json({ message: 'Employee is created', result: result });
};

exports.login = async (req, res) => {
  console.log(req.body);
  const result = await login(req.body.username, req.body.password);
  console.log('employeeController',result);
  if (result.code === 200) {
    res.status(result.code).json({ token: result.token });
  } else
    res.status(result.code).json({ error: result.message });
}

