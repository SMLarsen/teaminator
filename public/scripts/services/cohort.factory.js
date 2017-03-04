app.factory('CohortFactory', ['$http', function($http) {

  var cohorts = {
    array: ['Pi', 'Rho', 'Sigma', 'Tau', 'Chi'],
    selectedCohort: ''
  }
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
