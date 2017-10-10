(function(angular) {
  function PokemonDataController($scope, $stateParams, $http) {
      var ctrl = this;

      $scope.url = 'https://pokeapi.co/api/v1/pokedex/';        // used for v1 of api
      $scope.url2 = 'https://pokeapi.co/api/v2/pokemon/';       // used for v2 of api

      $scope.pokemon = $stateParams.pokemon;

      $scope.getDex = true;             // flag whether we should be getting the pokedex
      $scope.getMon = true;             // flag whether or not we should be getting the pokemon
      $scope.loading = true;           // flag whether we're currently loading

      $scope.pokedex = [];              // array of all pokemon names as

      // Runs on focusing search box to populate $pokedex with a list of pokemon.
      $scope.getAllPokemon = function() {
        // if we already have the list of all pokemon don't do it again
        if (!$scope.getDex) return;
        $scope.getDex = false;

        $http({method: 'GET', url: $scope.url})
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
      $scope.getPokemon = function(pokemon) {
        $("#myModal").modal("hide");
        $("#PokemonDetails").modal("hide");
        if (!$scope.getMon) return;
        $scope.getMon = false;
        $http({
          method: 'GET',
          url: $scope.url2 + $scope.pokemon
        }).then(function successCallback(response) {
          $scope.pkmn_result = response.data;
        }, function errorCallback(response) {
          alert('Something happened between here and the API, please reload.');
        })
        $scope.loading = false;
      }
};

  angular.module('Pokedex').component('pokemonData', {
    bindings: { },
    templateUrl: './components/pokemonSearch/pokemonSearch.tpl.html',
    controller: PokemonDataController,
    $routeConfig: [

    ]
  }).controller('PokemonDataController', PokemonDataController);
})(window.angular);
