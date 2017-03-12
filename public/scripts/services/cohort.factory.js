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

  function addPerson(studentName) {
    return $http({
      method: 'POST',
      url: '/person',
      data: {
        cohortId: cohort.selectedCohort.id,
        name: studentName
      }
    })
    .then(function(response) {
      console.log("Successs adding student!");
      getPeople();
    })
    .catch(function(err) {
      // NotifiyFactory.warn(err);
      console.log("Error adding student: ", err);
    });
  }

  function deletePerson(student) {
    return $http({
      method: 'DELETE',
      url: '/person/' + student.id    
    })
    .then(function(response) {
      console.log("Successs deleting student!");
      getPeople();
    })
    .catch(function(err) {
      // NotifiyFactory.warn(err);
      console.log("Error deleting student: ", err);
    });
  }

  return {
    cohort: cohort,
    getAll: getAll,
    getPeople: getPeople,
    addPerson: addPerson,
    deletePerson: deletePerson
  };

}]);
