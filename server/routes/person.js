var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = require('../modules/pg-config');

var pool = new pg.Pool(config.pg);

var cohort = [];
var newPerson = {};
var queryText = '';

router.get("/", function(req, res) {
    console.log("person GET");
    pool.connect()
        .then(function(client) {
            client.query('SELECT * FROM person', function(err, result) {
                if (err) {
                    console.log('Error getting person data', err);
                } else {
                    client.release();
                    res.send(result.rows);
                }
            });
        });
});

router.get('/:id', function(req, res) {
    console.log("Get with ID route hit");
    pool.connect()
        .then(function(client) {
            client.query('SELECT * FROM person WHERE cohort_id = $1', [req.params.id],
                function(err, result) {
                    if (err) {
                        console.log("Error selecting people from DB: ", err);
                        res.sendStatus(500);
                    } else {
                        res.send(result.rows);
                    }
                });
        })
        .catch(function(err) {
            console.log("Error connecting to DB: ", err);
            res.sendStatus(500);
        });
}); // End route

router.post("/", function(req, res, next) {
  console.log('Post Person route hit:', req.body);
    pool.connect()
        .then(function(client) {
            client.query('SELECT * FROM person WHERE cohort_id = $1', [req.body.cohortId],
                function(err, result) {
                    if (err) {
                        console.log("Error selecting people from DB to build pairs: ", err);
                        res.sendStatus(500);
                    } else {
                        cohort = result.rows;
                        next();
                    }
                });
        })
        .catch(function(err) {
            console.log("Error connecting to DB: ", err);
            res.sendStatus(500);
        });
});

router.post("/", function(req, res, next) {
  console.log('Post Person route2 hit');
    pool.connect()
        .then(function(client) {
            client.query('INSERT INTO person (cohort_id, name) VALUES ($1, $2) RETURNING *', [req.body.cohortId, req.body.name], function(err, result) {
                if (err) {
                    console.log('Error posting person data', err);
                    res.sendStatus(500);
                } else {
                    console.log("result.rows[0]", result.rows[0]);
                    newPerson = result.rows[0];
                    next();
                }
            });
        })
        .catch(function(err) {
            console.log("Error connecting to DB: ", err);
            res.sendStatus(500);
        });
});

router.post("/", function(req, res, next) {
  console.log('Post Person route2 hit');
    queryText = 'INSERT INTO pair (person1_id, person2_id) VALUES ';
    cohort.forEach(formatPairs);
    queryText = queryText.substring(0, queryText.length - 1);
    console.log(queryText);
    pool.connect()

        .then(function(client) {

            client.query(queryText, function(err, result) {
                if (err) {
                    console.log('Error posting pair data', err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
        })
        .catch(function(err) {
            console.log("Error connecting to DB: ", err);
            res.sendStatus(500);
        });
});

function formatPairs(person, index) {
    queryText += '(' + person.id + ', ' + newPerson.id + '),';
}

router.delete("/:id", function(req, res) {
    console.log("delete route hit", req.params.id);
    pool.connect()
        .then(function(client) {
            client.query('DELETE FROM person WHERE id = $1', [req.params.id], function(err, result) {
                if (err) {
                    console.log('Error deleting person data', err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        });
});

router.put("/", function(req, res) {
    pool.connect()
        .then(function(client) {
            client.query('UPDATE person SET name = $1 WHERE id = $2', [req.body.name, req.body.id], function(err, result) {
                if (err) {
                    console.log('Error updating person data', err);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            });
        });
});

module.exports = router;
