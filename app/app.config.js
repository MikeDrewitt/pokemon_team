(function() {
  angular
      .module('teddybeartalker.config', [
          'ui.router'
      ])

      .constant('urlConstant', {
        baseUrl: 'http://localhost:8000'
      })


  .config(function($urlRouterProvider, $stateProvider, $locationProvider) {
      //$locationProvider.html5Mode(false);
      $stateProvider
      .state('home', {
          url: '/',
          templateUrl: '/components/components/container.tpl.html',
          controller: 'PokedexController'
      })
      .state('settings', {
          url: '/pokemon/:pokemon',
          templateUrl: '/components/pokemon/pokemonInfo.tpl.html',
          controller: 'PokemonController'
      })
      $urlRouterProvider.otherwise('/');
  });

  /**
   * Run block
   */
  angular
      .module('Pokedex')
      .run(run);
      run.$inject = ['$rootScope', '$location'];

      function run($rootScope, $locatiom) { /* On load here. */ }
})();
