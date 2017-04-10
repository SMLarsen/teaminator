/*jshint esversion: 6 */
angular.module('app').controller('BuilderController', ['$http', '$location', 'CohortFactory', 'TeamFactory', '$route', function($http, $location, CohortFactory, TeamFactory, $route) {

    console.log('builder controller running');

    let self = this;

    self.cohort = CohortFactory.cohort;
    self.team = TeamFactory.data;
    self.team.newProject = {};
    self.projectBuilt = false;
    self.teamCount = 0;
    self.projectName = '';

    if (self.cohort.selectedCohort === null) {
        window.location = '#!/home';
    } else {
      CohortFactory.getPeople();
    }

    self.toggleCheck = function(student) {
        student.checked = !student.checked;
    };

    self.addProject = function() {
        self.team.newProject.cohortId = self.cohort.selectedCohort.id;
        TeamFactory.addProject()
            .then((response) => {
                CohortFactory.getPeople()
                    .then((response) => self.projectBuilt = true)
                    .catch((err) => console.log("Error getting team members"));
            })
            .catch((err) => console.log("Error adding project"));
    };

    self.buildTeams = function() {
        TeamFactory.buildTeams()
        .then((response) => {
          $location.path('/teams');
        })
        .catch((err) => console.log('Error building teams'));
    };

}]); //End controller
