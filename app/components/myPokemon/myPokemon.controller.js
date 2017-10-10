(function(angular) {
  function MyPokemonController($scope) {

    $scope.live_pokemon = null;                 // used to show the currently being edited mon'
    console.log('running?');

    // A flag telling us if we have any pkmns.
    $scope.checkPokemonView = function() {
      $scope.noPokemon = !($scope.$ctrl.team.pokemon.length < 1);
    }

    $scope.removeFromTeam = function(pokemon) {
      let current_index = pokemon.index;
      let team = $scope.$ctrl.team;

      team.pokemon.splice(current_index, 1);

      // remove removed pokemons types from count of type object
      for (let j = 0; j < pokemon.types.length; j++) {
        let type = pokemon.types[j].type.name;
        // console.log('team.types', team.types[type]);

        if (team.types[type].count === 1) delete team.types[type];
        else {
          team.types[type] = {
            ...team.types[type],
            count: team.types[type].count - 1
          };
        }
      }
    };

    // moves pokemons placement on the team up and down.
    $scope.indexUp = function(pokemon) {
      let team = $scope.$ctrl.team;
      try {
        let current_index = pokemon.index;
        if (current_index == 0) return;
        let temp = team.pokemon[current_index - 1];

        team.pokemon[current_index - 1] = {...pokemon, index: current_index - 1};
        team.pokemon[current_index] = {...temp, index: current_index};

        // console.log($scope.team.pokemon);
      } catch (err) {}
    };
    $scope.indexDown = function(pokemon) {``
      let team = $scope.$ctrl.team;
      try {
        let current_index = pokemon.index;
        let temp = team.pokemon[current_index + 1];
        if (current_index === 5 || temp.name === undefined) return;

        team.pokemon[current_index + 1] = {...pokemon, index: current_index + 1};
        team.pokemon[current_index] = {...temp, index: current_index};

        // console.log($scope.team.pokemon);
      } catch (err) {}
    };

    // shows a small amout of details of a single pokemon
    $scope.viewPokemon = function(pokemon) {
      $scope.live_pokemon = pokemon;
    };
    $scope.closePokemon = function() {
      $scope.live_pokemon = null;
    };
};

  angular.module('Pokedex').component('myPokemon', {
    templateUrl: './components/myPokemon/myPokemon.tpl.html',
    controller: MyPokemonController,
    bindings: {
      team: '=',
    }
  }).controller('MyPokemonController', MyPokemonController);
})(window.angular);
