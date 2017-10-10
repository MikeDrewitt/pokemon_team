(function() {
  angular
    .module('pokedex.config', ['ui.router', 'ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .constant('urlConstant', { baseUrl: 'http://localhost:8080' })
    .config(function($urlRouterProvider, $stateProvider, $locationProvider) {
      $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/components/container/container.tpl.html',
        controller: 'ContainerController'
      })
      $urlRouterProvider.otherwise('/');
  });

  angular
    .module('Pokedex')
    .run(run);
    run.$inject = ['$rootScope', '$location'];

    function run($rootScope, $locatiom) { /* On load here. */ }
})();
