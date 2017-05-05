(() => {
  angular
    .module('color')
    .controller('ColorCtrl', colorController);
  colorController.$inject = ['$stateParams', 'GameService'];
  function colorController($stateParams, GameService) {
    let self = this;
    self.actual = 0;

    self.select = function (color) {

      if (color === self.selectedGame) {
        self.selectColor();
      }
      else {
        self.audio.bad.audio.play();
        console.log('Raté');
      }
    };

    self.playSound = function () {
      GameService.playSound(self.selectedGame);
    };

    self.selectColor = function () {
      self.selectedGame = GameService.randomElement({array: self.games, actual: self.selectedGame});
      self.games = GameService.shuffle(self.games);

      if (self.gameFilter === 'color') {
        self.selectedGame.class = "circle";
      }
      else {
        self.selectedGame.class = "";
      }
      self.playSound();
    };

    self.isImg = function () {
      return !(self.gameFilter === 'color' || self.gameFilter === 'sound' || self.gameType !== 'colors');
    };

    self.init = function () {
      self.hardMode = true;
      self.audio = GameService.getAudio();
      self.list = ['viceVersa', 'pawPatrol', 'robocarpoli'];
      self.gameType = $stateParams.gameType || 'colors';
      self.gameFilter = $stateParams.gameFilter || 'pawPatrol';
      self.folder = 'images/' + self.gameFilter;
      self.games = GameService.getGames({filter: self.gameFilter, type: self.gameType});
      self.selectColor();
      self.isImage = self.isImg();
    };
    self.init();
  }
})();
