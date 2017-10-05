var GetPokemon = angular.module('GetPokemon', []);
GetPokemon.controller('GetPokemon', function($scope, $http) {

  $scope.url = 'https://pokeapi.co/api/v1/pokedex/';
  $scope.url2 = 'https://pokeapi.co/api/v2/pokemon/';

  // start with no pokes - probably not the best way to do this, would normally ping
  // an account info/ game info for a user. I don't feel like setting up users.
  $scope.team  = [{}, {}, {}, {}, {}, {}];
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

  $scope.results = null;
  $scope.getDetails = function() {
    // console.log(ctrl.url);
    $http({
      method: 'GET',
      url: $scope.url2 + $scope.searchValue
    }).then(function successCallback(response) {
      // $scope.team.push(response);
      $scope.results = response;
      console.log(response);
    }, function errorCallback(response) {
      alert($scope.searchValue + " is not a pokemon!");
    })
  };
});
