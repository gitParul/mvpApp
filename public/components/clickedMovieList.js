angular.module('movies')

.directive('clickedMovieList', function() {
  return {

    scope: {
      movies: '<',
    },
    controllerAs: 'ctrl',
    bindToController: true,
    restrict: 'E',
    controller: function() {
    },

    templateUrl: 'clickedMovieList.html'
  };
});