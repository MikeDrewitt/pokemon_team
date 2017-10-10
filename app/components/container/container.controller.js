(function() {

  function ContainerController($scope) {

    $scope.team = { pokemon: [], types: {} };     // team of pokemon (should never be > 6)

    $scope.test = function() {
      console.log('parent:', $scope.team);
    }
  };

  angular.module('pokedex.config').component('container', {
    templateUrl: './components/container/container.tpl.html',
    controller: ContainerController,
    bindings: { }
  }).controller('ContainerController', ContainerController);
})(window.angular);
