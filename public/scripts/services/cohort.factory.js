app.factory('CohortFactory', ['$http', 'NotifyFactory', cohortFactory]);

function cohortFactory($http, NotifyFactory) {
  
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

  function add(name) {
    return $http({
      method: 'POST',
      url: '/cohort',
      data: {name: name}
    })
    .then(function (response) {
      getAll();
      NotifyFactory.info(response)
    })
    .catch(handleError);
  }

  function handleError(err) {
    NotifyFactory.warn(err);
    console.log(err.config.method, "error:", err);
  }

  return {
    cohorts: cohorts,
    add: add
  };

}
