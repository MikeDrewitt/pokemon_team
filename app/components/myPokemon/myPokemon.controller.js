(function(angular) {
  function MyPokemonController() {

    var ctrl = this;
    ctrl.live_pokemon = null;                 // used to show the currently being edited mon'

    // A flag telling us if we have any pkmns.
    ctrl.checkPokemonView = function() {
      console.log('switch')
      ctrl.noPokemon = !(ctrl.team.pokemon.length < 1);
    }

    ctrl.removeFromTeam = function(pokemon) {
      let current_index = pokemon.index;
      ctrl.team.pokemon.splice(current_index, 1);

      // remove removed pokemons types from count of type object
      for (let j = 0; j < pokemon.types.length; j++) {
        let type = pokemon.types[j].type.name;
        // console.log('ctrl.team.types', ctrl.team.types[type]);

        if (ctrl.team.types[type].count === 1) delete ctrl.team.types[type];
        else {
          ctrl.team.types[type] = {
            ...ctrl.team.types[type],
            count: ctrl.team.types[type].count - 1
          };
        }
      }

    };

    // moves pokemons placement on the team up and down.
    ctrl.indexUp = function(pokemon) {
      try {
        let current_index = pokemon.index;
        if (current_index == 0) return;
        let temp = ctrl.team.pokemon[current_index - 1];

        ctrl.team.pokemon[current_index - 1] = {...pokemon, index: current_index - 1};
        ctrl.team.pokemon[current_index] = {...temp, index: current_index};

        // console.log(ctrl.team.pokemon);
      } catch (err) {}
    };
    ctrl.indexDown = function(pokemon) {``
      try {
        let current_index = pokemon.index;
        let temp = ctrl.team.pokemon[current_index + 1];
        if (current_index === 5 || temp.name === undefined) return;

        ctrl.team.pokemon[current_index + 1] = {...pokemon, index: current_index + 1};
        ctrl.team.pokemon[current_index] = {...temp, index: current_index};

        // console.log(ctrl.team.pokemon);
      } catch (err) {}
    };

    // shows a small amout of details of a single pokemon
    ctrl.viewPokemon = function(pokemon) {
      ctrl.live_pokemon = pokemon;
    };
    ctrl.closePokemon = function() {
      ctrl.live_pokemon = null;
    };

};

  angular.module('Pokedex').component('myPokemon', {
    templateUrl: './components/myPokemon/myPokemon.tpl.html',
    controller: MyPokemonController,
    bindings: {
      team: '=',
    }
  });
})(window.angular);
