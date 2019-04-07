var connection = require('./connection');

var getPlaceholders = vals => vals.map(() => '?').toString();

var convertObjToSql = objColVals =>
  Object.keys(objColVals).map(key => key + '=' + objColVals[key]).toString();

var orm = {
  all: 
    (table, cb) => {
      var strQuery = 'SELECT * FROM ' + table + ' ORDER BY id';
      connection.query(strQuery, (err, result) => 
        err ? console.error(err) : cb(result)
      );
    },
  create:
    (table, cols, vals, cb) => {
      var strQuery = 'INSERT INTO ' + table
                   + ' (' + cols.toString() + ') '
                   + 'VALUES (' + getPlaceholders(vals) + ')';
      connection.query(strQuery, vals, (err, result) => 
        err ? console.error(err) : cb(result)
      );
    },
  update:
    (table, objColVals, condition, cb) => {
      var strQuery = 'UPDATE ' + table
                   + ' SET ' + convertObjToSql(objColVals)
                   + ' WHERE ' + condition;
      connection.query(strQuery, (err, result) => 
        err ? console.error(err) : cb(result)
      );
    }
};

module.exports = orm;
