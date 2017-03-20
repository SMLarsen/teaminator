/*jshint esversion: 6 */
app.controller('TeamController', function(TeamFactory, CohortFactory) {
    console.log("Team controller running");

    const teamFactory = TeamFactory;
    const cohortFactory = CohortFactory;

    let self = this;
    self.team = teamFactory.data;
    self.cohort = cohortFactory.cohort;

    if (self.cohort.selectedCohort === null) {
      window.location = '#!/home';
    }

    if (self.team.focusProject.id === undefined) {
        self.projectSelected = false;
    } else {
        self.projectSelected = true;
        teamFactory.getTeams()
            .catch((err) => console.log("Error getting teams"));
    }

    console.log('projectSelected', self.projectSelected);

    self.getProjects = function(cohortID) {
        teamFactory.getProjects(cohortID)
            .then((response) => self.team = teamFactory.data)
            .catch((err) => console.log('Error getting projects', err));
    };

    self.getProject = function() {
        teamFactory.getProject(self.selectedProject)
            .then((response) => self.getTeams(self.selectedProject))
            .catch((err) => console.log('Error getting project', err));
    };

    self.getProjects(self.cohort.selectedCohort.id);

    self.getTeams = function(projectID) {
        teamFactory.getTeams(projectID)
            .then((response) => self.projectSelected = true)
            .catch((err) => console.log('Error getting teams', err));
    };

}); //end controller
