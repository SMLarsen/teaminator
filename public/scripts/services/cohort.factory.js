app.factory('CohortFactory', ['$http', function($http) {
  
  var cohorts = {
    list: null
  }
  
  getAll();

  function getAll() {
    return $http({
      method: 'GET',
      url: '/cohort'
    })
    .then(function(result) {
      cohorts.list = result.data;
    })
    .catch(handleError);
  }

  function handleError(err) {
    var message = [err.config.method, err.config.url, "error:"].join(" ")
    console.log(message, err);
  }

  return {
    cohorts: cohorts
  };

}]);

