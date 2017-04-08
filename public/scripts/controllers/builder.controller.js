/*jshint esversion: 6 */
angular.module('app').controller('BuilderController', ['$http', '$location', 'CohortFactory', 'TeamFactory', '$route', function($http, $location, CohortFactory, TeamFactory, $route) {

    console.log('builder controller running');

    let self = this;

    self.cohort = CohortFactory.cohort;
    self.team = TeamFactory.data;
    CohortFactory.getPeople();
    self.team.newProject = {};
    self.projectBuilt = false;
    self.teamCount;
    self.projectName = '';

    if (self.cohort.selectedCohort === null) {
        window.location = '#!/home';
    }

    self.loadCohort = function() {
        return this.cohorts;
    };

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

    self.build = function() {
        var cohortId = CohortFactory.cohortId;
        console.log('Time to build teams');
        TeamFactory.buildTeams()
        .then((response) => {
          console.log('Teams built');
        })
        .catch((err) => console.log('Error building teams'));
    };

}]); //End controller
