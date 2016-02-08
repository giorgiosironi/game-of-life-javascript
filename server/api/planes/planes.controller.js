'use strict';

import _ from 'lodash';
import Planes from './planes.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

export function show(req, res) {
  var name = req.params.name;
  var generationIndex = (typeof req.params.index === "undefined") ? 0 : req.params.index;
  var plane = Planes.findByName(name, generationIndex);
  respondWithResult(res, 200)(plane);
  /*
  Planes.findByIdAsync(req.params.name)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
    */
}

