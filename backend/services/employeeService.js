const bcrypt = require('bcrypt');
const Employee = require('../models/employees');
const jwt = require('jsonwebtoken');

exports.initData = async () => {
  try {
    const employees = require('../data/employees.json');
    
    employees.forEach(empl => {
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

exports.signup = async (employee) => {
  try {
    const bcryptPassword = bcrypt.hash(employee.password, 10)
      .then(async hash => {
        const employee = new Employee({
          ...employee,
          password: hash
        });
        const result = await employee.save();
        return result;
    })
  } catch (err) {
    return { error: err.message };
  }
};

exports.login = async (username, password) => {
  const employee = await Employee.findOne({ username: username });
  console.log('employee', employee);
  if (!employee) {
    return { code: 401, message: 'Authencation failed' };
  }
  const compareResult = bcrypt.compare(password, employee.password);
  console.log('compareResult', compareResult);
  
  /*Employee.findOne({ username: username })
    .then(empl => {
      console.log('empl',empl);
      if (!empl) {
        console.log('if !empl');
        return { code: 401, message: 'Auth failed' };
      }
      employee = empl;
      return bcrypt.compare(password, empl.password);
    })
    .then(result => {
      console.log('then 2',result);
      if (!result) {
        return { code: 401, message: 'Auth failed' };
      }
      console.log('SECRET_KEY',process.env.SECRET_KEY);
      const token = jwt.sign({
        employeeId: employee._id,
        username: employee.username,
        fullname: `${employee.firstname} ${employee.lastname}`,
        role: employee.role
      }, process.env.SECRET_KEY, { expiresIn: "1h" });
      
      return { code: 200, token: token };
    }).catch( err => {
      return { code: 401, message: err.message };
  })*/
};