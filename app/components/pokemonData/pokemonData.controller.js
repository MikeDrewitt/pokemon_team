(function(angular) {
  function PokemonDataController($scope, $stateParams, $http) {
      var ctrl = this;

      let url = 'https://pokeapi.co/api/v1/pokedex/';        // used for v1 of api
      let url2 = 'https://pokeapi.co/api/v2/pokemon/';       // used for v2 of api

      $scope.pokemon = $stateParams.pokemon;
      $scope.loading = true;           // flag whether we're currently loading

      $scope.pokedex = [];              // array of all pokemon names as

      this.$onInit = function() {
        if ($scope.pokemon === undefined) {
          $http({method: 'GET', url: url})
          .then(function(response) {
            // populates the pokedex with just the names of pokes. Used for searching
            for (let i = 0; i < response.data.objects[0].pokemon.length; i++) {
              let pkmn = response.data.objects[0].pokemon[i];
              $scope.pokedex.push(pkmn.name);
            }
          }, function(response) {
            $scope.all_characters = response.all_characters || 'Request failed';
          });
          $scope.loading = false;
        }
        else {
          $http({
            method: 'GET',
            url: url2 + $scope.pokemon
          }).then(function successCallback(response) {
            $scope.pkmn_result = response.data;
          }, function errorCallback(response) {
            alert('Something happened between here and the API, please reload.');
          })
          $scope.loading = false;
        }
      };
};

  angular.module('Pokedex').component('pokemonData', {
    bindings: { },
    templateUrl: './components/pokemonSearch/pokemonSearch.tpl.html',
    controller: PokemonDataController,
    $routeConfig: [

    ]
  }).controller('PokemonDataController', PokemonDataController);
})(window.angular);
