const express = require('express');
const router = express.Router();
const pg = require('pg');
var config = require('../modules/pg-config');

var pool = new pg.Pool(config.pg);

router.post('/', function(req, res) {
  pool.connect()
    .then(function(client) {
      console.log("name: ", req.body.projectName);
      console.log("count: ", req.body.teamCount);
      client.query('INSERT INTO project (name, team_count, cohort_id) VALUES ($1, $2, $3)', [req.body.projectName, req.body.teamCount, req.body.cohortId])
        .then(function(result) {
          client.release();
          console.log("Success");
          res.sendStatus(200);
        })
        .catch(function(err) {
          client.release();
          console.log("Error adding to DB: ", err);
          res.sendStatus(500);
        });
    })
    .catch(function(err) {
      console.log("Error connecting to DB: ", err);
      res.sendStatus(500);
    });
});//End route
//
// router.get('/all', function(req, res) {
//   pool.connect()
//     .then(function(client) {
//       client.query('SELECT * FROM project')
//         .then(function(err, result) {
//         if(err) {
//           client.release();
//           console.log("Query error selecting ALL from DB: ", err);
//           res.sendStatus(500);
//         } else {
//           client.release();
//           console.log("Query success");
//           res.send(result.rows);
//         }
//       });
//     })
//     .catch(function(err){
//       console.log("Error connecting to DB: ", err);
//       res.sendStatus(500);
//     });
// });//End route
//
// router.get('/one/:project', function(req, res){
//   pool.connect()
//     .then(function(client) {
//       client.query('SELECT * FROM project WHERE name = $1', [req.params.project])
//         .then(function(err, result) {
//           if(err) {
//             client.release();
//             console.log("Query error selecting one from DB: ", err);
//             res.sendStatus(500);
//           } else {
//             client.release();
//             console.log("Query success");
//             res.send(result.rows);
//           }
//         });
//     })
//     .catch(function(err) {
//       client.release();
//       console.log("Error connecting to DB: ", err);
//       res.sendStatus(500);
//     });
// });//End route
//

module.exports = router;
