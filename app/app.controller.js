var Pokedex = angular.module('Pokedex', ['ui.router', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);
Pokedex.controller('Pokedex', function($scope, $http) {});
Pokedex.config(function($stateProvider) {
    var state = [
        {
          name: '/',
          templateUrl: './components/container/container.tpl.html',
        },
    ]

    state.forEach(function(state) {
      $stateProvider.state(state);
    });
});

Pokedex.run(function($http, $uiRouter) {
  var Visualizer = window['ui-router-visualizer'].Visualizer;
  $uiRouter.plugin(Visualizer);
  $http.get('/', { cache: true });
});
