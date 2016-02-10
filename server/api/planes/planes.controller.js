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

export function list(req, res) {
  var planesList = (new Planes()).listAll();
  respondWithResult(res, 200)({elements: planesList});
}

export function show(req, res) {
  var name = req.params.name;
  var generationIndex = (typeof req.params.index === "undefined") ? 0 : req.params.index;
  var plane = (new Planes()).findByName(name, generationIndex);
  respondWithResult(res, 200)(plane);
}

export function create(req, res) {
  var plane = {};
  Object.assign(
    plane,
    {
      name: req.params.name
    },
    req.body
  );
  var planes = (new Planes(req.db.collection('planes')));
  var promise = planes.create(plane);
  promise.then(function() {
    // TODO: respond with a body? Yes because it contains the _id?
    respondWithResult(res, 201)({});
  }, function() {
    respondWithResult(res, 500)({});
  });
}
