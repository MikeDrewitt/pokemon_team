(function() {

  angular
    .module('Pokedex', ['ui.router', 'ui.bootstrap'])
    .constant('urlConstant', { baseUrl: 'http://localhost:8080' })
    .controller('mainCtrl', function($rootScope, $state) {})
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

  Pace.start();
  window.paceOptions = {
    document: true, // disabled
    eventLag: true,
    restartOnPushState: true,
    restartOnRequestAfter: true,
    ajax: {
        trackMethods: [ 'POST','GET']
    }
  };

})();
