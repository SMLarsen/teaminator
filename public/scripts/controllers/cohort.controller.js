/*jshint esversion: 6 */
angular.module('app')
  .controller('CohortController', ['$http', function($http){
    var self = this;

    // self.cohort = "Sigma";
    // self.teams = {};
    self.newMember = {};

    function getCohorts(){
      var promise = $http({
        method: 'GET',
        url: '/cohort'
      }).then(function(response){
        self.cohort = response.data
      });
      return promise;
    }

    getCohorts();

    self.submitMember = function(newMember){
      console.log(newMember);
    }

}]);
