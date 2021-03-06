describe('TeamDataController', function() {
  beforeEach(module('Pokedex'));

  let $controller;

  beforeEach(inject(function(_$componentController_) {
     $componentController = _$componentController_;
   }));

   describe('ctrl.team', function() {
     // This test is dumb, but it checks whether or not the container is a component
    it('should be a component', function() {
       let bindings = { team: { pokemon: [], types: {} } };
       let ctrl = $componentController('teamData', null, bindings);
       expect(ctrl).toBeDefined();
     });
    it('checks to see if team is defined', function() {
      let bindings = { team: { pokemon: [], types: {} } }
      let ctrl = $componentController('teamData', null, bindings);
      expect(ctrl.team).toBeDefined();
    });
  });
});
