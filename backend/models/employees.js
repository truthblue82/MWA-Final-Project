const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const employeeSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true, index: true },
  email: { type: String, required: true, unique: true, index: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  avatar: { type: String },
  gender: { type: String},
  address: { 
    country: { type: String },
    state: { type: String },
    city: { type: String },
    street: { type: String },
    zipcode: { type: Number }
  }
});
employeeSchema.plugin(uniqueValidator);
module.exports =  model('Employee', employeeSchema);