angular.module('movies')

.directive('moviesList', function() {
  return {

    scope: {
      movies: '<',
      onClick: '<'
    },
    controllerAs: 'ctrl',
    bindToController: true,
    restrict: 'E',
    controller: function() {
      console.log(this);
      this.onClick = function(index) {
        this.onClick(index);
      }
    },

    templateUrl: 'moviesList.html'
  };
});