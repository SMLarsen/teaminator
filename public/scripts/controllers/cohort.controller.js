/*jshint esversion: 6 */
angular.module('app')
  .controller('CohortController', ['$http', function($http){
    const self = this;

    self.cohort = {};
    self.teams = {};

    function getCohorts(){
      let promise = $http({
        method: 'GET',
        url: '/cohort'
      }).then(function(response){
        self.cohort = response.data
      });
      return promise;
    }

    getCohorts();

}]);
