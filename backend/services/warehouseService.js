const Warehouse = require('../models/warehouses');
const jwt = require('jsonwebtoken');

exports.initData = async () => {
  try {
    const warehouses = require('../data/warehouses.json');
    
    warehouses.forEach(async wh => {
      const warehouse = new Warehouse(wh);
      await warehouse.save();
    });
    
    return { message: 'success' };
  } catch (err) {
    return { status: 500, error: err.message };
  }
};

exports.deleteAll = async () => {
  try {
    const result = await Warehouse.deleteMany({});
    return result;
  } catch (err) {
    return { status: 500, error: err.message };
  }
};

exports.searchNearestLocation = async (query) => {
  try {
    const { lat, log } = query;
    const result = await Warehouse.find({ location: { $near: [log, lat] } }).limit(1);
    return result;
  } catch (err) {
    return { status: 500, error: err.message };
  }
};

exports.searchNearestWareHouse = async (req) => {
  try {
    //search?state=texas
    //console.log('query', req.query);
    const { state, first, whname } = req.query;
    
    let search = {};
    if (state) {
      search = {
        'address.state': { $regex: state, $options: 'i' } ,
        //location: { $near: [log,lat]}
      }
    }
    let temp;
    if (first) {
      //find the first warehouse by token => location
      const token = req.headers.authorization.replace(/Bearer /gi, '');
      const decode = jwt.decode(token, {
        complete: true
      });
      //decode.payload.employeeId
      temp = await Warehouse.findOne({ employees: decode.payload.employeeId });
      
    }
    if (whname) {
      //find warehouse by whname
      temp = await Warehouse.findOne({ name: whname });
    }
    if (temp) {
      search['location'] = { $near: temp.location };
    }
    //console.log(search);
    const result = await Warehouse.find(search).limit(1);
    return [temp,result[0]]; //from WH, to WH
  } catch (err) {
    return { status: 500, error: err.message };
  }
}