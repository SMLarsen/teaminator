/*jshint esversion: 6 */
angular.module('app').controller('HomeController', ['$http', 'Cohort', function($http, Cohort) {
  const self = this;

  self.CohortFactory = CohortFactory;
  self.selectedCohort = '';

}]);

