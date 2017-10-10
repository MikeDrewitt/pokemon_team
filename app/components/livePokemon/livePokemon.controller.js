(function(angular) {
  'use strict';

  function LivePokemonController($scope) {
    var ctrl = this;
  };

  angular.module('Pokedex').component('livePokemon', {
    templateUrl: './components/livePokemon/livePokemon.tpl.html',
    controller: LivePokemonController,
    bindings: {
      pokemon: '=',
      hasMoves: '<'
    }
  }).controller('LivePokemonController', LivePokemonController);
})(window.angular);
