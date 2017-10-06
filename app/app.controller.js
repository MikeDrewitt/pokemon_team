var Pokedex = angular.module('Pokedex', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
Pokedex.controller('Pokedex', function($scope, $http) {

  $scope.url = 'https://pokeapi.co/api/v1/pokedex/';        // used for v1 of api
  $scope.url2 = 'https://pokeapi.co/api/v2/pokemon/';       // used for v2 of api

  // start with no pokes - probably not the best way to do this, would normally ping
  // an account info/ game info for a user. I don't feel like setting up users.
  $scope.searchValue = null;                  // initialize the state of the text box.
  $scope.results = null;                      // initialize results.
  $scope.live_pokemon = null;                 // used to show the currently being edited mon'
  $scope.team = {pokemon: [], types: {}};     // team of pokemon (should never be > 6)
  $scope.pokedex = [];                        // populated from the API as to always be up to date.
  // Doing it this way so it's easier to plug into the api.
  $scope.generations = ['generation-i', 'generatoin-ii', 'generation-iii', 'generation-iv', 'generation-v', 'generation-vi'];
  $scope.generation = null;

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
  $scope.closeSearch = function() { $scope.results = null; }

  $scope.addToTeam = function() {
    if ($scope.team.pokemon.length < 6) {
      $scope.team.pokemon.push({...$scope.results, index: $scope.team.pokemon.length, moves: emptyMovePool});

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

  $scope.removePokemon = function(pokemon) {
    let current_index = pokemon.index;
    $scope.team.pokemon.splice(current_index, 1);

        
  };

  $scope.viewPokemon = function(pokemon) {
      $scope.live_pokemon = pokemon;
  };
  $scope.closePokemon = function(){
    $scope.live_pokemon = null;
  };

  $scope.teamTyping = function(team) {
    types = {};
    for (let i = 0; i < $scope.team.pokemon.length; i++) {
      let pkmn = $scope.team.pokemon[i];
      // console.log('pkmn', pkmn);
      for (let j = 0; j < pkmn.data.types.length; j++) {
        let type = pkmn.data.types[j].type.name;
        // console.log('types', types[type]);

        if (types[type] === undefined) types[type] = {...pkmn.data.types[j].type, count: 1};
        else {
          types[type] = {
            ...types[type],
            count: types[type].count + 1
          };
        }
      }
    }
    console.log('types', types);
  };
});

const emptyMovePool = {
  1: {},
  2: {},
  3: {},
  4: {}
};
