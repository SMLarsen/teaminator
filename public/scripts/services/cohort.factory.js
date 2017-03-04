app.factory('CohortFactory', ['$http', function($http) {
  
  var cohorts = ['Pi', 'Rho', 'Sigma', 'Tau', 'Chi'];
  
  // getAll();
  // function getAll() {
  //   return $http({
  //     method: 'GET',
  //     url: '/cohorts'
  //   })
  //   .then(function(data) {
  //     cohorts = data;
  //   })
  //   .catch(handleError);
  // }

  function handleError(err) {
    console.log('err', err);
  }
  return {
    // getAll: getAll,
    cohorts: cohorts
  };
}]);

