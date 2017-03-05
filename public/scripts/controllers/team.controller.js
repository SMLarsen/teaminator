/*jshint esversion: 6 */
app.controller('TeamController', function(TeamFactory) {
    console.log("Team controller running");

    const teamFactory = TeamFactory;
    let self = this;

    self.getTeams = function(projectID) {
        teamFactory.getTeams(projectID)
            .then((response) => self.data = teamFactory.data)
            .catch((err) => console.log('Error getting teams', err));
    };

}); //end controller
