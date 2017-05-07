(() => {
  angular
    .module('color')
    .controller('ColorCtrl', colorController);
  colorController.$inject = ['$stateParams', 'GameService', '$timeout'];
  function colorController($stateParams, GameService, $timeout) {
    let self = this;
    self.actual = 0;

    self.select = function (color) {

      if (color === self.selectedGame) {
        self.selectColor();
      }
      else {
        GameService.play(self.audio.bad);
        console.log('Raté');
      }
    };

    self.playSound = function () {
      //GameService.playSound(self.selectedGame);
    };

    self.selectColor = function () {
      $timeout(function () {
        self.selectedGame = GameService.randomElement({array: self.games, actual: self.selectedGame});

        if (!self.level > 3) {
          self.games = GameService.shuffle(self.games);
        }

        if (self.gameFilter === 'color') {
          self.selectedGame.class = "circle";
        }
        else {
          self.selectedGame.class = "";
        }
        self.playSound();
      }, 400);

    };

    self.range = function (count) {
      var ratings = [];
      for (var i = 0; i < count; i++) {
        ratings.push(i)
      }
      return ratings;
    };

    self.isImg = function () {
      return !(self.gameFilter === 'colorEn'
      || self.gameFilter === 'color'
      || self.gameFilter === 'sound'
      || self.gameFilter === 'soundEn'
      || self.gameType !== 'colors');
    };

    self.initColor = function () {
      self.games = angular.copy(self.gamesColor.slice(0, self.level));
    };

    self.init = function () {
      self.easyinit = function () {
        self.audio = GameService.getAudio();
        self.list = ['viceVersa', 'pawPatrol', 'robocarpoli'];
        console.log($stateParams.gameType, $stateParams.gameFilter);
        self.gameType = $stateParams.gameType || 'colors';
        self.gameFilter = $stateParams.gameFilter || 'pawPatrol';
        self.folder = 'images/' + self.gameFilter;
        self.gamesColor = GameService.getGames({filter: self.gameFilter, type: self.gameType});
        self.selectColor();
        self.isImage = self.isImg();
      };
      self.init();
    }
  }
})();
