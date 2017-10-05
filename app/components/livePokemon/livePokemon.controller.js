(function(angular) {
  'use strict';

function LivePokemonController() {
  var ctrl = this;

  console.log(ctrl);


};

angular.module('GetPokemon').component('livePokemon', {
  templateUrl: './components/livePokemon/livePokemon.tpl.html',
  contorller: LivePokemonController,
  bindings: {
    pokemon: '='
  }
});
})(window.angular);
