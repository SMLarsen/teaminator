/*jshint esversion: 6 */
angular.module('app').controller('HomeController', ['$http', 'CohortFactory', '$location', function($http, CohortFactory, $location) {
  var self = this;

  self.cohorts = [];
  self.selectedCohort = '';

  function getCohorts(){
    var promise = $http({
      method: 'GET',
      url: '/cohort'
    }).then(function(response){
      self.cohorts = response.data
      console.log(self.cohorts);
    });
    return promise;
  }

  getCohorts();

  self.next = function() {
    if(self.selectedCohort != '') {
      CohortFactory.selectedCohort = self.selectedCohort;
      console.log(CohortFactory.selectedCohort);
      $location.path('/builder');
    } else {
      console.log("Need to select cohort");
    }
  }

}]);
