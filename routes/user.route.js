var express = require('express');
var router = express.Router();
var controller  = require('../controllers/user.controller');

router.get('/submit',controller.submit );
router.get('/info', controller.info);

module.exports = router;