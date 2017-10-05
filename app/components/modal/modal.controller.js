(function(angular) {
  'use strict';

  function ModalController($http) {
    var ctrl = this;

    ctrl.url = 'https://pokeapi.co/api/v2/pokemon/';
    ctrl.results = {};

    console.log('ctrl', ctrl);

    ctrl.getDetails = function() {
      // console.log(ctrl.url);
      $http({
        method: 'GET',
        url: ctrl.url + ctrl.searchValue
      }).then(function successCallback(response) {
        // $scope.team.push(response);
        ctrl.results = response;
      }, function errorCallback(response) {
        alert(ctrl.searchValue + " is not a pokemon!");
      })
    };

    /*
     * normally you wouldn't want to alter the prop directly, nor would angular
     * allow it to happen. However because they reference the same object we just
     * update the reference
     */
    ctrl.updatePoke = function() {
      ctrl.pokemon = ctrl.results;
      console.log(ctrl.pokemon);
    };

    ctrl.clearPoke = function() {
      ctrl.pokemon = {};
      ctrl.results = {};
      ctrl.searchVale = {};
    };
  }

  angular.module('GetPokemon').component('modal', {
    templateUrl: './components/modal/modal.tpl.html',
    controller: ModalController,
    bindings: {
      pokedex: '<',
      pokemon: '<',
    }
  });
})(window.angular);
