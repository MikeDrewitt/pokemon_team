(function() {
    angular
        .module('Pokedex',
          [
            'pokedex.config',
            'container.module',
            'livePokemon.module',
            'ngAnimate',
            'ngSanitize',
            'ui.bootstrap'
        ]).controller('mainCtrl', function($rootScope, $state) {
            console.log("Starting");
        })
})();
