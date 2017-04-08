/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const pg = require('pg');
const config = require('../modules/pg-config');

const pool = new pg.Pool(config.pg);

let teamQuery = '';
let personQuery = '';
let teams = [];

router.get("/:id", function(req, res) {
    console.log('here i am');
    var projectID = req.params.id;
    pool.connect()
        .then(function(client) {
            client.query('SELECT * FROM team WHERE team.project_id = $1', [projectID], function(err, result) {
                if (err) {
                    client.release();
                    console.log('Error getting team data', err);
                    res.sendStatus(500);
                } else {
                    client.release();
                    res.send(result.rows);
                }
            });
        });
});

router.get("/members/:id", function(req, res) {
    var projectID = req.params.id;
    pool.connect()
        .then(function(client) {
            client.query('SELECT project_id, team_size, team.name AS team_name, team_member.id AS member_id, team_id, person_id, cohort_id, person.name AS person_name FROM team JOIN team_member ON team.id = team_member.team_id JOIN person ON team_member.person_id = person.id WHERE team.project_id = $1 ORDER BY team_id', [projectID], function(err, result) {
                if (err) {
                    client.release();
                    console.log('Error getting team data', err);
                    res.sendStatus(500);
                } else {
                    client.release();
                    res.send(result.rows);
                }
            });
        });
});

// Insert teams
router.post("/build", function(req, res, next) {
    // console.log('req.body:', req.body);
    let project = req.body.project;
    let teamPool = req.body.pool;
    let poolSize = teamPool.length;
    let teamSize = Math.floor(poolSize / project.team_count);
    let stragglers = poolSize % project.team_count;
    console.log('TEAM REQUIREMENTS: ' + (project.team_count) + ' Teams needed from pool of ' + (poolSize) + ', with ' + (project.team_count - stragglers) + ' teams of ' + (teamSize) + ' and ' + (stragglers) + ' teams of ' + (teamSize + 1));

    // Build team insert query
    teamQuery = 'INSERT INTO team (project_id, team_size, name) VALUES ';
    let i = 1;
    let teamName = project.name + " Team - " + i;
    teamQuery += "(" + project.id + ", " + teamSize + ", '" + teamName + "')";
    for (i; i <= project.team_count - stragglers; i++) {
        let teamName = project.name + " Team - " + i;
        teamQuery += ", (" + project.id + ", " + teamSize + ", '" + teamName + "')";
    }

    for (i; i <= project.team_count; i++) {
        let teamName = project.name + " Team - " + i;
        teamQuery += ", (" + project.id + ", " + (teamSize + 1) + ", '" + teamName + "'),";
    }

    // console.log('teamQuery', teamQuery);
    // console.log('teamQuery last character =====>', teamQuery.substring(teamQuery.length - 1), '<=====');
    // if (teamQuery.substring(teamQuery.length - 1) === ',') {
    //     teamQuery = teamQuery.substring(0, teamQuery.length - 1);
    // }
    teamQuery += " RETURNING *";
    console.log('teamQuery', teamQuery);

    pool.connect()
        .then(function(client) {
            client.query(teamQuery, function(err, result) {
                if (err) {
                    console.log('Error posting teams', err);
                    res.sendStatus(500);
                } else {
                    teams = result.rows;
                    // console.log("Teams added:", teams);
                    next();
                }
            });
        })
        .catch(function(err) {
            console.log("Error connecting to DB: ", err);
            res.sendStatus(500);
        });
});

// Insert team members
router.post("/build", function(req, res, next) {
    let teamPool = shuffle(req.body.pool);
    console.log('teams:', teams);
    console.log('teamPool:', teamPool);
    personQuery = 'INSERT INTO team_member (team_id, person_id) VALUES ';
    let personCount = 0;
    for (var i = 0; i < teams.length; i++) {
        personCount += teams[i].team_size;
        for (var j = personCount; j < personCount + teams[i].team_size; j++) {
          console.log('teams[i]', teams[i]);
            personQuery += " (" + (teams[i].id) + ", " + (teamPool[j].id) + "),";
        }
    }

    console.log('personQuery', personQuery);
    personQuery = personQuery.substring(0, personQuery.length - 1);
    personQuery += " RETURNING *";
    console.log('personQuery', personQuery);

    pool.connect()
        .then(function(client) {
            client.query(personQuery, function(err, result) {
                if (err) {
                    console.log('Error posting team members', err);
                    res.sendStatus(500);
                } else {
                    members = result.rows;
                    console.log("Team members added:", members);
                    res.sendStatus(201);
                }
            });
        })
        .catch(function(err) {
            console.log("Error connecting to DB: ", err);
            res.sendStatus(500);
        });
});

function shuffle(array) {
    let i = 0,
        j = 0,
        temp = null;

    for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

router.put("/", function(req, res) {
    console.log('req.body:', req.body);
    pool.connect()
        .then((client) => {
            client.query('UPDATE team SET project_id = $1, team_size = $2, name = $3 WHERE id = $4', [req.body.project_id, req.body.team_size, req.body.name, req.body.id], function(err, result) {
                if (err) {
                    client.release();
                    console.log('Error updating team', err);
                    res.sendStatus(500);
                } else {
                    client.release();
                    res.sendStatus(202);
                }
            });
        });
});

router.delete("/", function(req, res) {
    console.log('req.body:', req.body);
    pool.connect()
        .then((client) => {
            client.query('DELETE FROM team WHERE id = $1', [req.body.id], function(err, result) {
                if (err) {
                    client.release();
                    console.log('Error deleting team', err);
                    res.sendStatus(500);
                } else {
                    client.release();
                    res.sendStatus(202);
                }
            });
        });
});

module.exports = router;
