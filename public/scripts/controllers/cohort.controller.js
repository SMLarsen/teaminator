/*jshint esversion: 6 */
angular.module('app')
  .controller('CohortController', ['$http', function($http){
    var self = this;

    // self.cohort = "Sigma";
    // self.teams = {};
    self.newMember = {};


   // temp stuff, replace with new cohort created and stored in home factory
    function getCohorts(){
      var promise = $http({
        method: 'GET',
        url: '/cohort'
      }).then(function(response){
        self.cohorts = response.data
        console.log(self.cohorts[0].name);
        self.cohort = self.cohorts[0].name
      });
      return promise;
    }

    getCohorts();

    self.submitMember = function(newMember){
      console.log(newMember);
    }

}]);
