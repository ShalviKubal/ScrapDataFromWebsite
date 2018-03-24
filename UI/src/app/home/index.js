/*eslint-disable */
var homeComponent = require('./home-component.js');
var homeModule = 'homeModule';

angular.module(homeModule, [])
        .component('home', homeComponent);

module.exports = homeModule;