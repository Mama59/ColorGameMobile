(() => {
  angular
    .module('game')
    .controller('GameCtrl', gameController);
  gameController.$inject = ['$stateParams', 'GameService'];
  function gameController($stateParams, GameService) {
    let self = this;
    function init() {
      self.categories = GameService.getCategories();
      self.categoriesArray = {};
      for(var category in self.categories){
        self.categoriesArray[category] = Object.keys(self.categories[category]);
      }
    }

    self.range = function(count){
      var ratings = [];
      for (var i = 0; i < count; i++) {
        ratings.push(i)
      }
      return ratings;
    };

    init();
  }
})();
