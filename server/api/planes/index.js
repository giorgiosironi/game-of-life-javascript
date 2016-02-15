'use strict';

import express from 'express';
import {list, statistics, show, create} from './planes.controller';

var router = express.Router();

router.get('/', list);
router.get('/statistics', statistics);
router.get('/:name', show);
router.put('/:name', create);
router.get('/:name/generation/:index', show);

module.exports = router;
