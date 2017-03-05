/*jshint esversion: 6 */
angular.module('app').controller('HomeController', ['$http', 'CohortFactory', 'NotifyFactory', function($http, CohortFactory, NotifyFactory) {
  const self = this;

  self.cohorts = CohortFactory.cohorts;
  self.selectedCohort = "";
  self.newName = "";

  self.add = add;

  function add(newName) {
    CohortFactory.add(newName)
    .then(resetNewName)
    .catch(resetNewName);
  }

  function resetNewName() { 
    self.newName = ""; 
  }

}]);
