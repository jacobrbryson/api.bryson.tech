const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// environment variables
//process.env.NODE_ENV = 'development';
process.env.NODE_ENV = 'production';

// config variables
const config = require('./config/config.js');

app.listen(global.gConfig.node_port, () => {
  console.log(`${global.gConfig.app_name} listening on port ${global.gConfig.node_port}`);
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", global.gConfig.allow_origin); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var resume = require('./app/routes/resume'); //importing route
resume(app); //register the route

var contact = require('./app/routes/contact'); //importing route
contact(app); //register the route