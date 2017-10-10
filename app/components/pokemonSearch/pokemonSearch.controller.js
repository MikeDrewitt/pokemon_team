(function(angular) {
  function PokemonSearchController($scope, $http) {
      var ctrl = this;

      ctrl.url = 'https://pokeapi.co/api/v1/pokedex/';        // used for v1 of api
      ctrl.url2 = 'https://pokeapi.co/api/v2/pokemon/';       // used for v2 of api

      // start with no pokes - probably not the best way to do this, would normally ping
      // an account info/ game info for a user. I don't feel like setting up users.
      ctrl.searchValue = null;                  // initialize the state of the text box.
      ctrl.searching = false;                   // A bool waiting flag for the user
      ctrl.pkmn_result = null;                  // initialize pkmn_result.
      ctrl.type_result = {};                    // initialize type api return.

      ctrl.pokedex = [];                        // populated from the API as to always be up to date.

      // Runs on focusing search box to populate $pokedex with a list of pokemon.
      ctrl.getAllPokemon = function() {

        // if we already have the list of all pokemon don't do it again
        if (ctrl.pokedex.length !== 0) return;

        $http({method: 'GET', url: ctrl.url}).
        then(function(response) {
          // populates the pokedex with just the names of pokes. Used for searching
          for (let i = 0; i < response.data.objects[0].pokemon.length; i++) {
            let pkmn = response.data.objects[0].pokemon[i];
            ctrl.pokedex.push(pkmn.name);
          }
        }, function(response) {
          ctrl.all_characters = response.all_characters || 'Request failed';
        });
      }

      // Runs the search query for a pokemon
      ctrl.getDetails = function() {
        // console.log(ctrl.url);
        ctrl.searching = true;
        $http({
          method: 'GET',
          url: ctrl.url2 + ctrl.searchValue
        }).then(function successCallback(response) {
          ctrl.pkmn_result = response.data;
          ctrl.searching = false;
          // console.log(response);
        }, function errorCallback(response) {
          ctrl.searchValue = '';
          ctrl.searching = false;
        })
      };
      ctrl.closeSearch = function() { ctrl.pkmn_result = null; }

      ctrl.addToTeam = function(pokemon) {
        // This adds the param poke to the team if there are slots availible.
        $("#myModal").modal("hide");
        if (ctrl.team.pokemon.length < 6) {
          ctrl.team.pokemon.push({...pokemon, index: ctrl.team.pokemon.length, myMoves: new MovePool('', '', '', '')});

          ctrl.searchValue = '';
          ctrl.pkmn_result = null;
        }
        else {
          alert('Too many pokemans! Remove one before adding another!');
          return;
        }

        // This loop adds the types to the type object
        for (let j = 0; j < pokemon.types.length; j++) {
          let type = pokemon.types[j].type.name;
          // console.log('ctrl.team.types', ctrl.team.types[type]);
          if (ctrl.team.types[type] === undefined) {
            ctrl.team.types[type] = {
              ...pokemon.types[j].type,
              api: null,
              count: 1
            };
          }
          else {
            ctrl.team.types[type] = {
              ...ctrl.team.types[type],
              count: ctrl.team.types[type].count + 1
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
          if (ctrl.team.types[type].api === null) {
            $http({method: 'GET', url: url})
            .then(function(response) {
              ctrl.status = response.status;
              ctrl.team.types[type].api = response.data;
            }, function(response) {
              ctrl.all_characters = response.all_characters || 'Request failed';
              ctrl.status = response.status;
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
  }).controller('PokemonSearchController', PokemonSearchController);
})(window.angular);
