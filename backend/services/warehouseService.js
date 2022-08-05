const Warehouse = require('../models/warehouses');

exports.initData = async () => {
  try {
    const warehouses = require('../data/warehouses.json');
    
    warehouses.forEach(async wh => {
      const warehouse = new Warehouse(wh);
      await warehouse.save();
    });
    
    return { message: 'success' };
  } catch (err) {
    return { error: err.message };
  }
};

exports.deleteAll = async () => {
  try {
    const result = await Warehouse.deleteMany({});
    return result;
  } catch (err) {
    return { error: err.message };
  }
};

exports.searchNearestLocation = async (query) => {
  console.log(query);
  try {
    const { lat, log } = query;
    const result = await Warehouse.find({ location: { $near: [log, lat] } }).limit(1).toArray();
    return result;
  } catch (err) {
    return { error: err.message };
  }
};