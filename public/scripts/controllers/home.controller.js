/*jshint esversion: 6 */
angular.module('app').controller('HomeController', ['$http', 'CohortFactory', function($http, CohortFactory) {
  const self = this;

  self.CohortFactory = CohortFactory;
  self.selectedCohort = '';

  console.log('cohort factory data:', CohortFactory);

}]);
