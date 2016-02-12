'use strict';

import _ from 'lodash';
import Planes from './planes.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    } else {
      res.status(404).json(entity);
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
    console.error(err);
    res.status(statusCode).send(err);
  };
}

function planes(req) {
  return new Planes(req.db.collection('planes'));
}

function error(err) {
  console.error(err);
}

export function list(req, res, next) {
  planes(req)
    .listAll()
    .then(function(planesList) {
      respondWithResult(res, 200)({elements: planesList});
    }, handleError(res))
    .catch(next);
}

export function show(req, res, next) {
  var name = req.params.name;
  var generationIndex = (typeof req.params.index === "undefined") ? 0 : req.params.index;
  planes(req)
    .findByName(name, generationIndex)
    .then(function(plane) {
      respondWithResult(res, 200)(plane);
    }, handleError(res))
    .catch(next);
}

export function create(req, res, next) {
  var plane = {};
  Object.assign(
    plane,
    {
      name: req.params.name
    },
    req.body
  );
  planes(req)
    .create(plane)
    .then(function() {
      // TODO: respond with a body? Yes because it contains the _id?
      respondWithResult(res, 201)({});
    }, handleError(res))
    .catch(next);
}
