/*jshint esversion: 6 */
angular.module('app').controller('BuilderController', ['$http', '$location', 'CohortFactory', 'TeamFactory', '$route', function($http, $location, CohortFactory, TeamFactory, $route){

    console.log('builder controller running');
    let self = this;

  // TODO: ensure cohort exists

  self.cohort = CohortFactory.cohort;
  self.team = TeamFactory.data;
  CohortFactory.getPeople();
  self.team.newProject = {};

  self.loadCohort = function() {
    return this.cohorts;
  };

  self.toggleCheck = function(student) {
    student.checked = !student.checked;
  };

  self.build = function () {
    self.team.newProject.cohortId = self.cohort.selectedCohort.id;
    TeamFactory.addProject();
  };

  // self.build = function () {
  //   let cohortId = CohortFactory.cohortId;
  //   console.log('clicked');
  //   $http({
  //     method: "POST",
  //     url: "/project",
  //     data: {
  //       projectName: self.projectName,
  //       teamCount : self.teamCount,
  //       cohortId: cohortId
  //     }
  //   })
  //   .then(function(res) {
  //     console.log("SUCCESS");
  //     $location.path('/teams');
  //   });
  // };

}]);//End controller
