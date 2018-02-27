var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET vender libros. */
router.get('/vender-libro', function(req, res, next) {
  res.render('vender_libro');
});

module.exports = router;
