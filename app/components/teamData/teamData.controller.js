(function(angular) {
  function TeamDataController($scope, $http) {
    var ctrl = this;
    ctrl.strengths = {};
    ctrl.weaknesses = {};
    ctrl.showStrengths = true;
    ctrl.showWeaknesses = true;

    ctrl.toggleStrengths = function() { ctrl.showStrengths = !ctrl.showStrengths };
    ctrl.toggleWeaknesses = function() { ctrl.showWeaknesses = !ctrl.showWeaknesses };

    ctrl.$onChanges = function (changes) {
      console.log(changes)
      if (changes.team) {
        console.log('somethinghaschange.thankgod');
      }
    };

    /*
    This function goes through and finds types
    that deal half damage to you, and you deal double damage to.

    It then places them into the strengths object
    */
    ctrl.findStrengths = function(team) {
      ctrl.strengths = {};
      for (let type in ctrl.team.types) {
        // console.log(ctrl.team.types[type].api.damage_relations.half_damage_from); // debug
        for (let j = 0; j < ctrl.team.types[type].api.damage_relations.half_damage_from.length; j++) {
          let subtype = ctrl.team.types[type].api.damage_relations.half_damage_from[j].name;

          console.log(ctrl.strengths[subtype]);
          if (ctrl.strengths[subtype] === undefined) ctrl.strengths[subtype] = {name: subtype, count: 1};
          else {
            ctrl.strengths[subtype] = {
              name: subtype,
              count: ctrl.strengths[subtype].count + 1
            }
          }
        }
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
      console.log(ctrl.strengths);
      return ctrl.strengths;
    };
    ctrl.findWeaknesses = function(team) {
      ctrl.weaknesses = {};
      for (let type in ctrl.team.types) {
        // console.log(ctrl.team.types[type].api.damage_relations.half_damage_from); // debug
        for (let j = 0; j < ctrl.team.types[type].api.damage_relations.half_damage_to.length; j++) {
          let subtype = ctrl.team.types[type].api.damage_relations.half_damage_to[j].name;

          console.log(ctrl.weaknesses[subtype]);
          if (ctrl.weaknesses[subtype] === undefined) ctrl.weaknesses[subtype] = {name: subtype, count: 1};
          else {
            ctrl.weaknesses[subtype] = {
              name: subtype,
              count: ctrl.weaknesses[subtype].count + 1
            }
          }
        }
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
      console.log(ctrl.weaknesses);
      return ctrl.weaknesses;
    };

    ctrl.testing = function() {
      console.log(ctrl.team);
    };
  };

  angular.module('Pokedex').component('teamData', {
    templateUrl: './components/teamData/teamData.tpl.html',
    controller: TeamDataController,
    bindings: {
      team: '<'
    }
  });
})(window.angular);
