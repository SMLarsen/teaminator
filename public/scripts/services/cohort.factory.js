app.factory('CohortFactory', ['$http', function($http){
  console.log('cohort factory running');

  var publicApi = {
    cohorts: ['Pi', 'Rho', 'Sigma', 'Tau', 'Chi']
  };

  return publicApi;

}]);
