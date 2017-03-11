/*jshint esversion: 6 */
app.factory("TeamFactory", ["$http", function($http) {
    console.log('TeamFactory started');

    let data = {
        teamsArray: [],
        focusTeam: {}
    };

    // Function to GET Teams
    function getTeams(projectID) {
        return $http({
                method: 'GET',
                url: '/team/members/' + projectID
            })
            .then((response) => {
                buildProjectObject(response.data);
                console.log('data', data);
                return;
            })
            .catch((err) => console.log('Unable to retrieve Team Members', err));
    }

    function buildProjectObject(teams) {
        console.log('teams', teams);
        let members = [];
        for (let i = 0; i < teams.length; i++) {
            let member = {};
            member.memberID = teams[i].member_id;
            member.personID = teams[i].person_id;
            member.cohortID = teams[i].cohort_id;
            member.personName = teams[i].person_name;
            members.push(member);
            if (i === teams.length - 1) {
                let team = {};
                team.teamID = teams[i].team_id;
                team.projectID = teams[i].project_id;
                team.teamSize = teams[i].team_size;
                team.teamName = teams[i].team_name;
                team.members = members;
                data.teamsArray.push(team);
            } else if (teams[i].team_id !== teams[i + 1].team_id) {
                let team = {};
                team.teamID = teams[i].team_id;
                team.projectID = teams[i].project_id;
                team.teamSize = teams[i].team_size;
                team.teamName = teams[i].team_name;
                team.members = members;
                data.teamsArray.push(team);
                members = [];
            }
        }
    }

    // Function to add Team
    function addTeam() {
        console.log('addTeam:', data.focusTeam);
        return $http({
                method: 'POST',
                url: '/team',
                data: data.focusTeam
            })
            .then((response) => {
                getTeams(data.focusTeam.project_id);
                data.focusTeam = {};
                return;
            })
            .catch((err) => console.log('Unable to add Team', err));
    } // End addTeam

    const publicApi = {
        data: data,
        getTeams: function(projectID) {
            return getTeams(projectID);
        },
        addTeam: function() {
            return addTeam();
        }
    };

    return publicApi;
}]); // END: MyTeamFactory updatePOI(index, data, dayID)
