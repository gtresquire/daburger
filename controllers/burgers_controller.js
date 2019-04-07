var express = require('express');
var router = express.Router();

var burger = require('../models/burger');

router.get('/', (req, res) => 
  burger.all(result => {
    var hbsObj = {burgers: result};
    res.render('index', hbsObj);
  })
);

router.post('/api/burgers', (req, res) => {
  var cols = ['name'];
  var vals = [req.body.name];

  burger.create(cols, vals, result => {
    console.log('Created "' + req.body.name 
                + '" for id = ' + result.insertId);
    res.json({id: result.insertId});
  });
});

router.put('/api/burgers/:id', (req, res) => {
  var objColVals = {devoured: req.body.devoured};
  var condition = 'id = ' + req.params.id;

  console.log('Changing state for id = ' 
              + req.params.id + ' to ' + req.body.devoured);

  burger.update(objColVals, condition, result => 
    result.changedRows == 0 ? res.status(404).end()
                            : res.status(200).end()
  );
});

module.exports = router;
