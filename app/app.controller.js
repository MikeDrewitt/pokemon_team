var GetPokemon = angular.module('GetPokemon', []);
GetPokemon.controller('GetPokemon', function($scope, $http) {

  console.log($scope);

  $scope.url = 'https://pokeapi.co/api/v1/pokedex/';

  // start with no pokes - probably not the best way to do this, would normally ping
  // an account info/ game info for a user. I don't feel like setting up users.
  $scope.team  = [{name: 'bob'}, {}, {}, {}, {}, {}];
  // populated from the API as to always be up to date.
  $scope.pokedex = [];

  // Runs on page load to populate $pokedex with a list of pokemon.
  $http({method: 'GET', url: $scope.url}).
  then(function(response) {
    // populates the pokedex with just the names of pokes. Used for searching
    $scope.status = response.status;
    for (let i = 0; i < response.data.objects[0].pokemon.length; i++) {
      let pkmn = response.data.objects[0].pokemon[i];
      $scope.pokedex.push(pkmn.name);
    }
  }, function(response) {
    $scope.all_characters = response.all_characters || 'Request failed';
    $scope.status = response.status;
  });

  $scope.testing = function() {
    console.log($scope.team);
  }
});
