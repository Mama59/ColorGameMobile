(() => {
  angular
    .module('memory')
    .controller('MemoryCtrl', memoryController);
  memoryController.$inject = ['$stateParams', 'GameService'];
  function memoryController($stateParams, GameService) {

    let self = this;

    self.updateLevel = function (increment) {
      self.level += increment;
      if (self.level < 1) {
        self.level = 1;
      }
      if (self.level > self.games.length) {
        self.level = self.games.length;
      }
      console.log('update level' + increment);
      self.initMemory();
    };

    self.initMemory = function () {
      console.log('init memory ' + self.level);
      self.memory = [];

      var games = angular.copy(self.games.slice(0, self.level));
      for (var index in games) {
        if (self.charactersType === 'color') {
          games[index].class = 'circle';
        }
        else {
          games[index].class = "";
        }

        var color = angular.copy(games[index]);
        var color2 = angular.copy(games[index]);
        color.id = index;
        color.showed = false;
        color2.id = index + games.length;
        color2.showed = false;

        self.memory.push(color, color2);
        self.memory = GameService.shuffle(self.memory);
      }
    };

    self.selectMemory = function (index) {
      if (self.memory[index].showed) {
        console.log('already choose');
      }
      else {
        self.memory[index].showed = true;

        if (self.memorySelected && self.memoryTest) {
          self.memoryTest.showed = false;
          self.memorySelected.showed = false;
          self.memoryTest = null;
          self.memorySelected = null;
        }

        if (self.memorySelected) {
          self.memoryTest = self.memory[index];
          self.memoryTest.showed = true;
          if (self.memorySelected.colorName === self.memoryTest.colorName) {
            console.log('ok');
            self.memoryTest = null;
            self.memorySelected = null;
          }
        }
        else {
          self.memorySelected = self.memory[index];
          self.memorySelected.showed = true;
        }
      }
    };

    self.updateLevel = function () {

    };

    self.range = function (count) {
      var ratings = [];
      for (var i = 0; i < count; i++) {
        ratings.push(i)
      }
      return ratings;
    };

    self.isImg = function () {
      return !(self.gameFilter === 'color' || self.gameFilter === 'sound');
    };

    function init() {
      self.gameType = $stateParams.gameType || 'colors';
      self.gameFilter = $stateParams.gameFilter || 'pawPatrol';
      self.folder = 'images/' + self.gameFilter + '/';
      self.games = GameService.getGames({filter: self.gameFilter, type: self.gameType});
      self.categories = GameService.getCategories();
      self.level = self.games.length / 2;
      self.initMemory();
      self.isImage = self.isImg();
    }

    init();
  }
})();
