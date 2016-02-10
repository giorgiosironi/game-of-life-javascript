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

function planes(req) {
  return new Planes(req.db.collection('planes'));
}

export function list(req, res) {
  var planesList = planes(req).listAll().then(function(planesList) {
    respondWithResult(res, 200)({elements: planesList});
  }, function(err) {
    console.log(err);
    respondWithResult(res, 500)(err);
  });
}

export function show(req, res) {
  var name = req.params.name;
  var generationIndex = (typeof req.params.index === "undefined") ? 0 : req.params.index;
  var plane = planes(req).findByName(name, generationIndex);
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
  var promise = planes(req).create(plane);
  promise.then(function() {
    // TODO: respond with a body? Yes because it contains the _id?
    respondWithResult(res, 201)({});
  }, function() {
    respondWithResult(res, 500)({});
  });
}
