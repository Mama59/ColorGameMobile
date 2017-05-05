(() => {
  'use strict';

  angular
    .module('navs')
    .controller('NavsCtrl', navController);
  navController.$inject = ['GameService'];

  function navController(GameService) {
    let self = this;
    self.categories = GameService.getCategories();
  }
})();
