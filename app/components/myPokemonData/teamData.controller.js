(function(angular) {
  function TeamDataController() {
    var ctrl = this;
    ctrl.strengths = null;                            // object of stauff that we are strong against attacking and def
    ctrl.weaknesses = null;                           // object of stuff we're weak against attacking and defending

    ctrl.showStrengths = true;                        // default showing bool
    ctrl.showWeaknesses = true;                       // default showing bool
    ctrl.showData = true;                             // true for averge view false for sum

    ctrl.sumStats = new Stats(0, 0, 0, 0, 0, 0);      // zeros all stats for recalculation && init
    ctrl.averageStats = new Stats(0, 0, 0, 0, 0, 0);  // ^^^^

    ctrl.toggleStrengths = function() { ctrl.showStrengths = !ctrl.showStrengths };
    ctrl.toggleWeaknesses = function() { ctrl.showWeaknesses = !ctrl.showWeaknesses };

    /*
    This function goes through and finds types
    that deal half damage to you, and you deal double damage to.

    It then places them into the strengths object
    */
    ctrl.findStrengths = function(team) {
      ctrl.strengths = {};
      for (let type in ctrl.team.types) {
        // console.log(ctrl.team.types[type].api.damage_relations.half_damage_from); // debug
        if (ctrl.team.types[type].api === null) continue;
        for (let j = 0; j < ctrl.team.types[type].api.damage_relations.half_damage_from.length; j++) {
          let subtype = ctrl.team.types[type].api.damage_relations.half_damage_from[j].name;

          // console.log(ctrl.strengths[subtype]);
          if (ctrl.strengths[subtype] === undefined) ctrl.strengths[subtype] = {name: subtype, count: 1};
          else {
            ctrl.strengths[subtype] = {
              name: subtype,
              count: ctrl.strengths[subtype].count + 1
            }
          }
        }
        if (ctrl.team.types[type].api === null) continue;
        for (let j = 0; j < ctrl.team.types[type].api.damage_relations.double_damage_to.length; j++) {
            let subtype = ctrl.team.types[type].api.damage_relations.double_damage_to[j].name;

            if (ctrl.strengths[subtype] === undefined) ctrl.strengths[subtype] = {name: subtype, count: 1};
            else {
              ctrl.strengths[subtype] = {
                ...ctrl.strengths[subtype],
                count: ctrl.strengths[subtype].count + 1
              }
            }
          }
      }
      // console.log(ctrl.strengths);
      return ctrl.strengths;
    };
    ctrl.findWeaknesses = function(team) {
      ctrl.weaknesses = {};
      for (let type in ctrl.team.types) {
        // console.log('api', ctrl.team.types[type].api); // debug
        if (ctrl.team.types[type].api === null) continue;
        for (let j = 0; j < ctrl.team.types[type].api.damage_relations.half_damage_to.length; j++) {
          let subtype = ctrl.team.types[type].api.damage_relations.half_damage_to[j].name;

          // console.log(ctrl.weaknesses[subtype]);
          if (ctrl.weaknesses[subtype] === undefined) ctrl.weaknesses[subtype] = {name: subtype, count: 1};
          else {
            ctrl.weaknesses[subtype] = {
              name: subtype,
              count: ctrl.weaknesses[subtype].count + 1
            }
          }
        }
        if (ctrl.team.types[type].api === null) continue;
        for (let j = 0; j < ctrl.team.types[type].api.damage_relations.double_damage_from.length; j++) {
            let subtype = ctrl.team.types[type].api.damage_relations.double_damage_from[j].name;

            if (ctrl.weaknesses[subtype] === undefined) ctrl.weaknesses[subtype] = {name: subtype, count: 1};
            else {
              ctrl.weaknesses[subtype] = {
                ...ctrl.weaknesses[subtype],
                count: ctrl.weaknesses[subtype].count + 1
              }
            }
          }
      }
      // console.log(ctrl.weaknesses);
      return ctrl.weaknesses;
    };

    // calulates and populates the respective stats objects
    ctrl.mathStats = function() {

      let running_speed = 0,
          running_sp_atk = 0,
          running_sp_def = 0,
          running_atk = 0,
          running_def = 0,
          running_hp = 0;

      for (let i = 0; i < ctrl.team.pokemon.length; i++) {
        // console.log('speed', ctrl.team.pokemon[i].data.stats[0]);
        if (ctrl.team.pokemon[i].data.stats[0].base_stat === undefined) continue;
        running_speed += ctrl.team.pokemon[i].data.stats[0].base_stat;
        running_sp_atk += ctrl.team.pokemon[i].data.stats[1].base_stat;
        running_sp_def += ctrl.team.pokemon[i].data.stats[2].base_stat;
        running_atk += ctrl.team.pokemon[i].data.stats[3].base_stat;
        running_def += ctrl.team.pokemon[i].data.stats[4].base_stat;
        running_hp += ctrl.team.pokemon[i].data.stats[5].base_stat;
      }

      ctrl.sumStats['speed'] = running_speed;
      ctrl.sumStats['sp_atk'] = running_sp_atk;
      ctrl.sumStats['sp_def'] = running_sp_def;
      ctrl.sumStats['atk'] = running_atk;
      ctrl.sumStats['def'] = running_def;
      ctrl.sumStats['hp'] = running_speed;

      ctrl.averageStats['speed'] = Math.round(running_speed / ctrl.team.pokemon.length);
      ctrl.averageStats['sp_atk'] = Math.round(running_sp_atk / ctrl.team.pokemon.length);
      ctrl.averageStats['sp_def'] = Math.round(running_sp_def / ctrl.team.pokemon.length);
      ctrl.averageStats['atk'] = Math.round(running_atk / ctrl.team.pokemon.length);
      ctrl.averageStats['def'] = Math.round(running_def / ctrl.team.pokemon.length);
      ctrl.averageStats['hp'] = Math.round(running_hp / ctrl.team.pokemon.length);
    }

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
  });
})(window.angular);
