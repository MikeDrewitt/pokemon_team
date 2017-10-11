(function(angular) {
  function TeamDataController() {
    var ctrl = this;

    ctrl.half_damage_to = [];                         // list of stuff that we have weak atk against
    ctrl.half_damage_from = [];                       // list of stuff that we have weak def against
    ctrl.double_damage_to = [];                       // list of stuff that we have strong atk against
    ctrl.double_damage_from = [];                     // list of stuff that we have weak def against

    ctrl.showStrengths = true;                        // default showing bool
    ctrl.showWeaknesses = true;                       // default showing bool
    ctrl.showData = true;                            // true for averge view false for sum

    ctrl.sumStats = new Stats(0, 0, 0, 0, 0, 0);      // zeros all stats for recalculation && init
    ctrl.averageStats = new Stats(0, 0, 0, 0, 0, 0);  // ^^^^

    ctrl.toggleStrengths = function() { ctrl.showStrengths = !ctrl.showStrengths };
    ctrl.toggleWeaknesses = function() { ctrl.showWeaknesses = !ctrl.showWeaknesses };
    ctrl.toggleData = function() { ctrl.showData = !ctrl.showData };

    /*
      @params -
        damage_field: the name of the subobjest in the API that refers to the type of damage
                      modifyer we want to access. ie: half_damage_to, double_damage_from, etc.

      @returns - an array of stats modifyers and counts for how often the appear for the team.
    */
    ctrl.findDamageInfo = function(damage_field) {
      let typeStatsList = [];
      let running_data = {};

      for (let type in ctrl.team.types) {
        if (ctrl.team.types[type].api === null) continue;
        for (let j = 0; j < ctrl.team.types[type].api.damage_relations[damage_field].length; j++) {
          let subtype = ctrl.team.types[type].api.damage_relations[damage_field][j].name;

          // if we are not counting that subtype then set to 1 else inc.
          if (running_data[subtype] === undefined) running_data[subtype] = 1;
          else running_data[subtype] += 1;
        }
      }
      for (let key in running_data) {
        typeStatsList.push({ name: key, count: running_data[key] });
      }
      return typeStatsList;
    };

    // calulates and populates the respective stats objects
    ctrl.mathStats = function() {
      let running_stats = [0, 0, 0, 0, 0, 0];

      for (let i = 0; i < ctrl.team.pokemon.length; i++) {
        // console.log('speed', ctrl.team.pokemon[i].stats[0]);
        if (ctrl.team.pokemon[i].stats[0].base_stat === undefined) continue;

        for (let j = 0; j < ctrl.team.pokemon[i].stats.length; j++) {
          running_stats[j] += ctrl.team.pokemon[i].stats[j].base_stat;
        }
      }

      // This is not the best way to do this, but I'm tierd. Might come back and make this more clean.
      ctrl.sumStats['speed'] = running_stats[0];
      ctrl.sumStats['sp_atk'] = running_stats[1];
      ctrl.sumStats['sp_def'] = running_stats[2];
      ctrl.sumStats['atk'] = running_stats[2];
      ctrl.sumStats['def'] = running_stats[3];
      ctrl.sumStats['hp'] = running_stats[5];

      ctrl.averageStats['speed'] = Math.round(running_stats[0] / ctrl.team.pokemon.length);
      ctrl.averageStats['sp_atk'] = Math.round(running_stats[1] / ctrl.team.pokemon.length);
      ctrl.averageStats['sp_def'] = Math.round(running_stats[2] / ctrl.team.pokemon.length);
      ctrl.averageStats['atk'] = Math.round(running_stats[3] / ctrl.team.pokemon.length);
      ctrl.averageStats['def'] = Math.round(running_stats[4] / ctrl.team.pokemon.length);
      ctrl.averageStats['hp'] = Math.round(running_stats[5] / ctrl.team.pokemon.length);
    }

    var previousType = undefined;
    var previousPokemon = undefined;
    this.$onInit = () => {
      previousTypes = angular.copy(this.team.type);
      previousTeam = angular.copy(this.team.pokemon);
    };
    this.$doCheck = () => {
      if (!angular.equals(this.team.types, previousTypes)) {
        ctrl.half_damage_to = ctrl.findDamageInfo('half_damage_to');
        ctrl.half_damage_from = ctrl.findDamageInfo('half_damage_from');
        ctrl.double_damage_to = ctrl.findDamageInfo('double_damage_to');
        ctrl.double_damage_from = ctrl.findDamageInfo('double_damage_from');

        previousTypes = angular.copy(this.team.types);
      }

      if (!angular.equals(this.team, previousTeam)) {
        ctrl.mathStats();
        previousTeam = angular.copy(this.team);
      }
    };
  };

  function Stats(speed, sp_atk, sp_def, atk, def, hp) {
    this.speed = speed;
    this.sp_atk = sp_atk;
    this.sp_def = sp_def;
    this.atk = atk;
    this.def = def;
    this.hp = hp;
  };

  angular.module('Pokedex').component('teamData', {
    templateUrl: './components/teamData/teamData.tpl.html',
    controller: TeamDataController,
    bindings: {
      team: '<'
    }
  }).controller('TeamDataController', TeamDataController);
})(window.angular);
