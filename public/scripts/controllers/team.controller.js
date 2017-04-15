/*jshint esversion: 6 */
app.controller('TeamController', function(TeamFactory, CohortFactory, $mdDialog) {
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
        getTeams(self.team.focusProject.id);
    }

    self.getProjects = function(cohortID) {
        teamFactory.getProjects(cohortID)
            .then((response) => self.team = teamFactory.data)
            .catch((err) => console.log('Error getting projects', err));
    };

    self.getProjects(self.cohort.selectedCohort.id);

    self.getProject = function() {
        teamFactory.getProject(self.selectedProject)
            .then((response) => getTeams(self.selectedProject))
            .catch((err) => console.log('Error getting project', err));
    };

    function getTeams(projectID) {
        teamFactory.getTeams(projectID)
            .then((response) => {
                self.projectSelected = true;
                self.teamWidth = 80 / self.team.focusProject.team_count;
                self.teamOffsetWidth = 20 / self.team.focusProject.team_count;
            })
            .catch((err) => console.log('Error getting teams', err));
    }

    self.editTeamName = function(ev, team) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
            .title('Change Team Name')
            .textContent('Pick a new name for the team')
            .placeholder('Starship Troopers')
            .ariaLabel('Team name')
            .initialValue('Starship Troopers')
            .targetEvent(ev)
            .ok('Change Name!')
            .cancel('Discard');

        $mdDialog.show(confirm).then(function(result) {
            updateTeamName(team, result);
        });
    };

    function updateTeamName(team, name) {
        console.log('team:', team);
        console.log('name:', name);
        teamFactory.updateTeamName(team, name)
            .catch((err) => console.log('Error updating team name', err));

    }

}); //end controller
