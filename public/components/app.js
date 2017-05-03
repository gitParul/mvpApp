angular.module('movies', [])

.service('getService', function($http) {
  this.getData  = function(callback) {
    return $http({
      method: 'GET',
      url: '/movies'
    }).then(function successCallback(response) {
      callback(response.data);
    }, function errorCallback(response) {
      console.log('it errored');
    });
  }

  this.getMovieClicks  = function(callback) {
    return $http({
      method: 'GET',
      url: '/viewMovies'
    }).then(function successCallback(response) {
      callback(response.data);
    }, function errorCallback(response) {
      console.log('it errored');
    });
  }

  this.postData = function(movieId, movieTitle) {
    console.log('hey')
    return $http({
      method: 'POST',
      url: '/viewMovies',
      data: {id: movieId, original_title: movieTitle}
    }).then(function successCallback(response) {

    }, function errorCallback(response) {

    });
  }

})
.directive('app', function(getService) {
  return {
   scope: {},
   controllerAs: 'ctrl',
   bindToController: true,
   restrict: 'E',

   controller: function(getService) {
     this.getService = getService;

     this.getService.getData(function(data) {
      this.moviesData = data.results;
     }.bind(this));

     this.getService.getMovieClicks(function(data){
        this.movieClicksData = data;
     }.bind(this));

     this.likeMovie = function(index) {
       console.log('current movie selected', index);
       var selectedMovie = this.moviesData[index];
       this.getService.postData(selectedMovie.id, selectedMovie.title);
     }.bind(this);

     // console.log("Calling POST now!");
     // this.getService.postData();
   },

   templateUrl: 'movies.html'
  };
});