/*jshint esversion: 6 */
var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = require('../modules/pg-config');

var pool = new pg.Pool(config.pg);

router.get("/", function(req, res) {
    pool.connect()
        .then(function(client) {
            client.query('SELECT * FROM team_member', function(err, result) {
                if (err) {
                    client.release();
                    console.log('Error getting team_member data', err);
                    res.sendStatus(500);
                } else {
                    client.release();
                    res.send(result.rows);
                }
            });
        });
});

module.exports = router;
router.post("/", function(req, res) {
  console.log('req.body:', req.body);
    pool.connect()
        .then((client) => {
            client.query('INSERT INTO team_member (person_id, team_id) VALUES ($1, $2)', [req.body.person_id, req.body.team_id], function(err, result) {
                if (err) {
                    client.release();
                    console.log('Error inserting team member', err);
                    res.sendStatus(500);
                } else {
                    client.release();
                    res.sendStatus(201);
                }
            });
        });
});

module.exports = router;
