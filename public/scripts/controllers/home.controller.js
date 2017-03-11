/*jshint esversion: 6 */
angular.module('app').controller('HomeController', ['$http', 'CohortFactory', '$location', function($http, CohortFactory, $location) {
  const self = this;

  self.cohort = CohortFactory.cohort;

  self.next = function() {
    $location.path('/builder/' + CohortFactory.cohort.selectedCohort);
  }

}]);
