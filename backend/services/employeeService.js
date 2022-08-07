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
    return { status: 500, error: err.message };
  }
};

exports.deleteAll = async () => {
  try {
    const result = await Employee.deleteMany({});
    return result;
  } catch (err) {
    return { status: 500, error: err.message };
  }
};

exports.signup = async (employee) => {
  try {
    bcrypt.hash(employee.password, 10)
      .then(async hash => {
        const employee = new Employee({
          ...employee,
          password: hash
        });
        const result = await employee.save();
        return result;
    })
  } catch (err) {
    return { status: 500, error: err.message };
  }
};

exports.login = async (email, password) => {
  const employee = await Employee.findOne({ email: email });
  
  if (!employee) {
    return { status: 401, error: 'Employee is not found' };
  }
  const match = await bcrypt.compare('' + password, employee.password);
  
  if (match) {
    const token = jwt.sign({
      employeeId: employee._id,
      email: employee.email,
      fullname: `${employee.firstname} ${employee.lastname}`,
      role: employee.role,
      avatar: employee.avatar
    }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
    
    return token;
  } else {
    return { status: 401, error: 'Password does not match' };
  }
};

exports.getAll = async () => {
  try {
    const result = await Employee.find();
    return result;
  } catch (err) {
    return { status: 500, error: err.message };
  }
};

exports.getEmployeeById = async (id) => {
  try {
    const result = await Employee.findOne({ _id: id });
    return result;
  } catch (err) {
    return { status: 500, error: err.message };
  }
};

exports.updateEmployeeById = async (id, employee) => {
  try {
    const result = await Employee.findOneAndUpdate({ _id: id }, employee);
    const updatedEmp = { ...result, ...employee };
    console.log(updatedEmp);
    return updatedEmp;
  } catch (err) {
    return { status: 500, error: err.message };
  }
};

exports.updateEmployeePassword = async (id, password) => {
  try {
    bcrypt.hash(password, 10)
      .then(async hash => {
        const result = await Employee.findOneAndUpdate({ _id: id }, { password: hash });
        return result;
    })
  } catch (err) {
    return { status: 500, error: err.message };
  }
};