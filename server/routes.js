/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';
import co from 'co';

export default function(app) {
  // Insert routes below
  app.use('/api/planes', require('./api/planes'));
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  app.route('/error')
   .get(function(req, res, next) {
     co(function*() {
       yield 42;
       throw new TypeError("Custom exception for testing purposes");
     })
     .catch(next);
   });

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
