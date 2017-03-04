/*jshint esversion: 6 */
angular.module('app').controller('HomeController', ['$http', function($http) {
  const self = this;

  self.cohorts = ['Pi', 'Rho', 'Sigma', 'Tau', 'Chi'];
  self.selectedCohort = '';

}]);

