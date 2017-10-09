(function() {

  function ContainerController() {

    var ctrl = this;
    ctrl.team = {pokemon: [], types: {}};     // team of pokemon (should never be > 6)

  };

  angular.module('Pokedex').component('container', {
    templateUrl: './components/container/container.tpl.html',
    controller: ContainerController,
    bindings: { }
  });
})(window.angular);
