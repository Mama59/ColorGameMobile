(() => {
  angular
    .module('memory')
    .config(configMemory);

  configMemory.$inject = ['$stateProvider'];
  function configMemory($stateProvider) {
    $stateProvider
      .state('nav.memory', {
        url: '/memory/:gameFilter/:gameType',
        views: {
          'menuContent': {
            templateUrl: 'memory/memory.html',
            controller: 'MemoryCtrl',
            controllerAs: 'MemoryCtrl'
          }
        }
      });
  }
})();
