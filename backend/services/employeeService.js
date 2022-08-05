const bcrypt = require('bcrypt');
const Employee = require('../models/employees');

exports.initData = async () => {
  try {
    const employees = require('../data/employees.json');
    
    employees.forEach(empl => {
      //using bcrypt
      bcrypt.hash(empl.password, 10).then(async hash => {
        const employee = new Employee({...empl,  password: hash});
        await employee.save();
      });
    });
    return { message: 'success' };
  } catch (err) {
    return { error: err.message };
  }
};

exports.deleteAll = async () => {
  try {
    const result = await Employee.deleteMany({});
    return result;
  } catch (err) {
    return { error: err.message };
  }
};