/*jshint esversion: 6 */
app.factory("TeamFactory", ["$http", "CohortFactory", function($http, CohortFactory) {
    console.log('TeamFactory started');

    let data = {
        projectsArray: [],
        teamsArray: [],
        focusTeam: {},
        focusProject: {},
        newProject: {}
    };

    // Function to GET Teams
    function getTeams(projectID) {
        return $http({
                method: 'GET',
                url: '/team/members/' + projectID
            })
            .then((response) => buildProjectObject(response.data))
            .catch((err) => console.log('Unable to retrieve Team Members', err));
    }

    function buildProjectObject(teams) {
        data.teamsArray = [];
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

    // Function to build Teams
    function buildTeams() {
        console.log('buildTeams:', data.focusTeam);
        return $http({
                method: 'POST',
                url: '/team/build',
                data: {
                    project: data.focusProject,
                    pool: CohortFactory.cohort.people
                }
            })
            .catch((err) => console.log('Unable to build Teams', err));
    } // End buildTeams

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
                data.focusProject = {};
                return;
            })
            .catch((err) => console.log('Unable to add Team', err));
    } // End addTeam

    // Function to GET Projects
    function getProjects(cohortID) {
        return $http({
                method: 'GET',
                url: '/project/' + cohortID
            })
            .then((response) => {
                data.projectsArray = response.data;
                console.log('data', data.projectsArray);
                return;
            })
            .catch((err) => console.log('Unable to retrieve Projects', err));
    }

    // Function to GET aProject
    function getProject(projectID) {
        return $http({
                method: 'GET',
                url: '/project/one/' + projectID
            })
            .then((response) => {
                data.focusProject = response.data;
                console.log('data', data.focusProject);
                return;
            })
            .catch((err) => console.log('Unable to retrieve Project', err));
    }

    // Function to add Project
    function addProject() {
        console.log('addProject:', data.newProject);
        return $http({
                method: 'POST',
                url: '/project',
                data: data.newProject
            })
            .then((response) => {
                data.focusProject = response.data;
                data.newProject = {};
                return;
            })
            .catch((err) => console.log('Unable to add Project', err));
    } // End addProject

    const publicApi = {
        data: data,
        buildTeams: function() {
            return buildTeams();
        },
        getTeams: function(projectID) {
            return getTeams(projectID);
        },
        addTeam: function() {
            return addTeam();
        },
        getProjects: function(cohortID) {
            return getProjects(cohortID);
        },
        getProject: function(projectID) {
            return getProject(projectID);
        },
        addProject: function() {
            return addProject();
        }
    };

    return publicApi;
}]); // END: MyTeamFactory updatePOI(index, data, dayID)
