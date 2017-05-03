angular.module('movies')

.directive('moviesListEntry', function() {
  return {
    scope: {
      movie: '<'
    },
    controllerAs: 'ctrl',
    bindToController: true,

    controller: function() {},

    templateUrl: 'moviesListEntry.html'
  };
});