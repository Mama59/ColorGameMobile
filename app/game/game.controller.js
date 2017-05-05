(() => {
  angular
    .module('game')
    .controller('GameCtrl', gameController);
  gameController.$inject = ['$stateParams', 'GameService'];
  function gameController($stateParams, GameService) {
    let self = this;
    function init() {
      self.categories = GameService.getCategories();
    }

    init();
  }
})();
