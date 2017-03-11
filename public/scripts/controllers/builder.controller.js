angular.module('app').controller('BuilderController', ['$http', '$location', 'CohortFactory', '$route', function($http, $location, CohortFactory, $route){

    console.log('builder controller running');
    const self = this;

  // TODO: ensure cohort exists

  self.cohort = CohortFactory.cohort;
  CohortFactory.getPeople();
  self.teamCount;
  self.cohorts = [1,2,3,4];
  self.projectName = '';
  self.loadCohort = function() {


  // Use timeout to simulate a 650ms request.
    return this.cohorts;



  };

  self.toggleCheck = function(student) {
    student.checked = !student.checked;
  }

  self.build = function () {
    let cohortId = CohortFactory.cohortId;
    console.log('clicked');
    $http({
      method: "POST",
      url: "/project",
      data: {
        projectName: self.projectName,
        teamCount : self.teamCount,
        cohortId: cohortId
      }
    })
    .then(function(res) {
      console.log("SUCCESS");
      $location.path('/teams');
    });
  };

}]);//End controller
