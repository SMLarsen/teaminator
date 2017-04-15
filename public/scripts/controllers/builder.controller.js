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
    self.possibleTeamCounts = [];

    if (self.cohort.selectedCohort === null) {
        window.location = '#!/home';
    } else {
        CohortFactory.getPeople()
        .then((response) => {
          if (self.cohort.people.length < 2) {
            return alert('Add people to cohort before building teams.');
          } else {
            for (let i = 2; i <= self.cohort.people.length / 2; i++) {
              self.possibleTeamCounts.push(i);
            }
          }
        });
    }

    self.toggleCheck = function(student) {
        student.checked = !student.checked;
    };

    self.addProject = function() {
      if (self.team.newProject.projectName === undefined) {
        return alert('Be so kind as to enter a project name');
      } else if (self.team.newProject.teamCount === undefined) {
        return alert('How many teams to you need?');
      } else if (self.team.newProject.teamCount === 1) {
        console.log('Doowah');
      }

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
