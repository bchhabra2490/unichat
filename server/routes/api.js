var express = require('express');
var router = express.Router();

var intentController = require('../controllers/intentController');

router.post('/', intentController.addIntent);
router.get('/',intentController.getIntent);
module.exports = router;
