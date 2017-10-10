(function() {
  'use strict';

  angular.module('Pokedex', ['ui.router', 'ngAnimate', 'ngSanitize', 'ui.bootstrap'])
  .config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
  })
})();
