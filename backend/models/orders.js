const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  senderName: { type: String, required: true },
  senderPhone: { type: String, required: true },
  receiverName: { type: String, required: true },
  receiverPhone: { type: String, required: true },
  receiverAddress: { 
    country: { type: String },
    city: { type: String },
    state: { type: String },
    street: { type: String },
    zipcode: { type: Number }
  }
});

module.exports = model('Orders', orderSchema);