var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = require('../modules/pg-config');

var pool = new pg.Pool(config.pg);

router.get("/", function(req, res) {
  console.log("person GET");
    pool.connect()
        .then(function(client) {
            client.query('SELECT * FROM person', function(err, result) {
                if (err) {
                    client.release();
                    console.log('Error getting person data', err);
                    res.sendStatus(500);
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
        if(err) {
          client.release();
          console.log("Error selecting people from DB: ", err);
          res.sendStatus(500);
        } else {
          client.release();
          res.send(result.rows);
        }
      })
    })
    .catch(function(err) {
      console.log("Error connecting to DB: ", err);
      res.sendStatus(500);
    });
});// End route

router.post("/", function(req, res) {
    pool.connect()
        .then(function(client) {
            client.query('INSERT INTO person (cohort_id, name) VALUES ($1, $2)' , [req.body.cohort_id, req.body.name], function(err, result) {
                if (err) {
                    client.release();
                    console.log('Error posting person data', err);
                    res.sendStatus(500);
                } else {
                    client.release();
                    console.log("result.rows", result.rows);
                    res.sendStatus(201);
                }
            });
        });
});

router.delete("/", function(req, res) {
    pool.connect()
        .then(function(client) {
            client.query('DELETE FROM person WHERE id = $1' , [req.body.id], function(err, result) {
                if (err) {
                    client.release();
                    console.log('Error deleting person data', err);
                    res.sendStatus(500);
                } else {
                    client.release();
                    res.sendStatus(200);
                }
            });
        });
});

router.put("/", function(req, res) {
    pool.connect()
        .then(function(client) {
            client.query('UPDATE person SET name = $1 WHERE id = $2' , [req.body.name, req.body.id], function(err, result) {
                if (err) {
                    client.release();
                    console.log('Error updating person data', err);
                    res.sendStatus(500);
                } else {
                    client.release();
                    res.send(result.rows);
                }
            });
        });
});

module.exports = router;
