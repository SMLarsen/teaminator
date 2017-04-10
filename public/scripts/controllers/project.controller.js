/*jshint esversion: 6 */
app.controller('ProjectController', ['TeamFactory', 'CohortFactory', '$location', function(TeamFactory, CohortFactory, $location) {
    console.log("Project controller running");

    const teamFactory = TeamFactory;
    const cohortFactory = CohortFactory;

    let self = this;
    self.team = teamFactory.data;
    self.cohort = cohortFactory.cohort;

    if (self.cohort.selectedCohort === null) {
        window.location = '#!/home';
    }

    self.getProjects = function(cohortID) {
        teamFactory.getProjects(cohortID)
            .then((response) => self.team = teamFactory.data)
            .catch((err) => console.log('Error getting projects', err));
    };

    self.getProjects(self.cohort.selectedCohort.id);

    self.getTeams = function(project) {
      self.team.focusProject = project;
      $location.path('/teams');
    };

}]); //end controller
