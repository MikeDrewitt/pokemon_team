(function(angular) {
  'use strict';

  function LivePokemonController($scope) {
    var ctrl = this;

    ctrl.testing = function() {
      console.log('this was a click action');
    };
  };

  angular
    .module('livePokemon.controller')
    .controller('LivePokemonController', LivePokemonController);
}) (window.angular);
