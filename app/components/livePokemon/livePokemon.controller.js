(function(angular) {
  'use strict';

  function LivePokemonController($scope) {
    var ctrl = this;

    ctrl.testing = function() {
      console.log('this was a click action');
    };
  };

  angular.module('Pokedex').component('livePokemon', {
    templateUrl: './components/livePokemon/livePokemon.tpl.html',
    controller: LivePokemonController,
    bindings: {
      pokemon: '=',
      hasMoves: '<'
    }
  });
})(window.angular);
