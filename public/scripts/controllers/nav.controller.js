/*jshint esversion: 6 */
app.controller('NavController', function(TeamFactory, CohortFactory) {
    console.log("Nav controller running");

    const teamFactory = TeamFactory;
    const cohortFactory = CohortFactory;

    let self = this;
    self.team = teamFactory.data;
    self.cohort = cohortFactory.cohort;

    console.log('nav:', self.cohort.selectedCohort === null);

}); //end controller
