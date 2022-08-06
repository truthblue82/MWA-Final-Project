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

exports.login = async (email, password) => {
  const employee = await Employee.findOne({ email: email });
  
  if (!employee) {
    return { code: 401, message: 'Employee is not found' };
  }
  const match = await bcrypt.compare(password, employee.password);
  
  if (match) {
    const token = jwt.sign({
      employeeId: employee._id,
      email: employee.email,
      fullname: `${employee.firstname} ${employee.lastname}`,
      role: employee.role 
    }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
    
    return { code: 200, token: token };
  } else {
    return { code: 401, message: 'Password does not match' };
  }
};