'use strict';
module.exports = function(app) {
  var resumeController = require('../controller/resume');

  app.route('/resume/:UUID')
    .get(resumeController.read_a_resume);

};