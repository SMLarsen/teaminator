/*jshint esversion: 6 */
app.controller('ProjectController', function(TeamFactory, CohortFactory) {
    console.log("Project controller running");

    const teamFactory = TeamFactory;
    const cohortFactory = CohortFactory;

    let self = this;
    self.team = teamFactory.data;
    self.cohort = cohortFactory.cohort;

    self.getProjects = function(cohortID) {
        teamFactory.getProjects(cohortID)
            .then((response) => self.team = teamFactory.data)
            .catch((err) => console.log('Error getting projects', err));
    };

    self.getProjects(self.cohort.selectedCohort.id);

    self.getTeams = function() {
        teamFactory.getTeams(projectID)
            .then((response) => self.team = teamFactory.data)
            .catch((err) => console.log('Error getting teams', err));
    };

}); //end controller
