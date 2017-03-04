angular.module('app')
.factory('Cohort', ['$http', cohortFactory]);

function cohortFactory($http) {
  // var cohorts = { list: null };
  var cohorts = null;

  getAll();

  function getAll() {
    return $http({
      method: 'GET',
      url: '/cohorts'
    })
    .then(function (data) {
      // cohorts.list = data;
      cohorts = data;
    })
    .catch(handleError);
  }

  function handleError(err) {
    console.log('err', err);
  }

  return {
    getAll: getAll,
    cohorts: cohorts
  };
}
