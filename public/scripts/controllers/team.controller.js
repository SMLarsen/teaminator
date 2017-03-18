/*jshint esversion: 6 */
app.controller('TeamController', function(TeamFactory, CohortFactory) {
    console.log("Team controller running");

    const teamFactory = TeamFactory;
    const cohortFactory = CohortFactory;

    let self = this;
    self.data = teamFactory.data;
    self.cohort = cohortFactory.cohort;

    self.getProjects = function(cohortID) {
        teamFactory.getProjects(cohortID)
            .then((response) => self.data = teamFactory.data)
            .catch((err) => console.log('Error getting projects', err));
    };

    self.getProjects(self.cohort.selectedCohort.id);



    self.getTeams = function(projectID) {
        teamFactory.getTeams(projectID)
            .then((response) => self.data = teamFactory.data)
            .catch((err) => console.log('Error getting teams', err));
    };

}); //end controller
