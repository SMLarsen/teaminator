app.factory('CohortFactory', ['$http', function($http) {

  var cohort = {
    list: null,
    selectedCohort: null,
    people: []
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

  function getPeople() {
    return $http({
      method: 'GET',
      url: '/person/' + cohort.selectedCohort.id,
    })
    .then(function(response) {
      cohort.people = response.data;
      console.log(cohort.people);
    })
    .catch(function(err) {
      console.log("GET people error: ", err);
    })
  }

  return {
    cohort: cohort,
    getAll: getAll,
    getPeople: getPeople
  };

}]);
