(() => {
  angular
    .module('color')
    .config(configColor);

  configColor.$inject = ['$stateProvider'];
  function configColor($stateProvider) {
    $stateProvider
      .state('nav.color', {
        url: '/color/:gameFilter/:gameType',
        views: {
          'menuContent': {
            templateUrl: 'color/color.html',
            controller: 'ColorCtrl',
            controllerAs: 'ColorCtrl'
          }
        }
      });
  }
})();
