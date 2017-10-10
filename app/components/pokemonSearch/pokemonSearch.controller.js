(function(angular) {
  function PokemonSearchController($scope, $http) {

    console.log($scope)
    console.log($scope.$ctrl)
    console.log($scope.$ctrl.team)

    $scope.url = 'https://pokeapi.co/api/v1/pokedex/';        // used for v1 of api
    $scope.url2 = 'https://pokeapi.co/api/v2/pokemon/';       // used for v2 of api

    // start with no pokes - probably not the best way to do this, would normally ping
    // an account info/ game info for a user. I don't feel like setting up users.
    $scope.searchValue = null;                  // initialize the state of the text box.
    $scope.searching = false;                   // A bool waiting flag for the user
    $scope.pkmn_result = null;                  // initialize pkmn_result.
    $scope.type_result = {};                    // initialize type api return.

    $scope.pokedex = [];                        // populated from the API as to always be up to date.

    // Runs on focusing search box to populate $pokedex with a list of pokemon.
    $scope.getAllPokemon = function() {

      // if we already have the list of all pokemon don't do it again
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
      // console.log($scope.url);
      $scope.searching = true;
      $http({
        method: 'GET',
        url: $scope.url2 + $scope.searchValue
      }).then(function successCallback(response) {
        $scope.pkmn_result = response.data;
        $scope.searching = false;
        // console.log(response);
      }, function errorCallback(response) {
        $scope.searchValue = '';
        $scope.searching = false;
      })
    };
    $scope.closeSearch = function() { $scope.pkmn_result = null; }

    $scope.addToTeam = function(pokemon) {
      // This adds the param poke to the team if there are slots availible.
      $("#myModal").modal("hide");
      if (this.team.pokemon.length < 6) {
        $scope.team.pokemon.push({...pokemon, index: $scope.team.pokemon.length, myMoves: new MovePool('', '', '', '')});

        $scope.searchValue = '';
        $scope.pkmn_result = null;
      }
      else {
        alert('Too many pokemans! Remove one before adding another!');
        return;
      }

      // This loop adds the types to the type object
      for (let j = 0; j < pokemon.types.length; j++) {
        let type = pokemon.types[j].type.name;
        // console.log('$scope.team.types', $scope.team.types[type]);
        if ($scope.team.types[type] === undefined) {
          $scope.team.types[type] = {
            ...pokemon.types[j].type,
            api: null,
            count: 1
          };
        }
        else {
          $scope.team.types[type] = {
            ...$scope.team.types[type],
            count: $scope.team.types[type].count + 1
          };
        }
      }

      /*
      Let the above loop finish before waiting to add the type info
      I think that there is a better place to get this info as to not hang the func.
      I don't think it's as bad as I think it is because it only runs once per type
      and one poke only has at most 2 types.
      */
      for (let j = 0; j < pokemon.types.length; j++) {
        let type = pokemon.types[j].type.name;
        let url = pokemon.types[j].type.url;

        // if we've never gotten the type sub data
        if ($scope.team.types[type].api === null) {
          $http({method: 'GET', url: url}).
          then(function(response) {
            $scope.status = response.status;
            $scope.team.types[type].api = response.data;
          }, function(response) {
            $scope.all_characters = response.all_characters || 'Request failed';
            $scope.status = response.status;
          });
        };
      }
    }
};

function MovePool(one, two, three, four) {
  this.one = one;
  this.two = two;
  this.three = three;
  this.four = four;
};

  angular.module('Pokedex').component('pokemonSearch', {
    bindings: { 'team': '=' },
    templateUrl: './components/pokemonSearch/pokemonSearch.tpl.html',
    controller: PokemonSearchController,
    conrtollerAs: 'PokemonSearchController',
  }).controller('PokemonSearchController', PokemonSearchController);
})(window.angular);
