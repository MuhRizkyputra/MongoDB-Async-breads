var express = require('express');
var router = express.Router();

module.exports = function (db) {

router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/todos', function(req, res, next) {
  res.render('todoslist');
});
return router;
}