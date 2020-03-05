'use strict';
module.exports = function(app) {
  var contactController = require('../controller/contact');

  app.route('/contact')
    .post(contactController.send_email)
    .get(contactController.get_token);
    
};