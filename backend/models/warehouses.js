const { Schema, model } = require('mongoose');

const warehouseSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  phone: { type: String },
  address: {
    country: { type: String },
    city: { type: String },
    state: { type: String },
    street: { type: String },
    zipcode: { type: Number }
  },
  location: [Number, Number],
  employees: []
});
warehouseSchema.index({location: '2d'});
module.exports = model('Warehouse', warehouseSchema);