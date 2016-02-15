'use strict';

var express = require('express');
var controller = require('./planes.controller');

var router = express.Router();

router.get('/', controller.list);
router.get('/statistics', controller.statistics);
router.get('/:name', controller.show);
router.put('/:name', controller.create);
router.get('/:name/generation/:index', controller.show);

module.exports = router;
