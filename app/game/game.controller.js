(() => {
  angular
    .module('game')
    .controller('GameCtrl', gameController);
  gameController.$inject = ['$stateParams', 'GameService'];
  function gameController($stateParams, GameService) {
    let self = this;
    console.log('init game ');
    function init() {
      self.categories = GameService.getCategories();
      console.log(self.categories);
    }

    init();
  }
})();
