var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = require('../modules/pg-config');

var pool = new pg.Pool(config.pg);

// get all cohorts
router.get("/", function(req, res) {
  pool.query('SELECT * FROM cohort')
    .then(function (result) {
      res.send(result.rows);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
});

// get cohort members
router.get("/:id", function (req, res) {
  pool.query(
    'SELECT * FROM cohort WHERE id = $1'
    [req.params.id]
  )
    .then(function (result) {
      res.send(result.data);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
})

// create cohort
router.post("/", function (req, res) {
  console.log('req.body', req.body);
  pool.query(
    'INSERT INTO cohort (name) VALUES($1)',
    [req.body.name]
  )
    .then(function (response) {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
})

// delete cohort
router.delete("/:id", function (req, res) {
  pool.query('SELECT * FROM cohort')
    .then(function (result) {
      res.send(result.data);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
})


module.exports = router;
