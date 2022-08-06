const { initData, deleteAll, signup, login, getAll } = require('../services/employeeService');

exports.initData = async (req, res) => { 
  const result = await initData();
  if (result && result.code)
    res.status(result.code).json({ error: result.error });
  else
    res.status(200).json({ message: 'Init employees collection', result: result });
};

exports.deleteAll = async (req, res) => {
  const result = await deleteAll();
  if (result && result.code)
    res.status(result.code).json({ error: result.error });
  else
    res.status(200).json({ message: 'Employees collection was cleared', result: result });
}

exports.signup = async (req, res) => {
  const employee = req.body;
  const result = await signup(employee);
  if (result && result.code)
    res.status(result.code).json({ error: result.error });
  else
    res.status(201).json({ message: 'Employee is created', result: result });
};

exports.login = async (req, res, next) => {
  const result = await login(req.body.email, req.body.password);
  if (result && result.code) {
    res.status(result.code).json({ error: result.error });
  }
  else
    res.status(200).json({ token: result });
};

exports.getAll = async (req, res) => {
  const result = await getAll();
  if (result && result.code)
    res.status(result.code).json({ error: result.error });
  else
    res.status(200).json({ result: result });
}

