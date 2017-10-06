var Pokedex = angular.module('Pokedex', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
Pokedex.controller('Pokedex', function($scope, $http) {

  $scope.url = 'https://pokeapi.co/api/v1/pokedex/';        // used for v1 of api
  $scope.url2 = 'https://pokeapi.co/api/v2/pokemon/';       // used for v2 of api

  // start with no pokes - probably not the best way to do this, would normally ping
  // an account info/ game info for a user. I don't feel like setting up users.
  $scope.searchValue = null;                  // initialize the state of the text box.
  $scope.pkmn_result = null;                  // initialize pkmn_result.
  $scope.live_pokemon = null;                 // used to show the currently being edited mon'
  $scope.team = {pokemon: [], types: {}};     // team of pokemon (should never be > 6)
  $scope.pokedex = [];                        // populated from the API as to always be up to date.
  // Doing it this way so it's easier to plug into the api.
  $scope.generations = ['generation-i', 'generatoin-ii', 'generation-iii', 'generation-iv', 'generation-v', 'generation-vi'];
  $scope.generation = null;                   // the actual value of the drop down.

  // Runs on focusing search box to populate $pokedex with a list of pokemon.
  $scope.getAllPokemon = function() {

    if ($scope.pokedex.length !== 0) return;

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
  }

  // Runs the search query for a pokemon
  $scope.getDetails = function() {
    // console.log(ctrl.url);
    $http({
      method: 'GET',
      url: $scope.url2 + $scope.searchValue
    }).then(function successCallback(response) {
      $scope.pkmn_result = response;
      // console.log(response);
    }, function errorCallback(response) {
      alert($scope.searchValue + " is not a pokemon!");
    })
  };
  $scope.closeSearch = function() { $scope.pkmn_result = null; }

  $scope.addToTeam = function(pokemon) {
    // This adds the param poke to the team if there are slots availible.
    if ($scope.team.pokemon.length < 6) {
      $scope.team.pokemon.push({...pokemon, index: $scope.team.pokemon.length, moves: emptyMovePool});

      $scope.searchValue = '';
      $scope.pkmn_result = null;
    }
    else {
      alert('Too many pokemans! Remove one before adding another!');
      return;
    }

    // This loop adds the typs to the type object
    for (let j = 0; j < pokemon.data.types.length; j++) {
      let type = pokemon.data.types[j].type.name;
      // console.log('$scope.team.types', $scope.team.types[type]);

      if ($scope.team.types[type] === undefined) $scope.team.types[type] = {...pokemon.data.types[j].type, count: 1};
      else {
        $scope.team.types[type] = {
          ...$scope.team.types[type],
          count: $scope.team.types[type].count + 1
        };
      }
    }
  };
  $scope.removeFromTeam = function(pokemon) {
    let current_index = pokemon.index;
    $scope.team.pokemon.splice(current_index, 1);

    // remove removed pokemons types from count of type object
    for (let j = 0; j < pokemon.data.types.length; j++) {
      let type = pokemon.data.types[j].type.name;
      // console.log('$scope.team.types', $scope.team.types[type]);

      if ($scope.team.types[type].count === 1) delete $scope.team.types[type];
      else {
        $scope.team.types[type] = {
          ...$scope.team.types[type],
          count: $scope.team.types[type].count - 1
        };
      }
    }

  };

  // moves pokemons placement on the team up and down.
  $scope.indexUp = function(pokemon) {
    try {
      let current_index = pokemon.index;
      if (current_index == 0) return;
      let temp = $scope.team.pokemon[current_index - 1];

      $scope.team.pokemon[current_index - 1] = {...pokemon, index: current_index - 1};
      $scope.team.pokemon[current_index] = {...temp, index: current_index};

      // console.log($scope.team.pokemon);
    } catch (err) {}
  };
  $scope.indexDown = function(pokemon) {
    try {
      let current_index = pokemon.index;
      let temp = $scope.team.pokemon[current_index + 1];
      if (current_index === 5 || temp.data.name === undefined) return;

      $scope.team.pokemon[current_index + 1] = {...pokemon, index: current_index + 1};
      $scope.team.pokemon[current_index] = {...temp, index: current_index};

      // console.log($scope.team.pokemon);
    } catch (err) {}
  };

  // shows a small amout of details of a single pokemon
  $scope.viewPokemon = function(pokemon) {
      $scope.live_pokemon = pokemon;
  };
  $scope.closePokemon = function(){
    $scope.live_pokemon = null;
  };
});

const emptyMovePool = {
  1: {},
  2: {},
  3: {},
  4: {}
};
