/*jshint esversion: 6 */
angular.module('app').controller('HomeController', ['$http', 'CohortFactory', function($http, CohortFactory) {
  const self = this;

  var cohortFactory = CohortFactory;

  self.selectedCohort = '';

  (function getCohorts(){
  	CohortFactory.getCohorts().then(function(data){
  		self.cohorts = data.data;
  	});
  })();

}]);
