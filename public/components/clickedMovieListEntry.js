angular.module('movies')

.directive('clickedMovieListEntry', function() {
  return {
    scope: {
      movie: '<'
    },
    controllerAs: 'ctrl',
    bindToController: true,

    controller: function() {},

    templateUrl: 'clickedMovieListEntry.html'
  };
});