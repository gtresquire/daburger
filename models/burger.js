var orm = require('../config/orm');

const TABLE_NAME = 'burgers';

var burger = {
  all: 
    cb => orm.all(TABLE_NAME, res => cb(res)),
  create: 
    (cols, vals, cb) => orm.create(TABLE_NAME, cols, vals, res => cb(res)),
  update: 
    (objColVals, condition, cb) => 
      orm.update(TABLE_NAME, objColVals, condition, res => cb(res))
};

module.exports = burger;
