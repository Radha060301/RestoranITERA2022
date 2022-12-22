var express = require('express');
var router = express.Router();

var menuController = require('../controllers/menuController');
var orderController = require('../controllers/orderController');
var ratingController = require('../controllers/ratingController');

router.get('/', function(req, res, next) {
  res.status(200).json({
    title: "Syran Resto"
  });
});

router.get('/menu', menuController.getMenu);
router.get('/menu/:uid', menuController.getSpecMenu);
router.post('/menu', menuController.insertMenu);
router.put('/menu/:uid', menuController.updateMenu);
router.delete('/menu/:uid/:foto', menuController.deleteMenu);

router.get('/total', menuController.getTotalMenu);

router.get('/order', orderController.getOrder);
router.get('/order/:uid', orderController.getSpecOrder);
router.post('/order', orderController.sendOrder);

router.get('/report', orderController.reporter);
router.post('/report', orderController.assignOrder);

router.get('/feedback', ratingController.getFeedback);
router.post('/feedback', ratingController.sendFeedback);

module.exports = router;