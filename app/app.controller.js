var GetPokemon = angular.module('GetPokemon', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
GetPokemon.controller('GetPokemon', function($scope, $http) {

  $scope.url = 'https://pokeapi.co/api/v1/pokedex/';        // used for v1 of api
  $scope.url2 = 'https://pokeapi.co/api/v2/pokemon/';       // used for v2 of api

  // start with no pokes - probably not the best way to do this, would normally ping
  // an account info/ game info for a user. I don't feel like setting up users.
  $scope.searchValue = null;      // initialize the state of the text box.
  $scope.results = null;          // initialize results.
  $scope.live_pokemon = null;     // used to show the currently being edited mon'
  $scope.team = [];               // team of pokemon (should never be > 6)
  $scope.pokedex = [];            // populated from the API as to always be up to date.

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

  $scope.getDetails = function() {
    // console.log(ctrl.url);
    $http({
      method: 'GET',
      url: $scope.url2 + $scope.searchValue
    }).then(function successCallback(response) {
      $scope.results = response;
      // console.log(response);
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
      let temp = $scope.team[current_index + 1];
      if (current_index === 5 || temp.data.name === undefined) return;

      $scope.team[current_index + 1] = {...pokemon, index: current_index + 1};
      $scope.team[current_index] = {...temp, index: current_index};

      // console.log($scope.team);
    } catch (err) {}
  };

  $scope.removePokemon = function(pokemon) {
    let current_index = pokemon.index;
    $scope.team.splice(current_index, 1);
  }

  $scope.viewPokemon = function(pokemon) {
      $scope.live_pokemon = pokemon;
  }
  $scope.closePokemon = function(){
    $scope.live_pokemon = null;
  }
});
