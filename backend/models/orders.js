const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  senderName: { type: String, required: true },
  senderPhone: { type: String, required: true },
  senderEmail: { type: String },
  senderAddress: { type: String},
  
  receiverName: { type: String, required: true },
  receiverPhone: { type: String, required: true },
  receiverEmail: { type: String },
  receiverAddress: { type: String},
  receiverLocation: [Number, Number],
  
  routes: [], //[{address, location, routeStatus, operator}, {...}]
  sourceAddress: { type: String },
  sourceLocation: [Number, Number],
  
  orderDate: { type: Date, required: true },
  cost: { type: Number, required: true },
  tax: { type: Number, required: true },
  images: [String, String],
  weight: { type: String },
  size: { type: String},
  orderValue: { type: Number },
  deliveryType: { type: String },
  insurance: { type: String},
  note: { type: String },
  orderStatus: { type: String }, //status at final
  
  createdStaff: { type: String }, //id string of employee id
  deleted: { type: Number} // create: 0, 1: deleted
});

orderSchema.index({ receiverLocation: '2d' });

module.exports = model('Orders', orderSchema);

/*
New: create a new order														
Processing: assign an operator for shipping														
On the way: shipping														
Pending: There are a reason for pending as plan														
Arrived: at the warehouse														
Delivered: to receiver														
Completed: Delivery success														
Failed: There are some reasons can't deliver to customer														
*/