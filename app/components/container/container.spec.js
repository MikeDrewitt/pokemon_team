describe('ContainerController', function() {
  beforeEach(module('Pokedex'));

  var $controller;
  var $componentController;

  beforeEach(inject(function(_$componentController_) {
     $componentController = _$componentController_;
   }));

   // This test is dumb, but it checks whether or not the container is a component
   it('should be a component', function() {
     var bindings = {  };
     var ctrl = $componentController('container', null, bindings);
     expect(ctrl).toBeDefined();
   });

  beforeEach(inject(function(_$controller_) {
     $controller = _$controller_;
   }));

  describe('$scope.team', function() {
    it('checks to see if team is defined', function() {
      var $scope = {};
      var controller = $controller('ContainerController', { $scope: $scope });
      expect($scope.team).toBeDefined();
    });
  });

});
