(() => {
  angular
    .module('memory')
    .controller('MemoryCtrl', memoryController);
  memoryController.$inject = ['$stateParams', 'GameService'];
  function memoryController($stateParams, GameService) {
    let self = this;
    self.initMemory = function () {
      self.memory = [];
      for (var index in self.games) {
        if (self.charactersType === 'color') {
          self.games[index].class = 'circle';
        }
        else {
          self.games[index].class = "";
        }

        var color = angular.copy(self.games[index]);
        var color2 = angular.copy(self.games[index]);
        color.id = index;
        color.showed = false;
        color2.id = index + self.games.length;
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

    self.isImg = function () {
      return !(self.gameFilter === 'color' || self.gameFilter === 'sound');
    };

    function init() {
      self.gameType = $stateParams.gameType || 'colors';
      self.gameFilter = $stateParams.gameFilter || 'pawPatrol';
      self.folder = 'images/' + self.gameFilter + '/';
      self.games = GameService.getGames({filter: self.gameFilter, type: self.gameType});
      self.categories = GameService.getCategories();
      self.initMemory();
      self.isImage = self.isImg();
    }

    init();
  }
})();
