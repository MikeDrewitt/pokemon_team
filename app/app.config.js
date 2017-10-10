(function() {
  angular
    .module('pokedex.config', ['ui.router', 'ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .constant('urlConstant', { baseUrl: 'http://localhost:8080' })
    .config(function($urlRouterProvider, $stateProvider, $locationProvider) {
      $stateProvider
      .state('my_team', {
        url: '/',
        templateUrl: '/components/container/container.tpl.html',
        controller: 'ContainerController'
      })
      .state('pokemon', {
        url: '/pokemon?pokemon',
        templateUrl: '/components/pokemonData/pokemonData.tpl.html',
        controller: 'PokemonDataController'
      })
      $urlRouterProvider.otherwise('/');
  });

  angular
    .module('Pokedex')
    .run(run);
    run.$inject = ['$rootScope', '$location'];

    function run($rootScope, $locatiom) { /* On load here. */ }
})();
