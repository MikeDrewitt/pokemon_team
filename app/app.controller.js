var GetPokemon = angular.module('GetPokemon', []);
GetPokemon.controller('GetPokemon', function($scope, $http) {

  $scope.url = 'https://pokeapi.co/api/v1/pokedex/';
  $scope.url2 = 'https://pokeapi.co/api/v2/pokemon/';

  // start with no pokes - probably not the best way to do this, would normally ping
  // an account info/ game info for a user. I don't feel like setting up users.
  $scope.team = [];
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
  };

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

  $scope.updateTeam = function() {
    if ($scope.team.length < 6) {
      $scope.team.push({...$scope.results, index: $scope.team.length});

      $scope.searchValue = '';
      $scope.results = null;
    }
    else {
      alert('Too many pokemans! Remove one before adding another!');
    }
  };

  $scope.indexUp = function(pokemon) {
    try {
      let current_index = pokemon.index;
      if (current_index == 0) return;
      let temp = $scope.team[current_index - 1];

      $scope.team[current_index - 1] = {...pokemon, index: current_index - 1};
      $scope.team[current_index] = {...temp, index: current_index};

      // console.log($scope.team);
    } catch (err) {}
  };

  $scope.indexDown = function(pokemon) {
    try {
      let current_index = pokemon.index;
      if (current_index == 5) return;
      let temp = $scope.team[current_index + 1];

      $scope.team[current_index + 1] = {...pokemon, index: current_index + 1};
      $scope.team[current_index] = {...temp, index: current_index};

      // console.log($scope.team);
    } catch (err) {}
  };

  $scope.removePokemon = function(pokemon) {
    let current_index = pokemon.index;
    $scope.team.splice(current_index, 1);
  }
});
