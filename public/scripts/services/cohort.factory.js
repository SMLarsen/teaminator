app.factory('CohortFactory', ['$http', function($http) {
  var cohorts;

  // getCohorts();

  function getCohorts() {
    return $http({
      method: 'GET',
      url: '/cohort'
    })
    .then(function(data) {
      return data;
    })
  }

  return {
    getCohorts: getCohorts
  };

}]);

