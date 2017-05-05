(() => {
  angular
    .module('game')
    .config(configGame);

  configGame.$inject = ['$stateProvider'];
  function configGame($stateProvider) {
    $stateProvider
      .state('nav.game', {
        url: '/game',
        views: {
          'menuContent': {
            templateUrl: 'game/game.html',
            controller: 'GameCtrl',
            controllerAs: 'GameCtrl'
          }
        }
      });
  }
})();
