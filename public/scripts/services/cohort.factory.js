app.factory('CohortFactory', ['$http', function($http) {

  var cohort = {
    list: null,
    selectedCohort: null
  }

  getAll();

  function getAll() {
    return $http({
      method: 'GET',
      url: '/cohort'
    })
    .then(function(result) {
      cohort.list = result.data;
    })
    .catch(handleError);
  }

  function handleError(err) {
    var message = [err.config.method, err.config.url, "error:"].join(" ")
    console.log(message, err);
  }

  return {
    cohort: cohort
  };

}]);
