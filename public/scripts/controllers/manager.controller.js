/*jshint esversion: 6 */
angular.module('app')
  .controller('ManagerController', ['$http', 'CohortFactory', function($http, CohortFactory){
    var self = this;

    self.cohort = CohortFactory.cohort;

    self.addPerson = function(name) {
      CohortFactory.addPerson(name);
    }
    self.deletePerson = function(student) {
      CohortFactory.deletePerson(student);
    }
}]);
