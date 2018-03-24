var angular = require('angular');

var hello = require('./app/hello');

var homeModule = require('./app/home/index');
var coreServices = require('./app/services/coreServices');

require('angular-ui-bootstrap');
require('angular-ui-router');
var routesConfig = require('./routes');

require('./index.css');

var app = 'app';
module.exports = app;

angular
  .module(app, ['ui.router', 'ui.bootstrap', homeModule, coreServices])
  .config(routesConfig)
  .component('app', hello);
