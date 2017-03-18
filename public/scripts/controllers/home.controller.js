/*jshint esversion: 6 */
angular.module('app').controller('HomeController', ['CohortFactory', '$location', function(CohortFactory, $location) {
  const self = this;

  self.cohort = CohortFactory.cohort;

  self.next = function() {
    $location.path('/builder');
  };

  self.manager = function() {
    $location.path('/manager');
  };

}]);
