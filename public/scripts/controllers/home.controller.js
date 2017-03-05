/*jshint esversion: 6 */
angular.module('app').controller('HomeController', ['$http', 'CohortFactory', function($http, CohortFactory) {
  const self = this;

  self.cohorts = CohortFactory.cohorts;
  self.selectedCohort = '';

  console.log('cohort factory data:', CohortFactory);

}]);
